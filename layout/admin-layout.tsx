'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2, LogOut, MenuIcon, SettingsIcon, UsersIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const links = [
    {
        icon: SettingsIcon,
        name: 'Manage API Keys',
        href: '/admin/manage-keys',
    },
    {
        icon: UsersIcon,
        name: 'Users',
        href: '/admin/users',
    },
    {
        icon: Link2,
        name: 'Domains',
        href: '/admin/domains',
    },
];

export default function AdminLayout({
    children,
    userAvatar,
    userName,
}: {
    children: React.ReactNode;
    userAvatar: any;
    userName: any;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <div className="flex h-screen ">
            <aside
                className={`bg-card w-64 min-h-screen border-r flex flex-col transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0`}
            >
                <div className="flex items-center justify-between h-14 px-4 border-b">
                    <img src="/logo.png" alt="Company Logo" className="h-[5.5rem] w-auto mx-auto" />
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <MenuIcon className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Button variant="secondary" className="w-full justify-start" asChild>
                                    <Link href={link.href}>
                                        <link.icon className="mr-2 h-4 w-4" />
                                        {link.name}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-card border-b h-14 flex items-center justify-between px-4">
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <MenuIcon className="h-6 w-6" />
                    </Button>
                    <div className="ml-auto flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Avatar className="size-8">
                                        <AvatarImage src={userAvatar} alt={userName} />
                                        <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">{children}</main>
            </div>
        </div>
    );
}
