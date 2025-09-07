'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'

export function ButtonSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Le password non corrispondono')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)

    const { error } = await signInWithGoogle()
    
    if (error) {
      setError(error.message)
    }
    
    setLoading(false)
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Controlla la tua email</CardTitle>
          <CardDescription className="text-white/80">
            Ti abbiamo inviato un link di conferma per verificare il tuo account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-green-300 bg-green-500/20 border border-green-500/30 p-3 rounded-md backdrop-blur-sm">
            Controlla la tua email e clicca sul link di conferma per completare la registrazione.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Crea Account</CardTitle>
        <CardDescription className="text-white/80">
          Inserisci i tuoi dati per creare un nuovo account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Crea una password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white font-medium">Conferma Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Conferma la tua password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          {error && (
            <div className="text-sm text-red-300 bg-red-500/20 border border-red-500/30 p-3 rounded-md backdrop-blur-sm">
              {error}
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300" 
            disabled={loading}
          >
            {loading ? 'Creazione account...' : 'Crea Account'}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-white/60">
              Oppure continua con
            </span>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continua con Google
        </Button>
      </CardContent>
    </Card>
  )
}
