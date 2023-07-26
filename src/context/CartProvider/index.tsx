import { createContext, useEffect, useState } from "react";
import { CartItem, ICartProvider, IContext, IProduct } from "./types";

export const CartContext = createContext<IContext>({} as IContext);

export const CartProvider = ({ children }: ICartProvider) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Função para adicionar um item ao carrinho
  const addToCart = (item: IProduct) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.product.id === item.id
      );

      if (existingItem) {
        const updatedItems = prevItems.map((cartItem) =>
          cartItem.product.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        saveItemsToLocalStorage(updatedItems); // Save to localStorage
        return updatedItems;
      } else {
        const newItems = [...prevItems, { product: item, quantity: 1 }];
        saveItemsToLocalStorage(newItems); // Save to localStorage
        return newItems;
      }
    });
  };

  // Function to save cartItems to localStorage
  const saveItemsToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  // Função para remover um item do carrinho com base no ID do produto
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.product.id !== id)
    );
  };

  // Efeito para carregar os itens do carrinho do localStorage ao carregar a página
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const getTotalItems = () => {
    return cartItems.length;
  };

  // Valor fornecido pelo contexto
  const cartContextValue: IContext = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
