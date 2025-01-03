"use client";
import Link from "next/link";

const Minigames = () => {


    return (
        <div>
            <div className="py-10 my-20 ">
                <div className="flex justify-center items-center">
                    <h1 className="text-5xl font-bold text-center pb-3 pr-3">Minigames</h1>
                    <svg className="w-[50px] h-[50px] fill-[#ffffff]" viewBox="0 0 640 512">
                        <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-center">Practice what you have already learned!</h2>
            </div>
            <div className="mt-16 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
                <div>
                    <div className="bg-gray-600 h-36 flex justify-center items-center"><Link href={"minigames/drop_tiles"}>Image</Link></div>
                    <div className="flex flex-col">
                        <div className="mb-8 mt-2">
                            <h2>Drop Tiles</h2>
                        </div>
                        <div className="flex justify-end items-end">
                            <Link href={"minigames/drop_tiles"}><div className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Play</div></Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gray-600 h-36 flex justify-center items-center"><Link href={"minigames/sandbox"}>Image</Link></div>
                    <div className="flex flex-col">
                        <div className="mb-8 mt-2">
                            <h2>Sandbox</h2>
                        </div>
                        <div className="flex justify-end items-end">
                            <Link href={"minigames/sandbox"}><div className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Play</div></Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gray-600 h-36 flex justify-center items-center"><Link href={"minigames/quotes"}>Image</Link></div>
                    <div className="flex flex-col">
                        <div className="mb-8 mt-2">
                            <h2>Quotes</h2>
                        </div>
                        <div className="flex justify-end items-end">
                            <Link href={"minigames/quotes"}><div className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Play</div></Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gray-600 h-36 flex justify-center items-center"><Link href={"minigames/shape_strike"}>Image</Link></div>
                    <div className="flex flex-col">
                        <div className="mb-8 mt-2">
                            <h2>Shape Strike</h2>
                        </div>
                        <div className="flex justify-end items-end">
                            <Link href={"minigames/shape_strike"}><div className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Play</div></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Minigames;