'use server';

import { db } from '@/lib/db';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

interface Params {
    email: string;
    data: string;
}

const createKeyAction = async ({ data, email }: Params) => {
    if (!email || !data) {
        return {
            ok: false,
            message: 'Missing required fields',
        };
    }

    try {
        const newKey = await db.apiKey.create({
            data: {
                data,
                email,
            },
            select: {
                key: true,
            },
        });

        return {
            ok: true,
            message: 'Key created successfully',
            key: newKey.key,
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Failed to create key',
        };
    }
};

export default createKeyAction;
