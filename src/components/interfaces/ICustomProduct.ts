import IIngredient from "./IIngredient";
import IProduct from "./IProduct";

export default interface ICustomProduct extends IProduct {
  ingredients: IIngredient[]
}