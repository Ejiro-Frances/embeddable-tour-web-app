
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { AuthCard } from './auth-card'
import { FocusPointerWrapper } from '@/components/ui/focus-pointer-wrapper'

export default function LoginPageContent() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      if (data.user) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Log in to your account"
      subtitle="Enter your credentials to continue"
    >
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <FocusPointerWrapper>
            <Input
              autoFocus
              id="email"
              type="email"
              placeholder="username@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-11"
            />
          </FocusPointerWrapper>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <FocusPointerWrapper>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="h-11"
            />
            <button type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {
                showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" />
                )
              }
            </button>
          </FocusPointerWrapper>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-amber-400 hover:bg-amber-500 text-black font-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          Don't have an account?{' '}
        </span>
        <Link
          href="/signup"
          className="font-medium text-amber-600 hover:text-amber-700"
        >
          Sign up
        </Link>
      </div>
    </AuthCard>
  )
}