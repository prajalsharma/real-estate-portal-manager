/**
 * Migration script to convert static data to Sanity CMS
 * Run with: node scripts/migrate-to-sanity.js
 */

const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Sample agents data (from your existing codebase)
const sampleAgents = [
  {
    _type: 'agent',
    name: 'Eleni Papadopoulou',
    slug: { current: 'eleni-papadopoulou' },
    role: 'Senior Listing Agent • Athens',
    rating: 5.0,
    sold: 132,
    phone: '+30 210 123 4567',
    email: 'eleni@spasicrealestate.com',
    specializations: ['Luxury Homes', 'Seaside Properties'],
    languages: ['Greek', 'English'],
    featured: true,
    active: true,
    // Note: You'll need to upload the avatar image separately
  },
  {
    _type: 'agent',
    name: 'Nikos Georgiou',
    slug: { current: 'nikos-georgiou' },
    role: 'Buyer Specialist • Thessaloniki',
    rating: 5.0,
    sold: 98,
    phone: '+30 231 012 3456',
    email: 'nikos@spasicrealestate.com',
    specializations: ['First-time Buyers', 'Investment Properties'],
    languages: ['Greek', 'English', 'German'],
    featured: true,
    active: true,
  },
  {
    _type: 'agent',
    name: 'Maria Konstantinou',
    slug: { current: 'maria-konstantinou' },
    role: 'Luxury Homes • Mykonos',
    rating: 5.0,
    sold: 76,
    phone: '+30 2289 012 345',
    email: 'maria@spasicrealestate.com',
    specializations: ['Luxury Properties', 'Island Real Estate'],
    languages: ['Greek', 'English', 'French'],
    featured: true,
    active: true,
  },
  {
    _type: 'agent',
    name: 'Giorgos Dimitriou',
    slug: { current: 'giorgos-dimitriou' },
    role: 'Commercial • Piraeus',
    rating: 5.0,
    sold: 143,
    phone: '+30 210 765 4321',
    email: 'giorgos@spasicrealestate.com',
    specializations: ['Commercial Properties', 'Industrial Real Estate'],
    languages: ['Greek', 'English'],
    featured: true,
    active: true,
  },
]

// Sample blog categories
const sampleCategories = [
  {
    _type: 'category',
    title: 'Market Insights',
    slug: { current: 'market-insights' },
    description: 'Analysis and trends in the Greek real estate market',
  },
  {
    _type: 'category',
    title: 'Buying Guides',
    slug: { current: 'buying-guides' },
    description: 'Step-by-step guides for property buyers',
  },
  {
    _type: 'category',
    title: 'Mortgage & Finance',
    slug: { current: 'mortgage-finance' },
    description: 'Financial advice and mortgage information',
  },
  {
    _type: 'category',
    title: 'Interior Decoration',
    slug: { current: 'interior-decoration' },
    description: 'Home design and decoration tips',
  },
]

// Sample locations
const sampleLocations = [
  {
    _type: 'location',
    name: 'Kassandra',
    slug: { current: 'kassandra' },
    region: 'Halkidiki',
    country: 'Greece',
    coordinates: { lat: 39.9792, lng: 23.4068 },
    description: 'Beautiful peninsula with beaches and traditional villages',
    featured: true,
    attractions: ['Beaches', 'Traditional Villages', 'Pine Forests'],
  },
  {
    _type: 'location',
    name: 'Nea Moudania',
    slug: { current: 'nea-moudania' },
    region: 'Halkidiki',
    country: 'Greece',
    coordinates: { lat: 40.2167, lng: 23.2833 },
    description: 'Coastal town with marina and local amenities',
    featured: true,
    attractions: ['Marina', 'Restaurants', 'Shopping'],
  },
  {
    _type: 'location',
    name: 'Glyfada',
    slug: { current: 'glyfada' },
    region: 'Athens',
    country: 'Greece',
    coordinates: { lat: 37.8667, lng: 23.7500 },
    description: 'Upscale coastal suburb of Athens',
    featured: true,
    attractions: ['Beach', 'Shopping', 'Nightlife'],
  },
]

async function migrateData() {
  try {
    console.log('🚀 Starting migration to Sanity...')
    
    // Create categories first
    console.log('🏷️ Creating blog categories...')
    const createdCategories = await client.createOrReplace(sampleCategories)
    console.log(`✅ Created ${sampleCategories.length} categories`)
    
    // Create locations
    console.log('📍 Creating locations...')
    const createdLocations = await client.createOrReplace(sampleLocations)
    console.log(`✅ Created ${sampleLocations.length} locations`)
    
    // Create agents
    console.log('👥 Creating agents...')
    const createdAgents = await client.createOrReplace(sampleAgents)
    console.log(`✅ Created ${sampleAgents.length} agents`)
    
    console.log('🎉 Migration completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Open Sanity Studio at http://localhost:3333')
    console.log('2. Upload avatar images for agents')
    console.log('3. Add property images and create property listings')
    console.log('4. Create blog posts')
    console.log('5. Test the frontend integration')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData()
}