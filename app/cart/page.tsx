
"use client";



import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";


export default function CartPage() {
    const { CartItems } = useCart();

    return (



        <div className=" h-fit flex-justify-between items-center w-fit gap-9 m-12 ">
            <Link href="/" className="flex text-white h-fit bg-black p-2 rounded-md">back to the page</Link>


            {CartItems.map((item) => {

                return <ProductCard key={item.id} id={item.id} image_url={item.image_path} price={item.price} title={item.name} />
            })}
        </div>


    )

}