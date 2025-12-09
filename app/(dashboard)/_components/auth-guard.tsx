import { getSSUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user } = await getSSUser();

    if (!user) {
        redirect('/login')
    }

    return <>{children}</>
}
