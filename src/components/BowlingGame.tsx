import React, { useReducer } from "react";
import { SelectableNumberRow } from "./SelectableNumberRow/SelectableNumberRow";
import { IFrame } from "./Frames/Frame";
import { FrameRow } from "./Frames/FrameRow";
import { reducer } from "../store/BowlingGame.reducer";
import Actions from "../store/BowlingGame.actions";

const {ADD_SCORE, ADVANCE_ROUND, ADVANCE_FRAME, SELECT_NUMBER, END_GAME, RESTART} = Actions;


const STRIKE = 'X';
const SPARE = '/'
const FIRST_ROUND = 1;
const SECOND_ROUND = 2;
const THIRD_ROUND = 3;

interface Game {
    scores: number[]
}

interface BowlingGameState {
    frames: Game[],
    numberOfPins: number,
    totalNumberOfFrames: number
    round: number,
    currentFrameIndex: number,
    selectedNumber: number,
    isGameEnded: boolean
}

/**
 * inits the frames so we can display them
 * @param totalNumberOfFrames
 */
export const initFrames = (totalNumberOfFrames: number): Game[] => {
    let frames = [];
    for (let i = 0; i < totalNumberOfFrames; i++) {
        frames.push({scores: []});
    }
    return frames;
}

/**
 * if the total is 10 and the length is 2
 * @param arr
 */
const isSpare = (arr: number[]) => arr.reduce((a, b) => a + b, 0) === 10 && arr.length === 2

/**
 * if the first score is 10
 * @param arr
 */
const isStrike = (arr: number[]) => arr[0] === 10;

/**
 * returns whether current frame index is the last frame
 * @param frames
 * @param currentFrameIndex
 */
const isLastFrame = (frames: Game[], currentFrameIndex: number) => currentFrameIndex === frames.length - 1


/**
 * returns whether this is the first round
 * @param round
 */
const isFirstRound = (round: number) => round === FIRST_ROUND;

/**
 * returns whether this is the second round
 * @param round
 */
const isSecondRound = (round: number) => round === SECOND_ROUND;

/**
 * returns whether it's the third round
 * @param round
 */
const isThirdRound = (round: number) => round === THIRD_ROUND;



const nullisZero = (candidate: number | null | undefined) => candidate === null || candidate === undefined ? 0 : candidate


/**
 *  a helper function that returns how many pins we have left on the board
 *  as an array of numbers i,e if we have two pins it will return [0,1,2]
 * @param frames
 * @param currentFrameIndex
 * @param totalPins
 * @return {number[]} array of numbers simulating pins
 */
export const getPinsLeft = (frames: Game[], currentFrameIndex: number, totalPins: number): number[] => {
    const frame = frames[currentFrameIndex];
    if (!frame)
        return [];
    if (isLastFrame(frames, currentFrameIndex))
        return numberToArray(getLastFramePinsLeft(frame.scores, totalPins));
    return numberToArray(getFramePinsLeft(frame.scores, totalPins))
}

/**
 * gets the number of pins left in the frame when it's the last frame
 * @param scores
 * @param totalPins
 */
export const getLastFramePinsLeft = (scores: number[], totalPins: number): number => {
    if (scores.length === 1 && isStrike(scores)) {
        return totalPins;
    }
    if (scores.length === 2) {
        if (isSpare(scores) || isStrike(scores)) {
            return totalPins;
        }
        return 0;
    }
    if (scores.length === 3) {
        return 0;
    }
    return getFramePinsLeft(scores, totalPins)
}

/**
 * returns the number of pins left when provided with a scores array
 * @param scores
 * @param totalPins
 */
export const getFramePinsLeft = (scores: number[], totalPins: number): number => {
    return totalPins - nullisZero(scores[0])
}

/**
 * gets a number and returns an array populated with numbers from 0 up to that number i,e [0,1,...n]
 * @param number
 */
