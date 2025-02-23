"use client";

import { useState } from "react";
import { signout } from "../../../server-actions/login-actions/actions";
import { User } from "@supabase/supabase-js";

interface props{
  user: User|null;
  role: string;
}
const Navbar = (props:props) => {
  const [profileBoxVisible, setProfileBoxVisible] = useState(false);
  const [mobileBoxContentVisible, setMobileBoxContentVisible] = useState(false);
  

  return (
    <div>
      <nav className="bg-[#171725]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-[4.5rem] items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() =>
                  setMobileBoxContentVisible(!mobileBoxContentVisible)
                }
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <div className="flex shrink-0 items-center">
                <a href="/">
                <svg className="w-12 h-12" data-name="Vrstva 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.744 194.887"> 
                  <polygon className="fill-none" points="193.744 49.925 186.901 43.082 117.556 43.082 117.556 100.525 165.359 100.525 154.252 89.417 193.744 49.925"/>
                  <polygon className="fill-[#6dffe7]" points="183.31 118.476 165.359 100.525 117.556 100.525 117.556 43.082 186.901 43.082 165.359 21.541 149.867 21.541 128.326 21.541 117.556 21.541 96.014 21.541 96.014 43.082 96.014 173.346 117.556 194.887 117.556 118.476 183.31 118.476"/>
                  <polygon className="fill-[#47bac0]" points="96.014 43.082 96.014 21.541 117.556 21.541 128.326 21.541 149.867 21.541 165.359 21.541 143.818 0 128.326 0 24.211 0 20.621 0 0 0 21.541 21.541 24.211 21.541 74.473 21.541 74.473 151.805 96.014 173.346 96.014 43.082"/>
                </svg>
                </a>
              </div>
              <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-6">

                  <a
                    href="/"
                    // className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                    className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
                  >
                    Home
                  </a>
                  <a
                    href="/sections"
                    // className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
                  >
                    Exercises
                  </a>
                  <a
                    href="/minigames"
                    // className="block rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
                  >
                    Minigames
                  </a>
                  {props.role === "admin" && <a
                    href="/admin"
                    // className="block rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
                  >
                    Admin
                  </a>}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              <div className="relative ml-3">
                {props.user ? 
                <div className="flex items-center">
                  <div className="hidden md:ml-6 md:block">
                  <a href="/profile" ><div className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Profile</div></a>
                  </div>
                  <form>
                    <button className="text-sm ml-5 px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer" formAction={signout}>Sign out</button>
                  </form>
                </div>
                              
                              :
                <div className="flex ">
                  <a href="/login" ><div className="md:text-base text-xs px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Login</div></a>
                  <a href="/signup" ><div className="md:text-base text-xs ml-5 px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Signup</div></a>
                </div>}
              </div>
            </div>
          </div>
        </div>

        {mobileBoxContentVisible ? (
          <div className="md:hidden" id="mobile-menu">
            <div className="flex flex-col gap-6">
              <div>
              <a
                href="/"
                //   className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                // className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                className="md:text-base text-xs px-4 mb-1 py-2 ml-3 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
              >
                Home
              </a>
              </div>
              <div>
              <a
                href="/sections"
                //   className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                className="md:text-base text-xs px-4 mb-1 py-2 ml-3 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
              >
                Exercises
              </a>
              </div>
              <div>
              <a
                href="/minigames"
                className="md:text-base text-xs px-4 mb-1 py-2 ml-3 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
              >
                Minigames
              </a>
              </div>
              {props.user && 
              <div>
              <a
                href="/profile"
                className="md:text-base text-xs px-4 mb-1 py-2 ml-3 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"
              >
                Profile
              </a>
              </div>}
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
