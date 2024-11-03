import { db } from '@/lib/db';
import UserTable from './user-table';

const page = async () => {
    const users = await db.user.findMany({
        take: 200,
    });

    return <UserTable users={users} />;
};

export default page;
