import ServerLink from "@/components/ServerLink/ServerLink";


const admin = () => {

    return (
        <div className="ml-12 mt-12">
            <div className="text-2xl">
                Admin Panel
            </div>
            <div className="mt-8 ml-4">
                <ServerLink URL="/admin/exercise_editor" text="Exercise Editor"/>
            </div>
        </div>
    )
}

export default admin;