const numberToArray = (number: number): number[] => {
    let res = [];
    for (let j = 0; j <= number; j++) {
        res.push(j)
    }
    return res;
}


/**
 * Receives an array of frames and an index to that array and returns to score up to that index
 * @param {Game[]} frames - the game frames
 * @param {number} frameIndex - the index to calculate the score for
 * @return returns a number which is the score up to frameIndex
 */
export const getScoreUpToFrame = (frames: Game[], frameIndex: number): number => {
    return frames.reduce((previousValue: number, currentValue: Game, currentIndex: number) => {
        if (currentIndex <= frameIndex) {
            // we need to incorporate some bowling logic here
            const thisFrame = frames[currentIndex];
            const isThisStrike = isStrike(thisFrame.scores);
            const isThisSpare = isSpare(thisFrame.scores);
            const isThisLastRound = currentIndex === frames.length - 1;
            let roundScore = currentValue.scores.reduce((a, b) => a + b, 0);
            if (isThisSpare) {
                // if we have a spare we need to add the score of the next round
                // as a spare needs to rounds to achieve we calculate from the 2nd round
                roundScore += getAheadScores(frames, currentIndex, SECOND_ROUND, 1);
            }
            if (isThisStrike && !isThisLastRound) {
                // we don't calculate bonus ahead score for last round, but we do for others *bowling rules*
                // a strike is always on the first round so we calculate from 1st round
                roundScore += getAheadScores(frames, currentIndex, FIRST_ROUND, 2);
            }
            return previousValue + roundScore
        }
        return previousValue;
    }, 0)
}
/**
 * takes inputs and returns the sum of the scores in the n games played after this game
 * @param frames
 * @param gameIndex
 * @param currentRound
 * @param num
 */

export const getAheadScores = (frames: Game[], gameIndex: number, currentRound: number, num: number) => {
    if (num <= 0)
        return 0;
    const spliced = frames.map(f => f.scores).splice(gameIndex).flat();
    for (let i = 0; i < currentRound; i++) {
        // we always need to remove ourselves and rounds before us
        spliced.shift();
    }
    return spliced.splice(0, num).reduce((a, b) => a + b, 0);
}


/**
 * this function returns a cell representation depending on the score
 * @param scores
 * @param totalNumberOfPins
 */
export const getCellsFromScoresWithPadding = (scores: number[], totalNumberOfPins: number = 10): (string | number)[] => {
    const padCharacter = "";
    let cells: (string | number)[] = getCellsFromScoresWithNoPadding(scores, totalNumberOfPins);
    if (cells.length === 1 && cells[0] === STRIKE)
        cells.unshift(padCharacter);
    else if (cells.length === 1)
        cells.push(padCharacter)
    if (cells.length === 0)
        return ['', '']
    return cells;
}

/**
 * gets the cell string representation from the scores array and doesn't pad according to bowling padding logic
 * @param scores
 * @param totalNumberOfPins
 */
export const getCellsFromScoresWithNoPadding = (scores: number[], totalNumberOfPins: number = 10): (string | number)[] => {
    return scores.map((score, index) => {
        if (score === totalNumberOfPins) return STRIKE;
        if (score + scores[index - 1] === totalNumberOfPins) return SPARE;
        else return score.toString();
    })
}


/**
 * Bowling Game main component
 * @param totalNumberOfFrames - total number of frames you want
 * @param numberOfPins - total number of pins per frame
 * @constructor
 */
