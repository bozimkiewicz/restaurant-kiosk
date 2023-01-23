import { useState, useEffect } from "react";
import Product from "./Product";
import IProduct from "../../interfaces/IProduct";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = () => {
    fetch(`http://localhost:3000/products/all`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div>
      <ul>
        {products.map((product) => 
          <Product key={product.id} product={product} />)}
      </ul>
    </div>
  );
};

export default Products;
