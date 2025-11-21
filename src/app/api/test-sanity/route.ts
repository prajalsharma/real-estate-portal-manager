 import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function GET() {
  try {
    const result = await client.fetch('*[_type == "property"][0...3]')
    
    return NextResponse.json({
      success: true,
      message: 'Sanity connection successful',
      propertyCount: result.length,
      sampleProperties: result.map((p: any) => ({
        title: p.title,
        price: p.price,
        location: p.address?.city
      }))
    })
  } catch (error) {
    console.error('Sanity connection error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
