
import type { Metadata } from 'next'
import LoginPageContent from '../_components/login-page-content'

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Tourify account to access your dashboard and manage your product tours.",
}

export default function LoginPage(){
    return <LoginPageContent/>
}