import { useEffect } from "react";

interface props{
    customData: string[],
    setCustomData: (data:string[]) => void
}
const CustomSettings = (props:props) => {


    const handleKeyDown = (e:KeyboardEvent) => {
        if(e.key === "Backspace"){
            props.customData.pop();
        }

    };
    useEffect(() => {


    },[]);
    return(
        <div>

        </div>
    );
};

export default CustomSettings;