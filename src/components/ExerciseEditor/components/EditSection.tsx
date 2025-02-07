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
            {showForm && <form action="#" method="post">
                <input className="text-black" type="text" placeholder={props.SectionName} id="sectionName" name="sectionName"/>
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" formAction={(e) => EditSectionFunc(e, props.currentSectionId)}>Submit</button>
            </form>}
        </div>
    )
}



export default EditSection;