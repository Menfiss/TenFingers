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
            <form action="#" method="post">
                <input className="text-black" type="text" placeholder={props.SectionName} defaultValue={props.SectionName} id="sectionName" name="sectionName"/>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" formAction={(e) => {EditSectionFunc(e, props.currentSectionId);setShowForm(false)}}>Submit</button>
            </form></div>}
        </div>
    )
}



export default EditSection;