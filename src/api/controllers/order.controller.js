const { randomUUID } = require("crypto")
const { DateTime } = require("neo4j-driver")
const { sendQuery, internalErrorHandler } = require("./driver.controller")


const statDayHandler = (req, res) => {

}

const statMonthHandler = (req, res) => {



    let year_cur = req.body.year
    let month_cur = req.body.month
    let year_next = month_cur === 12 ? year_cur + 1 : year_cur
    let month_next = month_cur === 12 ? 1 : month_cur

    let query = `MATCH (o: Orders) 
        WHERE 
            date({year: ${year_next}, month: ${month_next}}) 
            > o.date 
            >= date({year: ${year_cur}, month: ${month_cur}})
        WITH 
            count(o) as no_orders, 
            sum(o.total) as total_earnings,
            count(o) WHERE o.payment="cash" as no_cash_payments,
            count(o) WHERE o.payment="card" as no_card_payments,
            count(o) WHERE o.order_method="na wynos" as no_out_orders,
            count(o) WHERE o.order_method="na miejscu" as no_in_orders
        RETURN 
            no_orders,
            total_earnings,
            no_cash_payments,
            no_card_payments,
            no_out_orders,
            no_in_orders`


}

const newOrderHandler = (req, res) => {
    const order = {
        id: randomUUID(),
        date: DateTime.fromStandardDate(new Date(Date.now())),

        items: req.body.items,
        payment: req.body.payment,
        total: req.body.total,
        order_method: req.body.order_method
    }

    console.log(order.order_method)

    const query = `CREATE (o: Orders {
            id: "${order.id}", 
            date: date(datetime("${order.date}")), 
            items: "${order.items.length}", 
            payment: "${order.payment}",
            order_method: "${order.order_method}",
            total: ${order.total}
        })
        RETURN o`

    sendQuery(
        query,
        (data) => res.send(data),
        () => internalErrorHandler(res)
    )
}

module.exports = {
    statDayHandler,
    statMonthHandler,
    newOrderHandler
}