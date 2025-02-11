"use client";

import { useState } from "react";
import { AddTypeFunc } from "../../../../server-actions/admin-actions/actions";

interface props{
    plholder: string;
    typeName: string;
    btnName: string;

}

const AddType = (props:props) => {
    const [showForm, setShowForm] = useState<boolean>(false);

    return(
        <div>
            {!showForm && <button onClick={() => setShowForm(true)}>{props.btnName}</button>}
            {showForm && <form action="#" method="post" >
                <input className="text-black pl-2" type="text" placeholder={props.plholder} id="typeValue" name="typeValue"/>
                <button className="px-2" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" formAction={(e) => {AddTypeFunc(e,props.typeName); setShowForm(false)}}>Submit</button>
            </form>}
        </div>
    )
}

export default AddType;