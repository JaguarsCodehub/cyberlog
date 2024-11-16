'use client';
import { useState } from 'react';
import SearchBar from '@/components/Searchbar';
import DomainList from '@/components/DomainList';
import type { Domain } from '@/types/domain';

export default function Home() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1);

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

  const indexOfLastDomain = currentPage * resultsPerPage;
  const indexOfFirstDomain = indexOfLastDomain - resultsPerPage;
  const currentDomains = domains.slice(indexOfFirstDomain, indexOfLastDomain);

  const totalPages = Math.ceil(domains.length / resultsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Domain Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <div className='text-red-500 my-4'>{error}</div>}
      {loading ? (
        <div className='my-4'>Loading...</div>
      ) : (
        <>
          <div className='flex justify-center items-center my-4'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='mx-1 px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition'
            >
              Previous
            </button>
            {currentPage > 2 && (
              <button
                onClick={() => handlePageChange(1)}
                className='mx-1 px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 transition'
              >
                1
              </button>
            )}
            {currentPage > 3 && <span className='mx-1'>...</span>}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber < currentPage - 1 ||
                pageNumber > currentPage + 1
              ) {
                return null; // Skip rendering for skipped pages
              }
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`mx-1 px-4 py-2 rounded ${
                    currentPage === pageNumber
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300 transition'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            {currentPage < totalPages - 2 && <span className='mx-1'>...</span>}
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className='mx-1 px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 transition'
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='mx-1 px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition'
            >
              Next
            </button>
          </div>
          <DomainList domains={currentDomains} />
        </>
      )}
    </main>
  );
}
