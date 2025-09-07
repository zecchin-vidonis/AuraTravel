'use client'

import { useAuth } from "@/contexts/AuthContext"
import { ButtonLogout } from "@/components/auth/ButtonLogout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                Aura Travel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Benvenuto, {user?.email}</span>
              <ButtonLogout />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Gestisci le tue prenotazioni di viaggio e preferenze</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Le Mie Prenotazioni</CardTitle>
              <CardDescription>
                Visualizza e gestisci le tue prenotazioni di viaggio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Non hai ancora prenotazioni. Inizia a esplorare le destinazioni!
              </p>
              <Link href="/destinations">
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Sfoglia Destinazioni
                </button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profilo</CardTitle>
              <CardDescription>
                Gestisci le informazioni del tuo account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm"><strong>Email:</strong> {user?.email}</p>
                <p className="text-sm"><strong>Membro dal:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferenze</CardTitle>
              <CardDescription>
                Personalizza le tue preferenze di viaggio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Imposta le tue preferenze di viaggio per ottenere raccomandazioni personalizzate.
              </p>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                Prossimamente
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
