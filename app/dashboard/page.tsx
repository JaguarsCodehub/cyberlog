'use client';

import { useState } from 'react';

import ApiInput from './ApiInput';
import verifyKeyAction from '@/actions/verifyKeyAction';
import toast from 'react-hot-toast';
import { ApiKey } from '@prisma/client';

export default function Component() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiDetails, setApiDetails] = useState<ApiKey | null>(null)
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const key = formData.get('key') as string;

        const response = await verifyKeyAction(key?.trim());

        if (!response.ok) toast.error(response.message);

        setIsLoading(false);
    };
    return (
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center p-4">
            <ApiInput isLoading={isLoading} handleSubmit={handleSubmit} />
        </div>
    );
}
