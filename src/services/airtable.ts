// AIRTABLE INTEGRATION - COMMENTED OUT FOR FUTURE USE
// Uncomment and configure when ready to use Airtable as data source

/*
// First, install the Airtable package:
// npm install airtable

import Airtable from 'airtable';

// Configure your Airtable base
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY, // Add to your .env.local
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!); // Add to your .env.local

export interface AirtableBike {
  id: string;
  fields: {
    Name: string;
    Brand?: string;
    Price: number;
    Category: string;
    Description: string;
    Image?: Array<{
      id: string;
      url: string;
      filename: string;
    }>;
    'In Stock'?: boolean;
    'Featured'?: boolean;
  };
}

// Fetch all bikes from Airtable
export async function fetchBikesFromAirtable(): Promise<AirtableBike[]> {
  try {
    const records = await base('Bikes') // Replace 'Bikes' with your table name
      .select({
        // You can add filters here
        filterByFormula: '{In Stock} = TRUE()', // Only fetch bikes in stock
        sort: [{ field: 'Name', direction: 'asc' }],
      })
      .all();

    return records.map(record => ({
      id: record.id,
      fields: record.fields as AirtableBike['fields'],
    }));
  } catch (error) {
    console.error('Error fetching bikes from Airtable:', error);
    throw error;
  }
}

// Fetch featured bikes only
export async function fetchFeaturedBikes(): Promise<AirtableBike[]> {
  try {
    const records = await base('Bikes')
      .select({
        filterByFormula: 'AND({Featured} = TRUE(), {In Stock} = TRUE())',
        sort: [{ field: 'Name', direction: 'asc' }],
      })
      .all();

    return records.map(record => ({
      id: record.id,
      fields: record.fields as AirtableBike['fields'],
    }));
  } catch (error) {
    console.error('Error fetching featured bikes from Airtable:', error);
    throw error;
  }
}

// Fetch bikes by category
export async function fetchBikesByCategory(category: string): Promise<AirtableBike[]> {
  try {
    const records = await base('Bikes')
      .select({
        filterByFormula: `AND({Category} = '${category}', {In Stock} = TRUE())`,
        sort: [{ field: 'Name', direction: 'asc' }],
      })
      .all();

    return records.map(record => ({
      id: record.id,
      fields: record.fields as AirtableBike['fields'],
    }));
  } catch (error) {
    console.error('Error fetching bikes by category from Airtable:', error);
    throw error;
  }
}

// Transform Airtable data to our app format
export function transformAirtableBike(airtableBike: AirtableBike) {
  return {
    id: airtableBike.id,
    name: airtableBike.fields.Name,
    brand: airtableBike.fields.Brand || '',
    price: airtableBike.fields.Price,
    category: airtableBike.fields.Category,
    description: airtableBike.fields.Description,
    image: airtableBike.fields.Image?.[0]?.url || '/images/1.webp', // Fallback image
    inStock: airtableBike.fields['In Stock'] ?? true,
    featured: airtableBike.fields['Featured'] ?? false,
  };
}

// Example usage in a component:
// 
// import { fetchBikesFromAirtable, transformAirtableBike } from '@/services/airtable';
// 
// export default function BikesList() {
//   const [bikes, setBikes] = useState([]);
//   const [loading, setLoading] = useState(true);
// 
//   useEffect(() => {
//     async function loadBikes() {
//       try {
//         const airtableBikes = await fetchBikesFromAirtable();
//         const transformedBikes = airtableBikes.map(transformAirtableBike);
//         setBikes(transformedBikes);
//       } catch (error) {
//         console.error('Failed to load bikes:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
// 
//     loadBikes();
//   }, []);
// 
//   if (loading) return <div>Loading bikes...</div>;
// 
//   return (
//     <div>
//       {bikes.map(bike => (
//         <BikeCard key={bike.id} {...bike} />
//       ))}
//     </div>
//   );
// }

*/

// For now, export empty functions to prevent import errors
export const fetchBikesFromAirtable = async () => [];
export const fetchFeaturedBikes = async () => [];
export const fetchBikesByCategory = async () => [];
export const transformAirtableBike = (bike: any) => bike;