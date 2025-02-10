"use client";

import { useState } from "react";
import { AddSectionFunc } from "../../../../server-actions/admin-actions/actions";


interface props{
    data: Section;
    currentSectionId: string | null;
    btnText: string;
    mode: string | null;
}
const AddSection = (props:props) => {

    const [showForm, setShowForm] = useState<boolean>(false);

    return(
        <div>
            {!showForm && <button onClick={() => setShowForm(true)}>{props.btnText}</button>}
            {showForm && 
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-2/3 h-2/3 rounded-xl">
            <form action="#" method="post">
                <input className="text-black" type="text" placeholder="Section Name" id="sectionName" name="sectionName"/>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" formAction={(e) => {AddSectionFunc(e,props.data, props.currentSectionId, props.mode); setShowForm(false)}}>Submit</button>
            </form></div>}
        </div>
    )
}



export default AddSection;