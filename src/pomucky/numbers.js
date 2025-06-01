import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './numbers.scss';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function BackButton() {
    const navigate = useNavigate();
    
    function handleClick() {
        return navigate("/");
    }
    return(
        <button className="back-button" onClick={handleClick}>Back to Menu</button>
    )
};

function Numbers() {
    const[text, setText] = useState("");
    const[convertedText, setConvertedText] = useState("");
    const[mode, setMode] = useState("binary"); // "binary", "ternary", "decimal"
    const[dropdownOpen, setDropdownOpen] = useState(false);
    const[cursorInd, setCursorInd] = useState(0);
    const [activeIndex, setActiveIndex] = useState(1);
    const[letterStart, setLetterStart] = useState([]);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const selectMode = (newMode) => {
        setMode(newMode);
        setDropdownOpen(false);
    }

    const digitsByMode = {
        binary: ['0','1'],
        ternary: ['0','1','2'],
        decimal: ['0','1','2','3','4','5','6','7','8','9']
    };
    const digits = digitsByMode[mode];

    const pressKey = (key) => {
        if(key == " " && text.endsWith(" ")) return;
        setText(prev => prev + key);
        setCursorInd(prev => prev + 1);
    }
    const erase = () => {
        if(text.length == 0) return;
        if(cursorInd == text.length) {
            setText(prev => {
                return prev.slice(0, cursorInd - 1) + prev.slice(cursorInd)
            });
            setCursorInd(prev => prev - 1);
        }
        else {
            setText(prev => {
                return prev.slice(0, cursorInd) + prev.slice(cursorInd + 1)
            });
            setCursorInd(prev => prev - 1);
        }
    }

    function convert(text, base) {
        if(text == "") return "";
        let newActiveIndex = -1, curLength = 0, curIndex = 0;
        let newLetterStart = [];
        let newText = text.trim().split(/\s+/).map(token => {
            newLetterStart.push(curLength);
            curLength += String(token).length;
            if(newActiveIndex == -1 && curLength >= cursorInd) {
                newActiveIndex = curIndex;
            }
            curLength++;
            curIndex++;
            let num = parseInt(token, base);
            return num >= 1 && num <= 26 ? ALPHABET[num - 1] : "?";
        });
        setActiveIndex(newActiveIndex);
        setLetterStart(newLetterStart);
        return newText.join('');
    }

    useEffect(() => {
        let base;
        if(mode == "binary") base = 2;
        else if(mode == "ternary") base = 3;
        else base = 10;
        setConvertedText((convert(text, base)));
    }, [text, mode, cursorInd]);

    function handleLetterClick(index) {
        setCursorInd(letterStart[index]);
    }

    function handleClick(index) {
        setCursorInd(index);
    }

    return (
        <div className="numbers">
            <h1 onClick={toggleDropdown} className="title">
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                <span className="arrow">{dropdownOpen ? " ▲" : " ▼"}</span>
            </h1>
            {dropdownOpen && (
                <ul className="dropdown">
                <li className={mode == "binary" ? "mode active" : "mode"} onClick={() => selectMode('binary')}>Binary</li>
                <li className={mode == "ternary" ? "mode active" : "mode"} onClick={() => selectMode('ternary')}>Ternary</li>
                <li className={mode == "decimal" ? "mode active" : "mode"} onClick={() => selectMode('decimal')}>Decimal</li>
                </ul>
            )}

            <h3>Converted:</h3>
            <h3 className='text-gap'>
                {convertedText.split('').map((char, index) => (
                    <span
                        key={index}
                        className={index == activeIndex ? "letter active" : "letter"}
                        onClick={() => handleLetterClick(index)}
                    >
                        {char}
                    </span>
                ))}
            </h3>

            <h3>Input:</h3>
            <h3 className='text-gap' onClick={(e) => {
                if (e.target === e.currentTarget && text.length > 0) {
                  setCursorInd(text.length);
                }
            }}>
                {text.split('').map((char, index) => (
                    <span
                        key={index}
                        className={index == cursorInd ? "symbol cursor" : "symbol"}
                        onClick={() => handleClick(index)}
                    >
                        {char == " " ? '\u00A0' : char}
                    </span>
                ))}
                {cursorInd == text.length && (
                    <span
                    className="symbol cursor"
                    onClick={() => setCursorInd(text.length > 0 ? text.length - 1 : 0)}
                    >&nbsp;</span>
                )}
            </h3>
            
            <div className="controls-container">
                <div className='controls'>
                    {digits.map(d => (
                        <button key={d} onClick={() => pressKey(d)}>
                            {d}
                        </button>
                    ))}
                    <button className={mode == "ternary" ? "super-wide" : "wide"} onClick={() => pressKey(" ")}>
                        ␣
                    </button>
                    <button className={mode == "binary" ? "wide" : "super-wide"} onClick={erase}>
                        ⌫
                    </button>
                </div>
            </div>


            <br/>
            <BackButton/>
        </div>
    );
}

export default Numbers;