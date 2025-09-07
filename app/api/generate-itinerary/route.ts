import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { planningData } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Chiave API Gemini non configurata' },
        { status: 500 }
      )
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-thinking-exp',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    })

    const prompt = `You are an expert AI travel planner for a mobile/web app with access to real-time web search capabilities.  
Here are the trip specifications provided by the user:
**Destinazione:** ${planningData.destination}  
**Quando:** ${planningData.when}  
**Durata:** ${planningData.duration} giorni  
**Budget:** ${planningData.budget}${planningData.budgetAmount ? ` ($${planningData.budgetAmount}/giorno)` : ''}  
**Tipo di gruppo:** ${planningData.groupType}  
**Fascia d'età:** ${planningData.groupAgeRange}  
**Interessi:** ${planningData.interests.join(', ')}  

# WEB SEARCH INSTRUCTIONS
Use your web search capabilities to gather the most current and accurate information about:
- Current attractions, restaurants, and activities in ${planningData.destination}
- Up-to-date opening hours, prices, and availability
- Recent reviews and recommendations from travelers
- Current weather conditions and forecasts for the travel period
- Local events, festivals, or special activities during the travel dates
- Transportation options and current costs
- Safety information and travel advisories
- Latest travel trends and popular spots
- Real-time pricing for accommodations and activities

# TASK
Produce a complete daily travel itinerary strictly following the Output JSON Schema below.  
The itinerary must be realistic, practical, and tailored to the given values using current web information.  
# RULES
- OUTPUT FORMAT: Return ONLY valid JSON. No explanations, no extra text.
- LANGUAGE: Default to Italian ("it") unless otherwise specified.
- COSTS: Use USD with \`$\` prefix (e.g. "$25") based on current web prices.
- DAYS: Generate exactly \`${planningData.duration}\` days.
- ACTIVITIES: Each day must include activities with:
  • orari (time) - use current opening hours from web search
  • descrizione (description) - include recent information from web
  • luogo/località (location) - verify current addresses
  • trasporto suggerito con durata stimata - use current transport options
  • costo stimato - use current prices from web search
- FOOD: Include at least one lunch and one dinner stop per day with current restaurant information.
- TIPS: Provide 1–3 useful travel tips per day based on current conditions.
- SUMMARY: Provide a final summary section with total days, estimated total cost, highlights, and packing tips.
# OUTPUT JSON SCHEMA
Format the response ONLY in this structure:
{
  "itinerary": [
    {
      "day": 1,
      "date": "Data",
      "activities": [
        {
          "time": "09:00",
          "title": "Titolo attività",
          "description": "Descrizione dettagliata",
          "location": "Indirizzo/luogo",
          "duration": "2 ore",
          "cost": "$20",
          "type": "attrazione/ristorante/trasporto"
        }
      ],
      "totalCost": "$150",
      "tips": ["Consiglio 1", "Consiglio 2"]
    }
  ],
  "summary": {
    "totalDays": ${planningData.duration},
    "estimatedTotalCost": "$1200",
    "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
    "packingTips": ["Consiglio valigia 1", "Consiglio valigia 2"]
  }
}
# STYLE & QUALITY CHECK
- JSON must be strictly valid (no trailing commas, no extra fields).
- Each day must include attractions + restaurants + transport + costs.
- Costs must sum realistically to totalCost per day.
- Summary must reflect the entire trip duration and budget.
- Output must match exactly the schema above.
# NOW DO THE TASK
1) Use the trip specifications above.  
2) Fill in missing fields with reasonable defaults.  
3) Generate the full itinerary according to the schema.  
4) Return ONLY the JSON object, nothing else.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    
    // Check if the response was blocked or filtered
    if (response.promptFeedback?.blockReason) {
      console.error('Response blocked:', response.promptFeedback.blockReason)
      return NextResponse.json(
        { error: 'Contenuto bloccato dal filtro di sicurezza' },
        { status: 400 }
      )
    }
    
    const text = response.text()

    // Parse the JSON response
    let itineraryData
    try {
      // Clean the response text (remove markdown formatting if present)
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      itineraryData = JSON.parse(cleanText)
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      return NextResponse.json(
        { error: 'Impossibile analizzare la risposta dell\'itinerario' },
        { status: 500 }
      )
    }

    return NextResponse.json({ itinerary: itineraryData })

  } catch (error) {
    console.error('Error generating itinerary:', error)
    return NextResponse.json(
      { error: 'Impossibile generare l\'itinerario' },
      { status: 500 }
    )
  }
}
