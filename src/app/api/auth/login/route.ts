import { createClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    try{
        const { email } = await req.json()
        if (!email) {
            return NextResponse.json({ data: "Email Field is required" }, { status: 429 })
        }
        await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
            }
        })
        return NextResponse.json({ data: "success" }, { status: 200 })
    }
    catch(error){
        if (error instanceof Error){
            NextResponse.json({ data: error.message }, { status: 500 })
        }
        return NextResponse.json({ data: "Unknown error occured" }, { status: 500 })
    }
}
