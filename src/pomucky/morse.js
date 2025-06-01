import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './morse.scss';

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
    [".-..", 'L'],
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

function Morse() {
    let[text, setText] = useState("");
    let[convertedText, setConvertedText] = useState([]);
    const [morseLetterStarts, setMorseLetterStarts] = useState([]);
    const [cursorIndex, setCursorIndex] = useState(0);
    const [letterLengths, setLetterLength] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    function morseToText(morse) {
        let letter = "";
        let decodedText = [];
        let starts = [];
        let letterStart = 0;
        let lens = [];

        for(let i = 0; i < morse.length; i++) {
            if(morse[i] != '/') {
                if(letter == "") letterStart = i;
                letter += morse[i];
            }
            else {
                if(letter != "") {
                    if(MorseMap.has(letter)) decodedText.push(MorseMap.get(letter));
                    else decodedText.push("?");
                    starts.push(letterStart);
                    lens.push(letter.length);
                }
                else {
                    decodedText.push(" ");
                    starts.push(i);
                    lens.push(1);
                }
                letter = "";
            }
        }
        if(letter != "") {
            if(MorseMap.has(letter)) decodedText.push(MorseMap.get(letter));
            else decodedText.push("?");
            starts.push(letterStart);
            lens.push(letter.length);
        }

        setConvertedText(decodedText);
        setMorseLetterStarts(starts);
        setLetterLength(lens);
    }

    function Flip() {
        let newText = "";
        for(let i = 0; i < text.length; i++) {
            if(text[i] == '.') newText += "-";
            else if(text[i] == '-') newText += ".";
            else newText += text[i];
        }
        setText(newText);
    }

    useEffect(() => {
        morseToText(text);
    }, [text]);

    function updateActive() {
        if(text[cursorIndex == '/']) {
            setActiveIndex(-1);
            return;
        }
        for(let i = 0; i < morseLetterStarts.length; i++) {
            const start = morseLetterStarts[i];
            const len = letterLengths[i];
            if(cursorIndex >= start && cursorIndex < start + len) {
                setActiveIndex(i);
                return;
            }
        }
        setActiveIndex(-1);
    }

    useEffect(() => {
        updateActive();
    }, [cursorIndex, text])


    function editSymbol(newSymbol) {
        setText(prev => {
            const newText = prev.split('');
            newText[cursorIndex] = newSymbol;
            return newText.join('');
        });
        setCursorIndex(prev => prev + 1);
    }

    const Dot = () => editSymbol('.');
    const Dash = () => editSymbol('-');
    const Space = () => editSymbol('/');
    const Back = () => {
        if(cursorIndex > 0) {
            setCursorIndex(prev => prev - 1);
        }
    };
    const Forward = () => {
        if(cursorIndex + 1 <= text.length) {
            setCursorIndex(prev => prev + 1);
        }
    }
    const Erase = () => {
        if(text.length == 0) return;
        if(cursorIndex == text.length) {
            setText(prev => {
                return prev.slice(0, cursorIndex - 1) + prev.slice(cursorIndex)
            });
            setCursorIndex(prev => prev - 1);
        }
        else {
            setText(prev => {
                return prev.slice(0, cursorIndex) + prev.slice(cursorIndex + 1)
            });
        }
    }

    function handleLetterClick(index) {
        const start = morseLetterStarts[index];
        setCursorIndex(start);
    }


    return (
        <div className="morse">
            <div className="title">
                <h1>Morse</h1>
                <button className="flip" onClick={Flip}>Flip . to -</button>
            </div>
            
            <h3>Input:</h3>
            <h3 className="text-gap"
            onClick={(e) => {
                if (e.target === e.currentTarget && text.length > 0) {
                  setCursorIndex(text.length);
                }
              }}>
                {text.split('').map((char, i) => (
                    <span
                    key={i}
                    className={cursorIndex == i ? 'symbol cursor' : 'symbol'}
                    onClick={() => setCursorIndex(i)}
                    >
                        {char}
                    </span>
                ))}
                {cursorIndex == text.length && (
                    <span
                    className="symbol cursor"
                    onClick={() => setCursorIndex(text.length > 0 ? text.length - 1 : 0)}
                    >&nbsp;</span>
                )}
            </h3>

            <h3>Converted:</h3>
            <div className="text-gap">
                {convertedText.map((letter, index) => (
                    <span
                    key={index}
                    onClick={() => handleLetterClick(index)}
                    className={activeIndex == index ? "letter active" : "letter"}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            
            <div className="controls-container">
                <div className="controls">
                    <div>
                        <button onClick={Back}>←</button>
                        <button onClick={Forward}>→</button>
                        <button onClick={Erase}>⌫</button>
                    </div>
                    <div>
                        <button onClick={Dot}>.</button>
                        <button onClick={Dash}>-</button>
                        <button onClick={Space}>/</button>
                    </div>
                </div>
            </div>
                        
            <BackButton/>
        </div>
    );
};

export default Morse;