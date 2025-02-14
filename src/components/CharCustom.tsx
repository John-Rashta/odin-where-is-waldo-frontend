import { Character } from "../../util/interfaces"
import styled from "styled-components";
import { imageSize } from "../../util/style";

export default function CharCustom({char, extraClass, namePresent} : {char: Character, extraClass?: string, namePresent?: boolean}) {
     return (
          <StyledCustomChar className="char">
               <StyledImgDiv $foundChar={char.found} className={`${typeof extraClass === "string" && extraClass}`} data-id={char.id} key={char.id}>
                    <StyledImg src={char.imageUrl} alt={char.name} />
               </StyledImgDiv>
               {namePresent ? <div>{char.name} </div> : null }
          </StyledCustomChar>
     );
};

const StyledCustomChar = styled.div<{$foundChar?: boolean;}>`
     text-align: center;
`;

const StyledImgDiv = styled.div<{$foundChar?: boolean;}>`
     ${imageSize}
     position: relative;
     &.charOption {
          border: none;
          padding: 5px;
          background-color: gray;
          &:hover {
               background-color: blue;
          }
     };
     border: solid 1px black;
     ${props => props.$foundChar ? `&::after {
          z-index: 5;
          position: absolute;
          background: no-repeat center/100% url("../../x.svg");
          height: 100%;
          width: 100%;
          content: "";
          bottom: 0;
          left: 0;
          top: 0;

     }` : null }

`

const StyledImg = styled.img`
     ${imageSize}
`;