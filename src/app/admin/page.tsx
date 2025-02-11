import ServerLink from "@/components/ServerLink/ServerLink";


const admin = () => {

    return (
        <div className="ml-12 mt-12 flex flex-col justify-start items-start">
            <div className="text-2xl">
                Admin Panel
            </div>
            <div className="mt-8 ml-4 hover:text-blue-500 transition duration-300">
                <ServerLink URL="/admin/exercise_editor" text="Exercise Editor"/>
            </div>
        </div>
    )
}

export default admin;
