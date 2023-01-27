const { sendQuery, internalErrorHandler, driver } = require("./driver.controller")


const getProductsHandler = (req, res) => {
    const query = `MATCH (p:Products) RETURN p`

    sendQuery(
        query,
        (data) => res.send(data),
        () => internalErrorHandler(res)
    )
}

const getProductsWithDataHandler = (req, res) => {

    const createProduct = (product) => {
        return {
            id: product.properties.id,
            name: product.properties.name,
            price: product.properties.price,
            categories: [],
            ingredients: []
        }
    }

    const query = `MATCH (p:Products)-->(w) RETURN p,w`
    const session = driver.session()

    let result = [];
    let id = 0;

    session.run(query)
        .then(data => {
            data.records.forEach(record => {
                const product = record.get('p')
                const data = record.get('w')

                if (result.length === 0 || product.identity !== id) {
                    result.push(createProduct(product))
                    id = product.identity
                }

                if (data.labels[0] === 'Categories') {
                    result[result.length - 1].categories.push({
                        id: data.properties.id,
                        name: data.properties.name
                    })
                } else {
                    result[result.length - 1].ingredients.push({
                        id: data.properties.id,
                        name: data.properties.name
                    })
                }
            })
            res.send(result)
        })
        .catch(err => console.log(err))
        .then(() => session.close())
}


const updateProductHandler = (req, res) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        categories: req.body.categories
    }

    const deleteRelQuery = `MATCH (p:Products {id: ${product.id}})-[rel]-() DELETE rel`
    const setPropertiesQuery = `MATCH (p:Products {id: ${product.id}}) SET p.name="${product.name}", p.price=${product.price}`

    const addIngredientQuery = (ing) =>
        `MATCH (p: Products), (i: Ingredients) 
        WHERE p.id=${product.id} AND i.name="${ing}" 
        CREATE (p)-[r:has_ingredient]->(i)
        RETURN type(r)`

    const addCategoryQuery = (cat) =>
        `MATCH (p: Products), (c: Categories)
        WHERE p.id=${product.id} AND c.name="${cat}"
        CREATE (p)-[r1:has_category]->(c)
        CREATE (p)<-[r2:has_products]-(c)
        RETURN r1, r2`

    const session = driver.session()

    session.run(deleteRelQuery)
        .then(() => session.run(setPropertiesQuery))
        .then(() => {
            return session.executeWrite(tx =>
                Promise.all(product.ingredients.map(ing => tx.run(addIngredientQuery(ing))))
            )
        })
        .then(() => {
            return session.executeWrite(tx =>
                Promise.all(product.categories.map(cat => tx.run(addCategoryQuery(cat))))
            )
        })
        .then(values => res.send(values))
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: 'Internal server error', error: err })
        })
        .then(() => session.close())
}

const newProductHandler = (req, res) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        categories: req.body.categories
    }

    const createNodeQuery =
        `MATCH (p:Products)
        WITH MAX(toInteger(p.id))+1 as new_id
        CREATE (np: Products {id: new_id, name: "${product.name}", price: ${product.price}})
        RETURN new_id`

    const addIngredientQuery = (ing) =>
        `MATCH (p: Products), (i: Ingredients) 
        WHERE p.id=${pid} AND i.name="${ing}"
        CREATE (p)-[r:has_ingredient]->(i)
        RETURN type(r)`

    const addCategoryQuery = (cat) =>
        `MATCH (p: Products), (c: Categories)
        WHERE p.id=${pid} AND c.name="${cat}"
        CREATE (p)-[r1:has_category]->(c)
        CREATE (p)<-[r2:has_products]-(c)
        RETURN r1, r2`

    const session = driver.session()

    let pid = 0;

    session.run(createNodeQuery)
        .then((data) => {
            pid = data.records[0].get('new_id')
            return session.executeWrite(tx =>
                Promise.all(product.ingredients.map(ing => tx.run(addIngredientQuery(ing))))
            )
        })
        .then(() => {
            return session.executeWrite(tx =>
                Promise.all(product.categories.map(cat => tx.run(addCategoryQuery(cat))))
            )
        })
        .then(values => res.send(values))
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: 'Internal server error', error: err })
        })
        .then(() => session.close())
}

const deleteProductHandler = (req, res) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    }

    const query = `MATCH (p:Products {id: ${product.id}}) DETACH DELETE p`

    sendQuery(
        query,
        () => res.send({ message: `Deleted product with id: ${product.id}` }),
        () => internalErrorHandler(res)
    )
}

const addProductIngredientHandler = (req, res) => {
    const product_id = req.body.product_id;
    const ingredient_id = req.body.ingredient_id;

    const query =
        `MATCH (p: Products {id: ${product_id}}) 
        MATCH (i: Ingredients {id: ${ingredient_id}}) 
        CREATE (p)-[rel1:has_ingredient]->(i) 
        CREATE (i)-[rel2:has_products]->(p)`

    sendQuery(
        query,
        () => res.send({ message: `Created rel between product_id: ${product_id} and ingredient_id ${ingredient_id}` }),
        () => internalErrorHandler(res)
    )
}

const removeProductIngredientHandler = (req, res) => {
    const product_id = req.body.product_id
    const ingredient_id = req.body.ingredient_id;

    const query =
        `MATCH (p:Products)-[rel1:has_ingredient]->(i:Ingredients)
        MATCH (i:Ingredients)-[rel2:has_products]->(p:Products)
        WHERE p.id=${product_id} AND i.id=${ingredient_id}
        DETACH DELETE rel1, rel2`

    sendQuery(
        query,
        () => res.send({ message: `Deleted rel between product_id: ${product_id} and ingredient_id ${ingredient_id}` }),
        () => internalErrorHandler(res)
    )
}

const setProductCategory = (req, res) => {
    const product_id = req.body.product_id;
    const category_id = req.body.category_id

    const query = `
    MATCH (p:Products)<-[rel1:has_products]-(old:Categories)
    DETACH DELETE rel1
    MATCH (p)-[rel2:has_category]->(old)
    DETACH DELETE rel2
    CREATE (p)-[:has_category]->(cat:Categories)
    CREATE (cat)-[:has_products]->(p)
    WHERE p.id=${product_id} AND cat.id=${category_id}
    RETURN old
    `

    sendQuery(
        query,
        () => res.send({ message: `Category for product_id: ${product_id} set with category_id ${category_id}` }),
        () => internalErrorHandler(res)
    )
}

module.exports = {
    getProductsHandler,
    updateProductHandler,
    newProductHandler,
    deleteProductHandler,
    setProductCategory,
    addProductIngredientHandler,
    removeProductIngredientHandler,
    getProductsWithDataHandler
}