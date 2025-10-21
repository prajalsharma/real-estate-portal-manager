# Sanity CMS Integration Guide

This guide will help you set up Sanity CMS for your Real Estate Portal Manager.

## 🚀 Quick Setup

### 1. Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project:
   ```bash
   npx create-sanity@latest
   # Or use the web interface at sanity.io/manage
   ```
3. Note down your **Project ID** and **Dataset name** (usually "production")

### 2. Configure Environment Variables

1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Sanity credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
   NEXT_PUBLIC_SANITY_DATASET="production"
   SANITY_API_TOKEN="your-write-token-here"  # Optional, for write operations
   ```

### 3. Install Dependencies

```bash
# Install main project dependencies
npm install

# Install Sanity Studio dependencies
cd sanity
npm install
cd ..
```

### 4. Start Development Servers

```bash
# Terminal 1: Start Next.js app
npm run dev

# Terminal 2: Start Sanity Studio
npm run sanity
```

- **Next.js App**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3333](http://localhost:3333)

## 🏠 Content Structure

### Property Schema
- **Title & Slug**: SEO-friendly URLs
- **Price & Currency**: Multi-currency support (EUR, USD, GBP)
- **Property Details**: Beds, baths, square meters, type
- **Location**: Address + GPS coordinates
- **Images**: Main image + gallery with alt text
- **Features & Amenities**: Searchable tags
- **Agent Reference**: Linked to agent profiles
- **Status**: For Sale, For Rent, Sold, Rented

### Agent Schema
- **Profile**: Name, photo, bio, role
- **Performance**: Rating, properties sold
- **Contact**: Phone, email, social media
- **Specializations**: Areas of expertise
- **Languages**: Communication capabilities

### Blog Schema
- **Content**: Rich text with portable text
- **SEO**: Meta titles, descriptions, keywords
- **Organization**: Categories, tags, featured posts
- **Publishing**: Draft/published status, scheduling

## 📊 Usage Examples

### Fetching Properties

```typescript
// Using the custom hook
import { useFeaturedProperties } from '@/lib/sanity/hooks'

function FeaturedSection() {
  const { properties, loading, error } = useFeaturedProperties(4)
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {properties.map(property => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  )
}
```

### Using Images

```typescript
// Responsive property images
import { getPropertyCardImageUrl } from '@/lib/sanity/image'

function PropertyCard({ property }) {
  const imageUrl = getPropertyCardImageUrl(property.mainImage)
  
  return (
    <img 
      src={imageUrl} 
      alt={property.mainImage.alt || property.title}
      className="w-full h-48 object-cover"
    />
  )
}
```

### Filtering Properties

```typescript
// Advanced filtering
import { useProperties } from '@/lib/sanity/hooks'

function PropertyListing() {
  const filters = {
    location: 'Athens',
    propertyType: 'Apartment',
    minPrice: 200000,
    maxPrice: 500000,
    beds: '2'
  }
  
  const { properties, loading, total } = useProperties(filters, 1, 12)
  
  return (
    <div>
      <p>Found {total} properties</p>
      {/* Render properties */}
    </div>
  )
}
```

## 🛠️ Customization

### Adding New Fields

1. **Update Schema** (`sanity/schemaTypes/property.ts`):
   ```typescript
   defineField({
     name: 'virtualTour',
     title: 'Virtual Tour URL',
     type: 'url',
   })
   ```

2. **Update Types** (`src/lib/sanity/types.ts`):
   ```typescript
   export interface SanityProperty {
     // ... existing fields
     virtualTour?: string
   }
   ```

3. **Update Queries** (`src/lib/sanity/queries.ts`):
   ```typescript
   export const PROPERTY_QUERY_FIELDS = `
     // ... existing fields
     virtualTour,
   `
   ```

### Custom Validation

```typescript
// In schema files
defineField({
  name: 'price',
  title: 'Price',
  type: 'number',
  validation: (Rule) => Rule.required().min(1000).max(10000000)
})
```

## 🕰️ Migration from Static Data

Your existing components will work with minimal changes:

### Before (Static Data):
```typescript
const defaultProperties = [
  {
    id: "p1",
    title: "Sunlit Maisonette",
    price: 385000,
    // ...
  }
]
```

### After (Sanity Data):
```typescript
const { properties } = useFeaturedProperties(4)
// Properties have the same structure!
```

## 🌐 Deployment

### Deploy Sanity Studio

1. **Build and deploy**:
   ```bash
   npm run sanity:build
   npm run sanity:deploy
   ```

2. **Set up hosting** (choose one):
   - **Sanity Hosting**: Automatic with `sanity deploy`
   - **Vercel**: Deploy the `/sanity` folder
   - **Netlify**: Deploy the `/sanity` build output

### Production Environment

1. **Add environment variables** to your hosting platform:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-production-token
   ```

2. **Configure CORS** in Sanity dashboard:
   - Go to `sanity.io/manage`
   - Add your production domain to CORS origins

## 📝 Sample Content

To populate your Sanity Studio with sample data:

1. **Create Agents first** (properties reference agents)
2. **Add Locations** for better organization
3. **Create Blog Categories** 
4. **Add Properties** with proper agent references
5. **Write Blog Posts** 

### Sample Agent:
```
Name: Eleni Papadopoulou
Role: Senior Listing Agent • Athens
Phone: +30 210 123 4567
Email: eleni@spasicrealestate.com
Rating: 5.0
Properties Sold: 132
```

### Sample Property:
```
Title: Elegant Seaside Apartment
Price: 520000 EUR
Type: Apartment
Beds: 3, Baths: 2
Location: Glyfada, Athens
Agent: Eleni Papadopoulou
Status: For Sale
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Project not found"**: Check your project ID and dataset name
2. **"Unauthorized"**: Verify your API token and permissions
3. **CORS errors**: Add your domain to Sanity CORS settings
4. **Schema errors**: Run `sanity deploy` after schema changes

### Debug Mode:

```typescript
// Enable debug mode in client
export const client = createClient({
  // ... other config
  useCdn: false, // Disable CDN for real-time data
})
```

## 🔗 Useful Resources

- **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **GROQ Query Language**: [sanity.io/docs/groq](https://sanity.io/docs/groq)
- **Next.js Integration**: [sanity.io/plugins/next-sanity](https://sanity.io/plugins/next-sanity)
- **Community**: [sanity.io/community](https://sanity.io/community)

---

🎉 **You're all set!** Your real estate portal now has a powerful, flexible CMS backing it. Start adding content through the Sanity Studio and watch your site come alive with real data!