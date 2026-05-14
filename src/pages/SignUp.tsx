import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#060a10] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex justify-center mb-10 opacity-80 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1317 256" width="120" height="24" className="text-white">
              <path fill="currentColor" d="M120.758 42.79c0-24.454 0-36.682-7.967-41.267-7.965-4.587-18.588 1.527-39.831 13.754L57.603 24.117c-21.244 12.228-31.866 18.342-31.866 27.512s10.622 15.284 31.866 27.512l15.357 8.841c21.244 12.228 31.867 18.343 39.834 13.756 7.965-4.585 7.965-16.813 7.965-41.267v-17.68zM50.36 91.648C29.115 79.42 18.493 73.306 10.525 77.892 2.56 82.478 2.56 94.705 2.56 119.16v17.68c0 24.455 0 36.682 7.967 41.268 7.966 4.585 18.589-1.527 39.832-13.756l15.358-8.84c21.244-12.228 31.866-18.343 31.866-27.512 0-9.171-10.622-15.284-31.866-27.512L50.359 91.648zM57.601 176.858c-21.244 12.227-31.866 18.341-31.866 27.512 0 9.17 10.622 15.284 31.866 27.512l15.359 8.84c21.244 12.226 31.867 18.341 39.834 13.756 7.965-4.586 7.965-16.814 7.965-41.268v-17.68c0-24.455 0-36.683-7.967-41.268-7.965-4.585-18.588 1.527-39.832 13.756l-15.359 8.84z" />
              <path fill="currentColor" d="M357.28 219L430.667 46.2H464.587L537.547 219H504.267L485.28 173.773H408.693L389.493 219H357.28ZM418.933 146.467H476.107L448.16 79.48H447.093L418.933 146.467ZM589.438 219C579.539 219 571.603 216.44 565.63 211.32C559.657 206.2 556.67 198.008 556.67 186.744V37.24H589.438V183.416C589.438 186.829 590.291 189.389 591.998 191.096C593.875 192.803 596.435 193.656 599.678 193.656H609.662V219H589.438Z" />
            </svg>
          </Link>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
            <h1 className="font-serif text-white text-2xl mb-1 tracking-tight">Create account</h1>
            <p className="text-white/40 text-sm mb-7">Get full access to Base chain intelligence and launch analytics.</p>

            <div className="space-y-3 mb-6">
              <a href="https://clanker.world" target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-base-blue/30 bg-base-blue/10 text-white text-sm font-medium hover:bg-base-blue/20 transition-colors">
                <div className="w-5 h-5 rounded-full bg-base-blue flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
                Continue with Base Wallet
              </a>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/[0.1] text-white/70 text-sm font-medium hover:text-white hover:border-white/20 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                Continue with Farcaster
              </button>
            </div>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.07]" /></div>
              <div className="relative flex justify-center"><span className="px-3 bg-[#0d1117] text-white/30 text-xs font-mono">or</span></div>
            </div>

            <div className="space-y-3">
              <input type="text" placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-base-blue/50 transition-colors" />
              <input type="email" placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-base-blue/50 transition-colors" />
              <input type="password" placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-base-blue/50 transition-colors" />
              <button className="w-full py-3 rounded-xl bg-white text-[#060a10] text-sm font-medium hover:bg-white/90 transition-colors">
                Create account
              </button>
            </div>

            <p className="text-white/25 text-xs text-center mt-4 leading-relaxed">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <p className="text-center text-white/30 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-white/60 hover:text-white transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
