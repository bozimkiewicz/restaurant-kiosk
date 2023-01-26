import IProduct from "./IProduct";
import ICustomProduct from "./ICustomProduct";

export default interface ICartProducts {
  product: IProduct | ICustomProduct;
  amount: number;
  isCustom: boolean
}