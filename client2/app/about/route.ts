import { NextResponse } from 'next/server'
import { API_BASE_URL } from '../api/api'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const response = await fetch(`${API_BASE_URL}/a00pi/v1/itineraries/${id}`)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch itinerary' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}