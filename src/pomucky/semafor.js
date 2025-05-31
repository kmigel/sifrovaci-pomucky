import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './semafor.scss';

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
        <button className="back-button" onClick={handleClick}>Back to Menu</button>
    )
};

function Semafor() {
    let[letters, setLetters] = useState([[]]);
    let[cursorInd, setCursorInd] = useState(0);
    let[text, setText] = useState([[]]);

    const toggleCircle = (ind) => {
        setLetters((p) => {
            let newLetters = [...p];
            let letter = newLetters[cursorInd];
            if(letter.includes(ind)) letter = letter.filter(item => item !== ind)
            else if(letter.length == 2) {
                let newLetter = [letter[1], ind];
                letter = newLetter;
            }
            else letter.push(ind);
            newLetters[cursorInd] = letter;
            return newLetters;
        });
    };

    const Back = () => setCursorInd((prevInd) => Math.max(0, prevInd - 1));
    const Forward = () => {
        setLetters((p) => {
            let newLetters = [...p];
            if(cursorInd + 1 == newLetters.length) {
                newLetters.push([]);
            }
            setCursorInd(cursorInd + 1);
            return newLetters;
        });
    };
    const Erase = () => {
        if(letters.length == 0) return;
        if(letters.length == 1) {
            setLetters([[]]);
        }
        else if(letters.length == cursorInd + 1) {
            setLetters(prev => {
                return prev.slice(0, cursorInd);
            });
            setCursorInd(prev => prev - 1);
        }
        else {
            setLetters(prev => {
                return prev.slice(0, cursorInd).concat(prev.slice(cursorInd + 1));
            });
        }
    };

    function semaforToText() {
        let decodedText = [];
        for(let ind = 0; ind < letters.length; ind++) {
            const original = letters[ind];
            const letter = [...original].sort();

            if(letter.length === 0) decodedText.push(" ");
            else if(letter.length != 2) decodedText.push("?");
            else {
                let p = String(letter[0]) + String(letter[1]);
                if(SemaforMap.has(p)) decodedText.push(SemaforMap.get(p));
                else decodedText.push("?");
            }
        }
        setText(decodedText);
        console.log(letters)
        if(letters[letters.length - 1].length == 2) Forward();
    }

    useEffect(() => {
        semaforToText();
    }, [letters]);
    console.log(letters)

    function emptyCharacter() {
        if(letters.length > 1 && letters[letters.length - 1].length != 0) {
            setLetters(prev => prev.concat([[]]));
        }
    }
    useEffect(() => {
        emptyCharacter();
    }, [cursorInd]);

    function handleClick(index) {
        setCursorInd(index);
    }

    return (
        <div className="semafor">
            <h1>Semafor</h1>
            
            <h3>Converted:</h3>
            <h3 className="text-gap"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setCursorInd(letters.length - 1);
                }
              }}>
                {text.map((letter, index) => (
                    <span
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(index)
                        }}
                        className={index == cursorInd ? "letter cursor" : "letter"}
                    >
                    {letter == ' ' ? '\u00A0' : letter}
                    </span>
                ))}
            </h3>

            <div className='buttons-container'>
                <div className='buttons'>
                    <div className='controls'>
                        <button className='control' onClick={Erase}>⌫</button>
                        <button className='control' onClick={Back}>←</button>
                        <button className='control' onClick={Forward}>→</button>
                    </div>
                    <div className="dot-container">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <button
                                key={num}
                                className={letters[cursorInd]?.includes(num) ? "dot-button active" : "dot-button"}
                                onClick={() => toggleCircle(num)}
                            >
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <br/>
            <BackButton/>
        </div>
    );
};

export default Semafor;