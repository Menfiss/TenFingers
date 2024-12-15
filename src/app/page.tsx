import Link from "next/link";

export default function Home() {
  
  //have you ever wondered how some people type so fast? No?
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center flex-col h-[calc(100vh-4.5rem)] font-mono">
        <div className="text-7xl mb-6 text-[#47bac0] text-center">Type with ten fingers</div>
        <div className="text-3xl mb-24 text-[#47bac0] text-center">
          Type faster, more consistently and improve your workflow 🚀
        </div>
        <div className="flex flex-row">
          
            <Link href="/minigames"><div className="mx-6 px-12 py-6 uppercase font-mono font-semibold text-lg text-black rounded-2xl shadow-[0px_12px_0px_0px_rgba(190,190,190,1),0px_11.5px_0px_3.5px_#6dffe7] bg-white duration-300 hover:translate-y-2 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3.5px_0px_3.5px_#6dffe7] cursor-pointer">MInigames</div></Link>
                   
            <Link href="/sections"><div className="mx-6 px-12 py-6 uppercase font-mono font-semibold text-lg text-black rounded-2xl shadow-[0px_12px_0px_0px_rgba(190,190,190,1),0px_11.5px_0px_3.5px_#6dffe7] bg-white duration-300 hover:translate-y-2 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3.5px_0px_3.5px_#6dffe7] cursor-pointer">Exercises</div></Link>
          
        </div>
      </div>
      <div className="flex flex-row justify-between mb-40">
        <div>
          <h1 className="text-4xl font-bold pb-3">Are you new to this skill?</h1> 
          <h1 className="text-4xl font-bold pb-3 mb-3">Start with the exercises!</h1>
          <p className="text-xl pb-3">They are designed to take you from the first letter</p>
          <p className="text-xl pb-3"> to typing full sentences in no time.</p>
        </div>
        <div className=" m-20 text-center">
          second thing
        </div>
      </div>

    <hr className="mb-40 border-[#2c2c2e]"></hr>

      <div className="flex flex-row justify-between mb-40">
        <div>
          <h1 className="text-4xl font-bold pb-3">Scared of finishing all the exercises?</h1>
          <h1 className="text-4xl font-bold pb-3 mb-3">Practice with the minigames.</h1>
          <p className="text-xl pb-3">Minigames range from typing random text</p>
          <p className="text-xl pb-3">to slaying different shapes with your typing skills. 🤯</p>
        </div>
        <div className="mr-20">
          <svg className="w-[150px] h-[150px] fill-[#ffffff]" viewBox="0 0 640 512">
            <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"></path>
          </svg>
        </div>
      </div>

      <hr className="mb-40 border-[#2c2c2e]"></hr>

      <div className="text-center mb-40">
        <h1 className="text-4xl font-bold pb-3 mb-20">Take your productivity to the next level</h1>

        <ul className="flex flex-row justify-around">
          <li className="mb-40">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-[50px] h-[50px] fill-[#ebbbbb] mb-3" viewBox="0 0 512 512">
                <path d="M184 0c30.9 0 56 25.1 56 56V456c0 30.9-25.1 56-56 56c-28.9 0-52.7-21.9-55.7-50.1c-5.2 1.4-10.7 2.1-16.3 2.1c-35.3 0-64-28.7-64-64c0-7.4 1.3-14.6 3.6-21.2C21.4 367.4 0 338.2 0 304c0-31.9 18.7-59.5 45.8-72.3C37.1 220.8 32 207 32 192c0-30.7 21.6-56.3 50.4-62.6C80.8 123.9 80 118 80 112c0-29.9 20.6-55.1 48.3-62.1C131.3 21.9 155.1 0 184 0zM328 0c28.9 0 52.6 21.9 55.7 49.9c27.8 7 48.3 32.1 48.3 62.1c0 6-.8 11.9-2.4 17.4c28.8 6.2 50.4 31.9 50.4 62.6c0 15-5.1 28.8-13.8 39.7C493.3 244.5 512 272.1 512 304c0 34.2-21.4 63.4-51.6 74.8c2.3 6.6 3.6 13.8 3.6 21.2c0 35.3-28.7 64-64 64c-5.6 0-11.1-.7-16.3-2.1c-3 28.2-26.8 50.1-55.7 50.1c-30.9 0-56-25.1-56-56V56c0-30.9 25.1-56 56-56z"></path>
              </svg>
            </div>
            <div className="text-xl pb-3 min-w-52">Increase concentration</div>
          </li>
          <li className="mb-40">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-[50px] h-[50px] fill-[#ffffff] mb-3" viewBox="0 0 512 512">
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
              </svg>
            </div>
            <div className="text-xl pb-3 min-w-52">Save time</div>
          </li>
          <li className="mb-40">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-[50px] h-[50px] fill-[#e7e24a] mb-3" viewBox="0 0 512 512">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM96.8 314.1c-3.8-13.7 7.4-26.1 21.6-26.1H393.6c14.2 0 25.5 12.4 21.6 26.1C396.2 382 332.1 432 256 432s-140.2-50-159.2-117.9zM217.6 212.8l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z"></path>
              </svg>
            </div>
            <div className="text-xl pb-3 min-w-52">Have fun</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
