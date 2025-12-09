import { Button } from '@/components/ui/button'
import { getSSUser } from '@/lib/supabase/server'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthPagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = await getSSUser()

    // If user is already logged in, redirect to dashboard
    if (user) {
        redirect('/dashboard?loggedIn=true')
    }

    return <div className="min-h-screen w-screen flex bg-background p-5 md:p-20">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-0 md:p-8">
            <div className="w-full max-w-md space-y-8">
                
                <Button asChild variant="ghost">
                    <Link href="/">
                        <ArrowLeftIcon className="h-6 w-6" />
                        Back to Home
                    </Link>
                </Button>

                {/* Main Content - passed as children */}
                {children}

                {/* Terms */}
                <p className="text-center text-xs text-muted-foreground">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="underline hover:text-foreground">
                        Terms & Conditions
                    </Link>
                </p>
            </div>
        </div>


        {/* Right Side - Hero Image */}
        <div className="hidden lg:relative lg:flex lg:w-1/2 items-center justify-center overflow-hidden rounded-lg max-h-[90vh]">
            <Image
                src="/images/auth-hero.jpg"
                alt="Authentication Hero"
                className="object-cover object-center w-full"
                width={500}
                height={500}
                priority
            />

            {/* <Aesthetics /> */}
        </div>
    </div>
}



// function Aesthetics() {

//     return (
//         <div className="bg-background absolute top-0 right-0 rounded-bl-lg">
//             <div className="relative">
//                 <Button asChild size="icon" variant="ghost" className="">
//                     <Link href="/">
//                         <XIcon className="h-6 w-6" />
//                     </Link>
//                 </Button>
//             </div>
//         </div>
//     )
// }