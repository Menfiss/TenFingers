"use client";
import Link from "next/link";

const Minigames = () => {


    return (
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
                <div className="bg-gray-600 h-36 flex justify-center items-center"><Link href={"minigames/unity_minigame"}>Image</Link></div>
                <div className="flex flex-col">
                    <div className="mb-8 mt-2">
                        <h2>Unity Minigame</h2>
                    </div>
                    <div className="flex justify-end items-end">
                        <Link href={"minigames/unity_minigame"}><div className="px-4 mb-1 py-2 uppercase font-mono font-semibold text-black rounded-xl shadow-[0px_8px_0px_0px_rgba(190,190,190,1),0px_7px_0px_3px_#6dffe7] bg-white duration-300 hover:translate-y-1 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_3px_0px_3px_#6dffe7] cursor-pointer">Play</div></Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Minigames;