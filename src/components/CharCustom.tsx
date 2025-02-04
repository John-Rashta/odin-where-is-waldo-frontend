import { Character } from "../../util/interfaces"

export default function CharCustom({char, extraClass} : {char: Character, extraClass?: string}) {
     return (
          <div className={`char ${typeof extraClass === "string" && extraClass}`} data-id={char.id} key={char.id}>
               <img src={char.imageUrl} alt={char.name} />
               <div>{char.name} </div>
          </div>
     );
};