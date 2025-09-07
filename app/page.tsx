'use client'

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { ButtonLogout } from "@/components/auth/ButtonLogout"
import Link from "next/link"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <nav className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Aura Travel</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white/90 font-medium">Benvenuto, {user.email}</span>
                  <ButtonLogout />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/auth/login">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                      Accedi
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                      Registrati
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-white/90 text-sm font-medium">✨ Nuova Esperienza di Viaggio</span>
          </div>
          
          <h2 className="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Scopri Destinazioni
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Straordinarie
            </span>
          </h2>
          
          <p className="mt-8 max-w-2xl mx-auto text-xl text-white/90 leading-relaxed font-medium">
            Pianifica la tua fuga perfetta con Aura Travel. Dalle spiagge tropicali ai rifugi montani,
            trova la tua prossima avventura con l'AI più avanzata.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/plan">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Pianifica il tuo prossimo viaggio
              </Button>
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold">
                  Vai alla Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold">
                  Inizia Ora
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-32">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Esplora Destinazioni</h3>
                <p className="text-white/90 leading-relaxed font-medium">Scopri luoghi meravigliosi in tutto il mondo e trova la tua destinazione di viaggio perfetta con l'AI più avanzata.</p>
              </div>
            </div>

            <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Prenotazione Facile</h3>
                <p className="text-white/90 leading-relaxed font-medium">Prenota i tuoi alloggi con facilità e gestisci le tue prenotazioni in un unico posto con interfaccia intuitiva.</p>
              </div>
            </div>

            <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Esperienza Personalizzata</h3>
                <p className="text-white/90 leading-relaxed font-medium">Ottieni raccomandazioni personalizzate e crea ricordi che durano una vita con itinerari su misura.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
