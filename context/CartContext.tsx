"use client";


import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Product = {
    id: number;
    name: string;
    price: number;
    image_path: string;

}

type CartContextType = {
    CartItems: Product[];
    addToCart: (product: Product) => void;


};


interface CartProviderProps {
    children: ReactNode;

}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "cart_items";


export function CartProvider({ children }: CartProviderProps) {


    const [CartItems, setitems] = useState<Product[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CartItems))
    }, [CartItems])




    function addToCart(product: Product) {
        setitems([...CartItems, product])

    }


    return <CartContext.Provider
        value={{
            CartItems,
            addToCart
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


