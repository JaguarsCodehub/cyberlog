import type { Domain } from '@/types/domain';

interface DomainListProps {
  domains: Domain[];
}

export default function DomainList({ domains }: DomainListProps) {
  if (domains.length === 0) {
    return (
      <div className='my-8 text-center text-gray-500 text-lg'>
        No domains found
      </div>
    );
  }

  return (
    <div className='mt-12 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-medium tracking-tight mb-6'>
        Search Results
      </h2>
      <div className='space-y-3'>
        {domains.map((domain) => (
          <div
            key={domain.id}
            className='p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 
                     transition-all duration-200 cursor-pointer backdrop-blur-sm
                     hover:translate-y-[-2px]'
          >
            <h3 className='text-lg font-medium text-gray-900'>
              Domain: {domain.domain}
            </h3>
            <p className='text-gray-600 mt-2'>
              Domain Link:{domain.content_link}
            </p>

            <div className='text-gray-400 text-sm mt-3 font-light'>
              Email: {domain.email}
            </div>
            <div className='text-gray-400 text-sm mt-3 font-light'>
              Password: {domain.password}
            </div>
            <div className='text-gray-400 text-sm mt-3 font-light'>
              ID: {domain.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
