'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function ButtonLogout() {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
