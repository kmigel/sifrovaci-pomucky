import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const SemaforMap = new Map([
    ["12", "A"],
    ["13", "B"],
    ["14", "C"],
    ["15", "D"],
    ["16", "E"],
    ["17", "F"],
    ["18", "G"],
    ["23", "H"],
    ["24", "I"],
    ["57", "J"],
    ["25", "K"],
    ["26", "L"],
    ["27", "M"],
    ["28", "N"],
    ["34", "O"],
    ["35", "P"],
    ["36", "Q"],
    ["37", "R"],
    ["38", "S"],
    ["45", "T"],
    ["46", "U"],
    ["58", "V"],
    ["67", "W"],
    ["68", "X"],
    ["47", "Y"],
    ["78", "Z"],
]);

function BackButton() {
    const navigate = useNavigate();
    
    function handleClick() {
        return navigate("/");
    }
    return(
        <button class="back-button" onClick={handleClick}>Back to Menu</button>
    )
};

function Semafor() {
    let[letters, setLetters] = useState([[]]);
    let[lettersInd, setLettersInd] = useState(0);
    let[convertedText, setConvertedText] = useState("");

    const toggleCircle = (ind) => {
        setLetters((p) => {
            let newLetters = [...p];
            let letter = newLetters[lettersInd];
            if(letter.includes(ind)) letter = letter.filter(item => item !== ind)
            else letter.push(ind);
            newLetters[lettersInd] = letter;
            return newLetters;
        });
    };

    const Left = () => setLettersInd((prevInd) => Math.max(0, prevInd - 1));
    const Right = () => {
        setLetters((p) => {
            let newLetters = [...p];
            if(lettersInd + 1 == newLetters.length) {
                newLetters.push([]);
            }
            return newLetters;
        });
        
        setLettersInd((prevInd) => Math.min(prevInd + 1, letters.length));
    }

    function semaforToText(letters) {
        let decodedText = "";
        for(let ind = 0; ind < letters.length; ind++) {
            let letter = letters[ind];
            letter.sort();
            if(letter.length === 0) decodedText += " ";
            else if(letter.length != 2) decodedText += "?"
            else {
                let p = String(letter[0]) + String(letter[1]);
                if(SemaforMap.has(p)) decodedText += SemaforMap.get(p);
                else decodedText += "?";
            }
        }
        setConvertedText(decodedText);
    }

    useEffect(() => {
        semaforToText(letters);
    }, [letters]);


    return (
        <div class="semafor">
            <h1>Semafor:</h1>
            
            <h3>Input:</h3>

            <div className="button-container">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                        key={num}
                        className={letters[lettersInd]?.includes(num) ? "clicked" : ""}
                        onClick={() => toggleCircle(num)}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <br/>
            <br/>

            <button onClick={Left}>Left</button>
            <button onClick={Right}>Right</button>

            
            <h3>Converted:</h3>
            <h3 class="text-gap">{convertedText}</h3>
            
            <br/>
            <BackButton/>
        </div>
    );
};

export default Semafor;