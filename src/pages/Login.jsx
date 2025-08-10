import { Link } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <section className="container-x py-16">
        <div className="mx-auto max-w-md card p-8">
          <h1 className="text-2xl font-bold mb-6">Hi, Welcome back!</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm mb-1 font-medium">
                Username or Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-11 rounded-lg border border-ink-300 px-3"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-1 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-lg border border-ink-300 px-3 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4" /> Keep me signed in
            </label>

            <button type="submit" className="btn-primary h-11 w-full">
              Sign In
            </button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-brand-700 font-semibold hover:underline">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}
