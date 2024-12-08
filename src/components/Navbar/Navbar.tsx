"use client";

import { useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { signout } from "../../../server-actions/login-actions/actions";

const Navbar = () => {
  const [profileBoxVisible, setProfileBoxVisible] = useState(false);
  const [mobileBoxContentVisible, setMobileBoxContentVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const isSignedInVerification = async () => {
    const supabase = createClient();
    let user = await supabase.auth.getUser();
    
    if (user.data.user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }
  isSignedInVerification();

  return (
    <div>
      <nav className="bg-[#171725]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-[4.5rem] items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <a href="/">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Logo"
                />
                </a>
              </div>
              <div className="hidden sm:ml-6 sm:block">
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
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="size-6"
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
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button> */}

              <div className="relative ml-3">
                {isSignedIn ? <form>
                                <button className="ml-5 px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer" formAction={signout}>Sign out</button>
                              </form>:
                <div className="flex ">
                  <a href="/login" ><div className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Login</div></a>
                  <a href="/signup" ><div className="ml-5 px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Signup</div></a>
                </div>}
                {/* <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileBoxVisible(!profileBoxVisible)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <svg className="h-8 w-8 text-[#6dffe7]"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </button>
                </div>
                {profileBoxVisible ? (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                ) : null} */}
              </div>
            </div>
          </div>
        </div>

        {mobileBoxContentVisible ? (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="/"
                //   className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                // className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                className="px-4 mb-1 py-2 ml-3 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer"

              >
                Home
              </a>
              <a
                href="/sections"
                //   className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Exercises
              </a>
              <a
                href="/minigames"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Minigames
              </a>
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
