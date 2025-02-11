"use client";

import { useState } from "react";
import { EditSectionFunc } from "../../../../server-actions/admin-actions/actions";


interface props{
    currentSectionId: string | null;
    SectionName: string | undefined;
}
const EditSection = (props:props) => {

    const [showForm, setShowForm] = useState<boolean>(false);

    return(
        <div>
            {!showForm && <button onClick={() => setShowForm(true)}>Edit Section</button>}
            {showForm && 
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-2/3 h-2/3 rounded-xl">
            <form action="#" method="post" className="flex justify-center items-center h-full">
                <div className="flex flex-col gap-4 p-4">
                    <input className="text-black pl-2" type="text" placeholder={props.SectionName} defaultValue={props.SectionName} id="sectionName" name="sectionName"/>
                    <div className="flex gap-8">
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                        <button type="submit" formAction={(e) => {EditSectionFunc(e, props.currentSectionId);setShowForm(false)}}>Submit</button>
                    </div>
                </div>
            </form></div>}
        </div>
    )
}



export default EditSection;