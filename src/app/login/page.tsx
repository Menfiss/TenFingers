
import { login } from "../../../server-actions/login-actions/actions"

export default function LoginPage() {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4.5rem)]">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
                <form method="POST" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="you@example.com" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>

                    <button type="submit" formAction={login} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">Log In</button>

                    <p className="text-sm text-gray-600 text-center">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
                </form>
            </div>
        </div>
    )
  }


  
      