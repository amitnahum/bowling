import Actions from "./BowlingGame.actions";
const {ADD_SCORE, ADVANCE_ROUND, ADVANCE_FRAME, SELECT_NUMBER, END_GAME, RESTART} = Actions;

/**
 * reducer for actions
 * @param state
 * @param action
 */
export function reducer(state: any, action: any) {
    console.log('before')
    console.log(state, action)
    if (state.isGameEnded && action.type !== RESTART) {
        return state
    }
    switch (action.type) {
        case ADD_SCORE:
            let frames = [...state.frames];
            // current ball:
            frames[state.currentFrameIndex].scores[state.round - 1] = action.data;
            return {
                ...state,
                frames
            }
        case ADVANCE_ROUND:
            return {
                ...state,
                round: state.round + action.data,
            }
        case ADVANCE_FRAME:
            return {
                ...state,
                round: 1, // advance frame always sets the round to 1
                currentFrameIndex: Math.min(state.currentFrameIndex + action.data, state.totalNumberOfFrames)
            }
        case END_GAME:
            return {
                ...state,
                isGameEnded: action.data
            }
        case SELECT_NUMBER:
            return {
                ...state,
                selectedNumber: action.data
            };
        case RESTART:
            return action.data;

        default:
            return {
                ...state
            }
    }
}
