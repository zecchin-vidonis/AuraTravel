import { NextRequest, NextResponse } from 'next/server'

interface FlightSearchRequest {
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
  adults: number
  children: number
  infants: number
  travelClass: string
}

interface AmadeusFlightOffer {
  id: string
  price: {
    total: string
    currency: string
  }
  itineraries: Array<{
    duration: string
    segments: Array<{
      departure: {
        iataCode: string
        at: string
      }
      arrival: {
        iataCode: string
        at: string
      }
      carrierCode: string
      number: string
      duration: string
    }>
  }>
  validatingAirlineCodes: string[]
}

export async function POST(request: NextRequest) {
  try {
    const searchData: FlightSearchRequest = await request.json()

    // Validate required fields
    if (!searchData.origin || !searchData.destination || !searchData.departureDate) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      )
    }

    // Validate airport codes format (must be exactly 3 letters)
    if (!/^[A-Z]{3}$/.test(searchData.origin)) {
      return NextResponse.json(
        { error: 'Il codice aeroporto di partenza deve essere di 3 lettere (es. FCO, JFK, LHR)' },
        { status: 400 }
      )
    }

    if (!/^[A-Z]{3}$/.test(searchData.destination)) {
      return NextResponse.json(
        { error: 'Il codice aeroporto di destinazione deve essere di 3 lettere (es. FCO, JFK, LHR)' },
        { status: 400 }
      )
    }

    // Validate that origin and destination are different
    if (searchData.origin === searchData.destination) {
      return NextResponse.json(
        { error: 'L\'aeroporto di partenza e destinazione devono essere diversi' },
        { status: 400 }
      )
    }

    // Validate departure date format and that it's not in the past
    const departureDate = new Date(searchData.departureDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to start of day

    if (isNaN(departureDate.getTime())) {
      return NextResponse.json(
        { error: 'Formato data di partenza non valido. Usa il formato YYYY-MM-DD' },
        { status: 400 }
      )
    }

    if (departureDate < today) {
      return NextResponse.json(
        { error: 'La data di partenza non può essere nel passato' },
        { status: 400 }
      )
    }

    // Validate return date if provided
    if (searchData.returnDate) {
      const returnDate = new Date(searchData.returnDate)
      if (isNaN(returnDate.getTime())) {
        return NextResponse.json(
          { error: 'Formato data di ritorno non valido. Usa il formato YYYY-MM-DD' },
          { status: 400 }
        )
      }
      if (returnDate <= departureDate) {
        return NextResponse.json(
          { error: 'La data di ritorno deve essere successiva alla data di partenza' },
          { status: 400 }
        )
      }
    }

    // Validate passenger numbers
    if (searchData.adults < 1 || searchData.adults > 9) {
      return NextResponse.json(
        { error: 'Il numero di adulti deve essere tra 1 e 9' },
        { status: 400 }
      )
    }

    if (searchData.children < 0 || searchData.children > 9) {
      return NextResponse.json(
        { error: 'Il numero di bambini deve essere tra 0 e 9' },
        { status: 400 }
      )
    }

    if (searchData.infants < 0 || searchData.infants > 9) {
      return NextResponse.json(
        { error: 'Il numero di neonati deve essere tra 0 e 9' },
        { status: 400 }
      )
    }

    // Validate travel class
    const validTravelClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']
    if (!validTravelClasses.includes(searchData.travelClass)) {
      return NextResponse.json(
        { error: 'Classe di viaggio non valida. Usa: ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST' },
        { status: 400 }
      )
    }

    // Get Amadeus API credentials from environment variables
    const amadeusApiKey = process.env.AMADEUS_API_KEY
    const amadeusApiSecret = process.env.AMADEUS_API_SECRET

    if (!amadeusApiKey || !amadeusApiSecret) {
      console.error('Missing Amadeus API credentials')
      return NextResponse.json(
        { error: 'Configurazione API Amadeus mancante. Aggiungi AMADEUS_API_KEY e AMADEUS_API_SECRET al file .env.local' },
        { status: 500 }
      )
    }

    // First, get access token from Amadeus
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: amadeusApiKey,
        client_secret: amadeusApiSecret,
      }),
    })

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text()
      console.error('Token authentication failed:', tokenError)
      throw new Error(`Errore nell'autenticazione con Amadeus: ${tokenResponse.status} ${tokenResponse.statusText}`)
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Build search parameters
    const searchParams = new URLSearchParams({
      originLocationCode: searchData.origin,
      destinationLocationCode: searchData.destination,
      departureDate: searchData.departureDate,
      adults: searchData.adults.toString(),
      children: searchData.children.toString(),
      infants: searchData.infants.toString(),
      travelClass: searchData.travelClass,
      max: '20', // Limit results
    })

    // Add return date if provided
    if (searchData.returnDate) {
      searchParams.append('returnDate', searchData.returnDate)
    }

    // Search for flights
    const flightsResponse = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${searchParams}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )

    if (!flightsResponse.ok) {
      let errorMessage = 'Errore sconosciuto'
      try {
        const errorData = await flightsResponse.json()
        console.error('Amadeus API Error:', errorData)
        errorMessage = errorData.detail || errorData.errors?.[0]?.detail || `HTTP ${flightsResponse.status}: ${flightsResponse.statusText}`
      } catch (parseError) {
        console.error('Error parsing Amadeus response:', parseError)
        errorMessage = `HTTP ${flightsResponse.status}: ${flightsResponse.statusText}`
      }
      throw new Error(`Errore nella ricerca voli: ${errorMessage}`)
    }

    const flightsData = await flightsResponse.json()

    // Transform Amadeus response to our format
    const transformedFlights = flightsData.data?.map((offer: AmadeusFlightOffer) => {
      const itinerary = offer.itineraries[0]
      const segment = itinerary.segments[0]
      const lastSegment = itinerary.segments[itinerary.segments.length - 1]

      return {
        id: offer.id,
        price: offer.price.total,
        currency: offer.price.currency,
        departure: {
          airport: segment.departure.iataCode,
          time: new Date(segment.departure.at).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          date: new Date(segment.departure.at).toLocaleDateString('it-IT')
        },
        arrival: {
          airport: lastSegment.arrival.iataCode,
          time: new Date(lastSegment.arrival.at).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          date: new Date(lastSegment.arrival.at).toLocaleDateString('it-IT')
        },
        duration: itinerary.duration,
        airline: getAirlineName(offer.validatingAirlineCodes[0]),
        flightNumber: `${segment.carrierCode}${segment.number}`,
        stops: itinerary.segments.length - 1
      }
    }) || []

    return NextResponse.json({
      flights: transformedFlights,
      total: transformedFlights.length
    })

  } catch (error) {
    console.error('Error searching flights:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Errore interno del server' },
      { status: 500 }
    )
  }
}

