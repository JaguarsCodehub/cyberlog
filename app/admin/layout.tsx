import { auth, signIn } from '@/auth';
import AccessDeniedPage from '@/components/access-denied';
import adminEmails from '@/data/admin-emails';
import AdminLayout from '@/layout/admin-layout';

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if (!session?.user?.email) return signIn();
    const { email, name, image } = session?.user;

    if (!adminEmails.includes(email)) return <AccessDeniedPage />;

    const username = name || email?.split('@')[0];

    return (
        <AdminLayout userAvatar={image} userName={username}>
            {children}
        </AdminLayout>
    );
};

export default layout;
