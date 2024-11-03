'use client';
import { useState } from 'react';
import SearchBar from '@/components/Searchbar';
import DomainList from '@/components/DomainList';
import type { Domain } from '@/types/domain';

export default function Home() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/domains/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch domains');
      }

      const data = await response.json();
      setDomains(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Domain Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <div className='text-red-500 my-4'>{error}</div>}
      {loading ? (
        <div className='my-4'>Loading...</div>
      ) : (
        <DomainList domains={domains} />
      )}
    </main>
  );
}
