import ICategory from "./ICategory";
import IIngredient from "./IIngredient";

export default interface IProductWithRel {
  id: number;
  name: string;
  price: number;
  ingredients: IIngredient[];
  categories: ICategory[];
}
