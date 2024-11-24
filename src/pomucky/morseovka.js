import React from 'react';
import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();
    
    function handleClick() {
        return navigate("/");
    }
    return(
        <button onClick={handleClick}>Back to Menu</button>
    )
};

const Morseovka = () => {
    return (
        <div>
            <h1>Morseovka</h1>
            <p>This is the Morseovka tool page.</p>
            <BackButton/>
        </div>
    );
};

export default Morseovka;