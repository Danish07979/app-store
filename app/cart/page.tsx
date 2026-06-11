
"use client";



import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";


export default function CartPage() {
    const { CartItems } = useCart();

    return (


        <div className="flex gap-6 ">
            {CartItems.map((item) => {

                return <ProductCard key={item.id} id={item.id} image_url={item.image_path} price={item.price} title={item.name} />
            })}
        </div>


    )

}