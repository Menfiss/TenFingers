"use client"
import { useState } from "react"
import { signup } from "../../../server-actions/login-actions/actions";

const SignupPage = () => {
    const [errorMessage,setErrorMessage] = useState<string>("")

    return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4.5rem)]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
            <form action="#" method="POST" className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="••••••••" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div className="text-red-600">{errorMessage}</div>
                <button type="submit" formAction={async(e)=> {setErrorMessage(await signup(e))}} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">Sign Up</button>

                <p className="text-sm text-gray-600 text-center">Already have an account?<a href="#" className="text-blue-500 hover:underline">Log in</a></p>
            </form>
        </div>
    </div>
    );
}

export default SignupPage;

// async(e)=> {setErrorMessage(await signup(e))}