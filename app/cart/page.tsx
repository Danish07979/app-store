
"use client";



import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function CartPage() {
    const { CartItems } = useCart();
    const supabase = createClient();
    const router = useRouter();


    async function Placeorder() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }
        const total = 0;
        const { data: order, error } = await supabase
            .from("orders")
            .insert({ user_id: user.id, total })
            .select()
            .single();

        if (error || !order) {
            console.error(error);
            return;
        }

        await supabase.from("order_items").insert(
            CartItems.map((item) => ({
                order_id: order.id,
                product_id: item.id,
                quantity: 1,
                price: item.price, // snapshot the current price
            })),
        );
        alert("order placed");
    }

    return <div className=" h-fit flex-justify-between items-center w-fit gap-9 m-12 ">
        <button onClick={() => Placeorder()}>Place order</button>
        <Link href="/" className="flex text-white h-fit bg-black p-2 rounded-md">back to the page</Link>


        {CartItems.map((item) => {

            return <ProductCard key={item.id} id={item.id} image_url={item.image_path} price={item.price} title={item.name} />
        })}
    </div>


}