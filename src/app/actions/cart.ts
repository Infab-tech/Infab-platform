'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';

export async function saveCartDraft(items: any[]) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return { success: false };

        await prisma.cartDraft.upsert({
            where: { userId: user.id },
            update: { items: items },
            create: { userId: user.id, items: items }
        });

        return { success: true };
    } catch (e) {
        console.error('Failed to save cart draft:', e);
        return { success: false };
    }
}

export async function loadCartDraft() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return { success: false, items: [] };

        const draft = await prisma.cartDraft.findUnique({
            where: { userId: user.id }
        });

        return { success: true, items: draft ? draft.items : [] };
    } catch (e) {
        console.error('Failed to load cart draft:', e);
        return { success: false, items: [] };
    }
}
