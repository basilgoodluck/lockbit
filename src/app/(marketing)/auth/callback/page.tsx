'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ClipLoader } from 'react-spinners'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!error && data.session) {
        router.replace('/dashboard')
      } else {
        router.replace('/login') 
      }
    }

    handleRedirect()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="flex flex-col items-center gap-4">
        <ClipLoader color="#eee" size={48} />
        <p className="text-lg text-neutral-900 dark:text-neutral-100">
          Processing login...
        </p>
      </div>
    </div>
  )
}
