"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthProvider({children} : { children: ReactNode}) {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/login");
  // });

  return (
    <>
    {children}
    </>
  );
}
