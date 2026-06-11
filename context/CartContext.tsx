"use client";


import { createContext, ReactNode, useContext, useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    image_path: string;

}

type CartContextType = {
    CartItems: Product[];

};

interface CartProviderProps {
    children: ReactNode;

}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: CartProviderProps) {
    const sampleProduct: Product[] = [{
        id: 100,
        name: "jack",
        price: 100,
        image_path: "products/jack.jpg",

    },]

    const [CartItems, setitems] = useState<Product[]>(sampleProduct);

    return <CartContext.Provider
        value={{
            CartItems,
        }}

    >
        {children}
    </CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);

    if (!ctx) throw new Error("Ctx");

    return ctx;

}


