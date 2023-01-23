import { useState, useEffect } from "react";
import Product from "./Product";
import IProduct from "../../interfaces/IProduct";
import ProductCategories from "./ProductCategories";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>()

  const fetchProducts = (category: string) => {
    fetch(`http://localhost:3000/products/${category}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    handleCategoryChange('polecane')
  }, []);

  const handleCategoryChange = (value: string) => {
    setCurrentCategory(value);
    fetchProducts(value)
  };

  return (
    <div>
      <ProductCategories handleCategoryChange={handleCategoryChange} category={currentCategory!} />
      <ul>
        {products.map((product) => 
          <Product key={product.id} product={product} />)}
      </ul>
    </div>
  );
};

export default Products;
