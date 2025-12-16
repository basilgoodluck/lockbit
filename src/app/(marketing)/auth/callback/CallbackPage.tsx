// CallbackClient.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { verifyLoginLink } from '@/store/slices/authSlice'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const handleRedirect = async () => {
      const code = searchParams.get("code")!

      if (!code) {
        router.replace('/auth/login')
      } 
      const response = await dispatch(verifyLoginLink({ code }))
      
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