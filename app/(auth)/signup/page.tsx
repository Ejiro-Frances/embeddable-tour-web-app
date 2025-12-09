
import type { Metadata } from 'next'
import SignupPageContent from '../_components/signup-page-content'

export const metadata: Metadata = {
  title: "Signup",
  description: "Create an account to get started with your onboarding tours",
}

export default function SignupPage(){
    return <SignupPageContent/>
}