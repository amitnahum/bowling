import './App.css';
import React from 'react';
import BowlingGame from "./components/BowlingGame";

function App() {
    return (
        <BowlingGame totalNumberOfFrames={10} numberOfPins={10}/>
    );
}

export default App;
