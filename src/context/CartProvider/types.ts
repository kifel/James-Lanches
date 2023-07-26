import { Category } from "../../@types/globalTypes";

export interface IProduct {
  id: string;
  name: string;
  rating: number;
  price: number;
  stock: number;
  imageUrl: string;
  category: Category;
}

export interface CartItem {
  product: IProduct;
  quantity: number;
}

export interface IContext {
  cartItems: CartItem[];
  addToCart: (item: IProduct) => void;
  removeFromCart: (id: string) => void;
  getTotalItems: () => number;
}


export interface ICartProvider {
  children: JSX.Element;
}
