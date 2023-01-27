import { useEffect, useState } from "react";
import IProduct from "../interfaces/IProduct";
import ICategory from "../interfaces/ICategory";
import { Field, Form, Formik } from "formik";
import IIngredient from "../interfaces/IIngredient";
import IProductWithRel from "../interfaces/IProductWithRel";
import ProductForm from "../AdminForm/ProductForm";

const ProductEditor = () => {
  const [products, setProducts] = useState<IProductWithRel[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [currentEditor, setCurrentEditor] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    fetch("http://localhost:3000/ingredients", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((err) => console.log(err));
  };

  const fetchCategories = () => {
    fetch("http://localhost:3000/categories", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    setCurrentEditor(null);
    fetch("http://localhost:3000/products/all", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  const deleteProduct = (product: IProduct) => {
    fetch("http://localhost:3000/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
      }),
    })
      .then((response) => response.json())
      .then(() => fetchProducts())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h4>Products CRUD</h4>
      <div>
        <h4>DODAJ NOWY PRODUKT</h4>
        <ProductForm
          onChange={fetchProducts}
          options={{ ingredients, categories }}
        />
      </div>
      <div>
        {products.map((product) => (
          <div
            className="bg-white p-2 m-2 shadow-md  rounded-md"
            key={product.id}
          >
            <span
              onClick={() =>
                currentEditor !== product.id
                  ? setCurrentEditor(product.id)
                  : setCurrentEditor(null)
              }
            >
              ID: {product.id} Name: {product.name} Price: {product.price}
            </span>
            {currentEditor === product.id && (
              <ProductForm
                product={product}
                onChange={fetchProducts}
                options={{ ingredients, categories }}
              />
            )}
            <button className="ml-5" onClick={() => deleteProduct(product)}>USUŃ</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductEditor;
