# Configurazione API Amadeus for Developers

## Come ottenere le credenziali API

1. **Registrati su Amadeus for Developers**
   - Vai su [https://developers.amadeus.com/](https://developers.amadeus.com/)
   - Crea un account gratuito

2. **Crea una nuova applicazione**
   - Nel dashboard, clicca su "Create New App"
   - Scegli "Self-Service" per iniziare
   - Compila i dettagli dell'applicazione

3. **Ottieni le credenziali**
   - Dopo la creazione, troverai:
     - **API Key** (Client ID)
     - **API Secret** (Client Secret)

## Configurazione nell'applicazione

1. **Aggiungi le variabili d'ambiente**
   Crea o modifica il file `.env.local` nella root del progetto:

   ```env
   # Amadeus for Developers Configuration
   AMADEUS_API_KEY=your_api_key_here
   AMADEUS_API_SECRET=your_api_secret_here
   ```

2. **Riavvia il server di sviluppo**
   ```bash
   npm run dev
   ```

## Funzionalità disponibili

### Ricerca Voli
- **Endpoint**: `/api/search-flights`
- **Metodo**: POST
- **Parametri richiesti**:
  - `origin`: Codice aeroporto di partenza (es. "FCO")
  - `destination`: Codice aeroporto di destinazione (es. "JFK")
  - `departureDate`: Data di partenza (formato: YYYY-MM-DD)
  - `adults`: Numero di adulti (default: 1)
  - `children`: Numero di bambini (default: 0)
  - `infants`: Numero di neonati (default: 0)
  - `travelClass`: Classe di viaggio (ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST)

### Parametri opzionali
- `returnDate`: Data di ritorno per voli andata e ritorno

## Esempio di utilizzo

```javascript
const searchData = {
  origin: "FCO",
  destination: "JFK", 
  departureDate: "2024-06-15",
  returnDate: "2024-06-22",
  adults: 2,
  children: 1,
  infants: 0,
  travelClass: "ECONOMY"
}

const response = await fetch('/api/search-flights', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(searchData),
})

const data = await response.json()
console.log(data.flights)
```

## Limitazioni dell'ambiente di test

- **Rate Limits**: 2000 chiamate al mese
- **Dati**: I prezzi e la disponibilità sono simulati
- **Aeroporti**: Solo i principali aeroporti internazionali

## Passaggio all'ambiente di produzione

Per utilizzare dati reali:
1. Contatta Amadeus per l'upgrade
2. Cambia l'URL da `test.api.amadeus.com` a `api.amadeus.com`
3. Aggiorna le credenziali con quelle di produzione

## Codici aeroporto comuni

| Città | Codice IATA |
|-------|-------------|
| Roma | FCO |
| Milano | MXP |
| New York | JFK |
| Londra | LHR |
| Parigi | CDG |
| Madrid | MAD |
| Barcellona | BCN |
| Amsterdam | AMS |
| Francoforte | FRA |
| Monaco | MUC |

## Troubleshooting

### Errore: "API key not valid"
- Verifica che le credenziali siano corrette nel file `.env.local`
- Assicurati che il file `.env.local` sia nella root del progetto
- Riavvia il server dopo aver modificato le variabili d'ambiente

### Errore: "Rate limit exceeded"
- Hai raggiunto il limite mensile di 2000 chiamate
- Aspetta il reset mensile o contatta Amadeus per l'upgrade

### Nessun risultato trovato
- Verifica che i codici aeroporto siano corretti
- Controlla che la data sia nel formato corretto (YYYY-MM-DD)
- Assicurati che la data sia almeno 1 giorno nel futuro
