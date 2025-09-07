'use client'

import { useAuth } from "@/contexts/AuthContext"
import { ButtonLogout } from "@/components/auth/ButtonLogout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <nav className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Aura Travel
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/90 font-medium">Benvenuto, {user?.email}</span>
              <ButtonLogout />
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          <p className="text-white/90 text-xl font-medium">Gestisci le tue prenotazioni di viaggio e preferenze</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="relative">
              <CardTitle className="text-white text-xl">Le Mie Prenotazioni</CardTitle>
              <CardDescription className="text-white/80 font-medium">
                Visualizza e gestisci le tue prenotazioni di viaggio
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-white/90 mb-6 font-medium">
                Non hai ancora prenotazioni. Inizia a esplorare le destinazioni!
              </p>
              <Link href="/plan">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                  Pianifica Viaggio
                </button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="relative">
              <CardTitle className="text-white text-xl">Profilo</CardTitle>
              <CardDescription className="text-white/80 font-medium">
                Gestisci le informazioni del tuo account
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{user?.email}</p>
                    <p className="text-white/80 text-sm font-medium">Membro dal {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="relative">
              <CardTitle className="text-white text-xl">Preferenze</CardTitle>
              <CardDescription className="text-white/80 font-medium">
                Personalizza le tue preferenze di viaggio
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-white/90 mb-6 font-medium">
                Imposta le tue preferenze di viaggio per ottenere raccomandazioni personalizzate.
              </p>
              <button className="w-full bg-white/10 border border-white/30 text-white py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                Prossimamente
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
