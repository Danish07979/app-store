"use client";



import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";




export default function Header() {
    const { CartItems } = useCart();
    const itemCount = CartItems.length;

    return (
        <div className="flex justify-start">
            <h1 className="text-4x1 font-bold p-2 text-yellow-798">E-commerse App</h1>
            <Link href="/cart">
                <div className="flex p-5">
                    <ShoppingCart />
                    <p>{CartItems.length}</p>



                </div>

            </Link>





        </div >
    );
}