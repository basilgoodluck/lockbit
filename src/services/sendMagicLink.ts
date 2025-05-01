import { supabase } from "@/lib/supabase";

export const sendMagicLink = async (email: string) => {
    try {
        let { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
            }
        })

        return { data, error }
    }

    catch(err: any){
        console.log(err.message || "Unknown error")
    }

}