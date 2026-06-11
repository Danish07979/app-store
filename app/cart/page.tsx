
"use client";



import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";


export default function CartPage() {
    const { CartItems } = useCart();

    return (



        <div className="flex gap-6 ">
            <Link href="/" className="flex color-red-700 ">back to the page</Link>


            {CartItems.map((item) => {

                return <ProductCard key={item.id} id={item.id} image_url={item.image_path} price={item.price} title={item.name} />
            })}
        </div>


    )

}