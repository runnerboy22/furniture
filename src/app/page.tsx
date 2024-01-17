'use client';

import { useState, useEffect } from 'react';

import { StorageFacility } from '@/lib/scraper';

export default function Home() {
  const [data, setData] = useState<StorageFacility | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      const pairs = await fetch('/api/uhaul');
      const data = await pairs.json();
      console.log('data', data);
      setData(data);
      setIsLoading(false); // Stop loading regardless of the outcome
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading data...</p>; // Display loading message while fetching
  }

  return (
    <div>
      <h1>Data from API:</h1>
      {data ? (
        // Render your data here
        <div>{JSON.stringify(data)}</div>
      ) : (
        <p>No data found.</p> // Display if no data is found
      )}
    </div>
  );
}
//   return (
//     <div>
//       <h1>Get Your Furniture Delivered</h1>
//       {/* {data && <div>{data.uHaul}</div>} */}
//       {data && <div>{data.uHaul}</div>}
//     </div>
//   );
// }
