'use client';

import { useState, useEffect } from 'react';
import { uHaul } from '@/lib/scraper';

import { storageFacilities } from '@/lib/scraper';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     const pairs = await uHaul(storageFacilities.uHaul);
  //     setData(pairs);
  //     setLoading(false);
  //   }
  //   fetchData();
  // }, []);
  return (
    <div>
      <h1>Get Your Furniture Delivered</h1>
    </div>
  );
}
