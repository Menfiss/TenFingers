import Link from "next/link";

export default function Home() {
  
  return (
    <div>
      <div className="flex justify-center items-center flex-col h-[calc(100vh-4.5rem)] font-mono">
        <div className="text-7xl mb-6">Type with ten fingers</div>
        <div className="text-3xl mb-24">
          Type faster, more consistently and improve your workflow 🚀
        </div>
        <div className="flex flex-row">
          
            <Link href="/minigames"><div className="mx-6 px-12 py-6 uppercase font-mono font-semibold text-lg text-black rounded-2xl shadow-[0px_12px_0px_0px_rgba(190,190,190,1),0px_12px_0px_4px_rgba(255,32,78,1)] bg-white duration-300 hover:translate-y-2 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_4px_0px_4px_rgba(255,32,78,1)] cursor-pointer">MInigames</div></Link>
                   
            <Link href="/sections"><div className="mx-6 px-12 py-6 uppercase font-mono font-semibold text-lg text-black rounded-2xl shadow-[0px_12px_0px_0px_rgba(190,190,190,1),0px_12px_0px_4px_rgba(255,32,78,1)] bg-white duration-300 hover:translate-y-2 hover:shadow-[0px_4px_0px_0px_rgba(190,190,190,1),0px_4px_0px_4px_rgba(255,32,78,1)] cursor-pointer">Exercises</div></Link>
          
        </div>
      </div>
    </div>
  );
}
