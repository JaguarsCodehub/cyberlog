'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

const verifyKeyAction = async (key: string) => {
    const session = await auth();
    const userEmail = session?.user?.email?.toLowerCase();

    if (!userEmail) return { ok: false, message: 'No user logged in' };

    const keyDetails = await db.apiKey.findFirst({
        where: { key },
    });

    if (!keyDetails) return { ok: false, message: 'You have entered an invalid key. Please try again.' };

    if (keyDetails.used) {
        return { ok: false, message: 'This key has already been used. Please try again with a different key.' };
    }

    if (keyDetails.email !== userEmail) {
        return {
            ok: false,
            message: 'You are not authorized to use this key. Please log in with the correct account to use this key.',
        };
    }

    await db.apiKey.update({
        where: { id: keyDetails.id },
        data: {
            used: true,
            usedAt: new Date(),
        },
    });

    return { ok: true, message: 'Key verified successfully.', keyDetails };
};

export default verifyKeyAction;
