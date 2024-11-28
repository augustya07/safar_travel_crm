'use server'

export async function getHotels() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/hotels`, {
        cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch hotels')
    }
    
    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Error fetching hotels:', error)
    throw error
  }
}