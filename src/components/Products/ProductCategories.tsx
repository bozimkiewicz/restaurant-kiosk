import { useState, useEffect } from "react";
import ICategory from "../../interfaces/ICategory";
import IProductCategories from "../../interfaces/IProductCategories";

const ProductCategories = (props: IProductCategories) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products/categories", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <ul>
        {categories.map((category: ICategory) => (
          <li key={category.id}>
            <button onClick={() => props.handleCategoryChange(category.name)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <h3>Aktualna kategoria: {props.category}</h3>
    </div>
  );
};

export default ProductCategories;
