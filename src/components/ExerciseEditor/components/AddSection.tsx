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
            {showForm && <form action="#" method="post">
                <input className="text-black" type="text" placeholder="Section Name" id="sectionName" name="sectionName"/>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" formAction={(e) => {AddSectionFunc(e,props.data, props.currentSectionId, props.mode); setShowForm(false)}}>Submit</button>
            </form>}
        </div>
    )
}



export default AddSection;