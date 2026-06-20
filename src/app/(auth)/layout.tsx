import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/supabase/prisma';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // If user is already logged in, prevent them from seeing auth pages
    if (user && user.email) {
        const userRole = await prisma.userRole.findUnique({
            where: { email: user.email.toLowerCase() }
        });

        if (userRole && userRole.role === 'ADMIN') {
            redirect('/admin');
        } else {
            redirect('/dashboard');
        }
    }

    return <>{children}</>;
}
