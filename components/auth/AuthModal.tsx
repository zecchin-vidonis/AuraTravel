'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ButtonSignin } from './ButtonSignin'
import { ButtonSignup } from './ButtonSignup'

export function AuthModal() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
        
        {isSignUp ? <ButtonSignup /> : <ButtonSignin />}
      </div>
    </div>
  )
}
