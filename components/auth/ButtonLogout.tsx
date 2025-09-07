'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function ButtonLogout() {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleSignOut}
      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
    >
      Esci
    </Button>
  )
}
