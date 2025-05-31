import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './braille.scss';

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
        <button className="back-button" onClick={handleClick}>Back to Menu</button>
    )
};

function Braille() {
    let[letters, setLetters] = useState(["000000"]);
    let[cursorInd, setCursorInd] = useState(0);
    let[text, setText] = useState([]);

    const toggleDot = (ind) => {
        setLetters((p) => {
            let newLetters = [...p];
            let letter = newLetters[cursorInd].split('');
            letter[ind] = letter[ind] === '0' ? '1' : '0';
            newLetters[cursorInd] = letter.join('');
            return newLetters;
        });
    };

    const Back = () => setCursorInd((prevInd) => Math.max(0, prevInd - 1));
    const Forward = () => {
        setLetters((p) => {
            let newLetters = [...p];
            if(cursorInd + 1 == newLetters.length) {
                newLetters.push("000000");
            }
            setCursorInd((prevInd) => Math.min(prevInd + 1, newLetters.length - 1));
            return newLetters;
        });        
    }
    const Erase = () => {
        if(letters[cursorInd] == "000000" && cursorInd > 0) {
            setLetters(prev => {
                setCursorInd(prev => prev - 1);
                return prev.slice(0, cursorInd - 1).concat(["000000"]);
            });
            return;
        }

        if(letters.length == 0) return;
        if(letters.length == 1) {
            setLetters(["000000"]);
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
    }

    function brailleToText(letters) {
        let decodedText = [];
        for(let ind = 0; ind < letters.length; ind++) {
            let letter = letters[ind];
            if(BrailleMap.has(letter)) decodedText.push(BrailleMap.get(letter));
            else decodedText.push("?");
        }
        setText(decodedText);
    }

    useEffect(() => {
        brailleToText(letters);
    }, [letters]);

    function emptyCharacter() {
        if(letters.length == 1 || letters[letters.length - 1] != "000000") {
            setLetters(prev => prev.concat(["000000"]));
        }
    }
    useEffect(() => {
        emptyCharacter();
    }, [cursorInd]);

    function handleLetterClick(index) {
        setCursorInd(index);
    }

    return (
        <div className="braille">
            <h1>Braille</h1>
            
            <h3>Converted:</h3>
            <h3 className="text-gap"
            onClick={(e) => {
                if (e.target === e.currentTarget && letters.length > 0) {
                    setCursorInd(letters.length - 1);
                }
              }}>
                {text.map((letter, index) => (
                    <span
                        key={index}
                        onClick={() => handleLetterClick(index)}
                        className={`letter ${index == cursorInd ? 'active cursor' : ''}`}
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
                    <div className='dots-grid'>
                        {Array.from({length: 6}).map((_, ind) => (
                            <button
                                key = {ind}
                                className={`dot-button ${letters[cursorInd][ind] == '1' ? 'active' : ''}`}
                                onClick={() => toggleDot(ind)}
                            >
                                {ind + 1}
                            </button>
                        ))}
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
            <br/>
            <BackButton/>
        </div>
    );
};

export default Braille;