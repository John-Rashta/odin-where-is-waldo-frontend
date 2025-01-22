import { useRef, useEffect } from "react"
import { SimpleFunctionType } from "../../util/types"

export default function OptionBox({stopDisplay} : {stopDisplay: SimpleFunctionType}) {
    const optionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickingOuside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
             if (!optionRef.current!.contains(target) && !target.classList.contains("optionBox")) {
                stopDisplay();
             };
        }

        document.addEventListener("mousedown", handleClickingOuside);

        return () => {
            document.removeEventListener("mousedown", handleClickingOuside);
        }
    }, []);
    
    return (
        <div className="optionBox" ref={optionRef}></div>
    )

}