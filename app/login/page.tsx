"use client";

import { createClient } from "@/utils/supabase/client";
export default function LoginPage() {

    const supabase = createClient();


    async function signIn() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${location.origin}/auth/callback` },
        });
    }




    return <div className="flex justify-center items-center m-6 ">

        <button onClick={signIn}>Continue with Google</button>
    </div>


}