export function BowlingGame({totalNumberOfFrames, numberOfPins}: { totalNumberOfFrames: number, numberOfPins: number }) {
    const initialState: BowlingGameState = {
        frames: initFrames(totalNumberOfFrames),
        round: 1,
        currentFrameIndex: 0,
        selectedNumber: -1,
        totalNumberOfFrames,
        numberOfPins,
        isGameEnded: false
    }
    const [state, setGameState] = useReducer(reducer, initialState);
    const {selectedNumber, currentFrameIndex, frames, round, isGameEnded} = state;
    const numbers = getPinsLeft(frames, currentFrameIndex, numberOfPins);

    /**
     * restarts the bowling app
     */
    const restart = () => {
        setGameState({type: RESTART, data: initialState});
    }
    /**
     * a number of pins knocked was submitted so we need to apply some state changes:
     * 1. first we add the score
     *
     * @param setGameState
     */
    const knockEmDown = (setGameState: Function) => {
        if (isGameEnded) return;
        if (selectedNumber !== -1) {
            const isStrike = (isFirstRound(round) || isSecondRound(round)) && selectedNumber === numberOfPins
            if (!isLastFrame(frames, currentFrameIndex) // in regular rounds we can't knock more than total number so don't allow
                && selectedNumber + frames[currentFrameIndex].scores.reduce((a: number, b: number) => a + b, 0) > numberOfPins) {
                return;
            }
            setGameState({type: ADD_SCORE, data: selectedNumber});

            if (isLastFrame(frames, currentFrameIndex)) {
                // last frame we have logic if we end the game or add a round
                // if the last frame was a strike we get a total of 2 rounds
                // if the last frame second round a spare we get 1 bonus balls
                if ((isFirstRound(round) || isSecondRound(round)) && isStrike) {
                    // first case is easy, we get a strike just advance a round
                    setGameState({type: ADVANCE_ROUND, data: 1});
                } else if (isSecondRound(round) && (isSpare(frames[currentFrameIndex].scores) || isStrike)) {
                    // if we get a spare on the second round we advance another round
                    setGameState({type: ADVANCE_ROUND, data: 1});
                } else if (isSecondRound(round)) {
                    setGameState({type: END_GAME, data: true});
                } else if (isThirdRound(round)) {
                    setGameState({type: END_GAME, data: 1})
                } else {
                    setGameState({type: ADVANCE_ROUND, data: 1})
                }

            } else {
                if (isStrike) { // strike needs to advance frame but not round
                    setGameState({type: ADVANCE_FRAME, data: 1});
                } else { // otherwise if our round is 1 we need to advance round
                    if (isFirstRound(round)) {
                        setGameState({type: ADVANCE_ROUND, data: 1});
                    } else {
                        setGameState({type: ADVANCE_FRAME, data: 1}); // advance frame will also reset round
                    }
                }
            }
            // setGameState({type: SELECT_NUMBER, data: -1});
        }
    }

    /**
     * selects a number on the pin array
     * @param number
     */
    const selectNumber = (number: number) => {
        setGameState({type: SELECT_NUMBER, data: number});
    }

    /**
     * transforms Bowling Game Frames to component frames as they are loosely coupled
     * @param frames
     */
    const transformFrames = (frames: Game[]): IFrame[] => {
        return frames.map((frame: Game, index: number) => {
            const total = getScoreUpToFrame(frames, index);
            return {
                cells: isLastFrame(frames, index) ? getCellsFromScoresWithNoPadding(frame.scores) : getCellsFromScoresWithPadding(frame.scores),
                footer: frame.scores.length === 0 ? '' : total,
                header: index + 1
            }
        })
    }

    return (
        <div style={{padding: "16px"}}>
            <h1>Bowling Score Calculator</h1>
            <div hidden={isGameEnded}>
                Click number of pins knocked down
            </div>
            <div hidden={!isGameEnded} style={{marginBottom: "16px"}}>
                Game has ended! You achieved a final score of {getScoreUpToFrame(frames, frames.length - 1)}
            </div>
            <div>
                <div hidden={isGameEnded}>
                    <SelectableNumberRow onSelect={(number: number) => selectNumber(number)}
                                         numbers={numbers}
                                         selected={selectedNumber}/>
                    <div className={"button"} onClick={() => knockEmDown(setGameState)}>Submit</div>
                </div>
                <FrameRow frames={transformFrames(frames)}/>
            </div>

            <div className={"button"} onClick={restart}>
                RESTART
            </div>
        </div>
    )

}


export default BowlingGame
