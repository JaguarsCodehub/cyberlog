import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyTable } from './api-key-table';
import { db } from '@/lib/db';
import Link from 'next/link';

export default async function Page() {
    const apiKeys = await db.apiKey.findMany({
        take: 50,
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">API Key Management</h1>
            <div className="flex justify-between items-center mb-6">
                <Button asChild>
                    <Link href={'/admin/manage-keys/new'}>Generate New API Key</Link>
                </Button>
                <Input type="search" placeholder="Search keys or users..." className="max-w-xs" />
            </div>
            <ApiKeyTable apiKeys={apiKeys} />
        </div>
    );
}