// Helper function to get airline name from IATA code
function getAirlineName(iataCode: string): string {
  const airlines: { [key: string]: string } = {
    'AZ': 'Alitalia',
    'LH': 'Lufthansa',
    'AF': 'Air France',
    'BA': 'British Airways',
    'KL': 'KLM',
    'IB': 'Iberia',
    'SN': 'Brussels Airlines',
    'LX': 'Swiss',
    'OS': 'Austrian Airlines',
    'TP': 'TAP Air Portugal',
    'AY': 'Finnair',
    'SK': 'SAS',
    'LO': 'LOT Polish Airlines',
    'OK': 'Czech Airlines',
    'RO': 'Tarom',
    'SU': 'Aeroflot',
    'TK': 'Turkish Airlines',
    'MS': 'EgyptAir',
    'AT': 'Royal Air Maroc',
    'ET': 'Ethiopian Airlines',
    'QR': 'Qatar Airways',
    'EK': 'Emirates',
    'EY': 'Etihad Airways',
    'SV': 'Saudia',
    'GF': 'Gulf Air',
    'KU': 'Kuwait Airways',
    'RJ': 'Royal Jordanian',
    'WY': 'Oman Air',
    'FZ': 'Flydubai',
    'G9': 'Air Arabia',
    'J9': 'Jazeera Airways',
    '3O': 'Air Arabia Maroc',
    '5W': 'Wizz Air',
    'FR': 'Ryanair',
    'U2': 'easyJet',
    'VY': 'Vueling',
    'EW': 'Eurowings',
    '4U': 'Germanwings',
    'PC': 'Pegasus Airlines',
    'XQ': 'SunExpress',
    'AA': 'American Airlines',
    'DL': 'Delta Air Lines',
    'UA': 'United Airlines',
    'WN': 'Southwest Airlines',
    'B6': 'JetBlue Airways',
    'NK': 'Spirit Airlines',
    'F9': 'Frontier Airlines',
    'AS': 'Alaska Airlines',
    'HA': 'Hawaiian Airlines',
    'AC': 'Air Canada',
    'WS': 'WestJet',
    'PD': 'Porter Airlines',
    'TS': 'Air Transat',
    'Y9': 'Air Arabia Abu Dhabi',
    '6E': 'IndiGo',
    'SG': 'SpiceJet',
    'AI': 'Air India',
    '9W': 'Jet Airways',
    'G8': 'GoAir',
    'I5': 'AirAsia India',
    'IX': 'Air India Express',
    'S2': 'JetLite',
    'DN': 'Air Deccan',
    'IT': 'Kingfisher Airlines',
    'SJ': 'SpiceJet',
    '9I': 'Alliance Air',
    'I9': 'Air India Regional',
    '2T': 'TruJet',
    'QP': 'Alliance Air'
  }

  return airlines[iataCode] || iataCode
}