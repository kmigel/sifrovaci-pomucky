import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const BrailleMap = new Map([
    ["000000", " "],
    ["100000", "A"],
    ["101000", "B"],
    ["110000", "C"],
    ["110100", "D"],
    ["100100", "E"],
    ["111000", "F"],
    ["111100", "G"],
    ["101100", "H"],
    ["011000", "I"],
    ["011100", "J"],
    ["100010", "K"],
    ["101010", "L"],
    ["110010", "M"],
    ["110110", "N"],
    ["100110", "O"],
    ["111010", "P"],
    ["111110", "Q"],
    ["101110", "R"],
    ["011010", "S"],
    ["011110", "T"],
    ["100011", "U"],
    ["101011", "V"],
    ["011101", "W"],
    ["110011", "X"],
    ["110111", "Y"],
    ["100111", "Z"],
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

function Braille() {
    let[letters, setLetters] = useState(["000000"]);
    let[lettersInd, setLettersInd] = useState(0);
    let[convertedText, setConvertedText] = useState("");

    const toggleDot = (ind) => {
        setLetters((p) => {
            let newLetters = [...p];
            let letter = newLetters[lettersInd].split('');
            letter[ind] = letter[ind] === '0' ? '1' : '0';
            newLetters[lettersInd] = letter.join('');
            return newLetters;
        });
    };

    const Left = () => setLettersInd((prevInd) => Math.max(0, prevInd - 1));
    const Right = () => {
        setLetters((p) => {
            let newLetters = [...p];
            if(lettersInd + 1 == newLetters.length) {
                newLetters.push("000000");
            }
            return newLetters;
        });
        
        setLettersInd((prevInd) => Math.min(prevInd + 1, letters.length));
    }

    function brailleToText(letters) {
        let decodedText = "";
        for(let ind = 0; ind < letters.length; ind++) {
            let letter = letters[ind];
            if(BrailleMap.has(letter)) decodedText += BrailleMap.get(letter);
            else decodedText += "?";
        }
        setConvertedText(decodedText);
    }

    useEffect(() => {
        brailleToText(letters);
    }, [letters]);


    return (
        <div class="braille">
            <h1>Braille</h1>
            
            <h3>Input:</h3>
            <button className={letters[lettersInd][0] === '1' ? "clicked" : ""} onClick={() => toggleDot(0)}>1</button>
            <button className={letters[lettersInd][1] === '1' ? "clicked" : ""} onClick={() => toggleDot(1)}>2</button>
            <br/>
            <button className={letters[lettersInd][2] === '1' ? "clicked" : ""} onClick={() => toggleDot(2)}>3</button>
            <button className={letters[lettersInd][3] === '1' ? "clicked" : ""} onClick={() => toggleDot(3)}>4</button>
            <br/>
            <button className={letters[lettersInd][4] === '1' ? "clicked" : ""} onClick={() => toggleDot(4)}>5</button>
            <button className={letters[lettersInd][5] === '1' ? "clicked" : ""} onClick={() => toggleDot(5)}>6</button>
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

export default Braille;