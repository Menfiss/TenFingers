import { useEffect, useState } from "react";

interface props{
    customData: string[],
    setCustomData: (data:string[]) => void,
    setAction: (action:boolean) => void
}
const CustomSettings = (props:props) => {
    const [customData, setCustomData] = useState<string[]>(props.customData);

    const handleKeyDown = (e:KeyboardEvent) => {
        if(e.key === "Backspace" && customData.length > 0){
            setCustomData(data => data.slice(0, data.length - 1));
        }
        else if(e.key.length === 1){
            setCustomData(data => [...data, e.key]);
        }
    };

    useEffect(() => {props.setCustomData(customData)},[customData]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    },[customData]);

    return(
        <div>
            <button className="pr-3" onClick={() => setCustomData([])}>Clear</button>
            <button className="pr-3" onClick={() => props.setAction(false)}>Ok</button>
            [ {customData.length > 0 ? customData.map((letter, index) => {
                return <span key={index}>{letter +" "}</span>
            }): <span className="opacity-60"> Press any key</span>} ]
        </div>
    );
};

export default CustomSettings;