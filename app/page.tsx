import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: products, error } = await supabase
    .from("products")
    .select("id, title, price, image_path")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 p-8">
        <p className="text-red-500">
          Failed to load products: {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="flex justify-between  ">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">products</h1>


        <Link
          className="bg-black text-white p-3 rounded-md flex gap-4 h-fit"
          href="/admin"> <Plus /> Add new products</Link>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => {
          const { data: imgData } = supabase.storage
            .from("product-images")
            .getPublicUrl(product.image_path);

          return (
            <ProductCard id={product.id} title={product.title} image_url={imgData.publicUrl} price={product.price}

            />

          );
        })}
      </div>
    </main>
  );
}

