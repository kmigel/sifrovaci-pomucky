import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const MorseMap = new Map([
    [".-", 'A'],
    ["-...", 'B'],
    ["-.-.", 'C'],
    ["-..", 'D'],
    [".", 'E'],
    ["..-.", 'F'],
    ["--.", 'G'],
    ["....", 'H'],
    ["..", 'I'],
    [".---", 'J'],
    ["-.-", 'K'],
    [".-...", 'L'],
    ["--", 'M'],
    ["-.", 'N'],
    ["---", 'O'],
    [".--.", 'P'],
    ["--.-", 'Q'],
    [".-.", 'R'],
    ["...", 'S'],
    ["-", 'T'],
    ["..-", 'U'],
    ["...-", 'V'],
    [".--", 'W'],
    ["-..-", 'X'],
    ["-.--", 'Y'],
    ["--..", 'Z'],
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

function Morseovka() {
    let[text, setText] = useState("");
    let[convertedText, setConvertedText] = useState("");

    const Dot = () => setText((p) => p + ".");
    const Dash = () => setText((p) => p + "-");
    const Space = () => setText((p) => p + "/");
    const Back = () => setText((p) => p.substring(0, p.length - 1));

    function morseToText(morse) {
        let letter = "";
        let decodedText = "";

        for(let i = 0; i < morse.length; i++) {
            if(morse[i] != '/') {
                letter += morse[i];
                continue;
            }
            else {
                if(MorseMap.has(letter)) {
                    decodedText += MorseMap.get(letter);
                    letter = "";
                }
                else if(letter == "") decodedText += " ";
                else {
                    decodedText += "?";
                    letter = "";
                }
            }
        }
        if(letter != "") {
            if(MorseMap.has(letter)) decodedText += MorseMap.get(letter);
            else decodedText += "?";
        }

        setConvertedText(decodedText);
    }

    useEffect(() => {
        morseToText(text);
    }, [text]);


    return (
        <div class="morseovka">
            <h1>Morseovka</h1>
            
            <h3>Input:</h3>
            <h3 class="text-gap">{text}</h3>
            <button onClick={Dot}>.</button>
            <button onClick={Dash}>-</button>
            <button onClick={Space}>/</button>
            <button onClick={Back}>X</button>
            
            <h3>Converted:</h3>
            <h3 class="text-gap">{convertedText}</h3>
            
            <br/>
            <BackButton/>
        </div>
    );
};

export default Morseovka;