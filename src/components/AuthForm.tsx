'use client'
import { useState } from 'react'
import { useSignUpEmailPassword, useSignInEmailPassword, useSignOut } from '@nhost/react'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  
  const { signUpEmailPassword, isLoading: signUpLoading } = useSignUpEmailPassword()
  const { signInEmailPassword, isLoading: signInLoading } = useSignInEmailPassword()
  const { signOut } = useSignOut()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (isLogin) {
      const result = await signInEmailPassword(email, password)
      if (result.error) {
        setError(result.error.message)
      }
    } else {
      const result = await signUpEmailPassword(email, password)
      if (result.error) {
        setError(result.error.message)
      } else {
        setError('')
        alert('Account created! Please check your email to verify your account.')
      }
    }
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={signUpLoading || signInLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {(signUpLoading || signInLoading) ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
        
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          {isLogin ? 'Need to sign up?' : 'Already have an account?'}
        </button>
      </form>
      
      <div className="mt-6 pt-4 border-t">
        <button 
          onClick={handleSignOut}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}