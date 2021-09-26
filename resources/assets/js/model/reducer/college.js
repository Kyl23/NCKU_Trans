import {
    INIT_COLLEGE,
    EDIT_COLLEGE,
    REMOVE_EDIT_COLLEGE,
} from '../action/college';

const initState = [];

const collegeReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_COLLEGE: {
            return action.payload.data;
        }
        case EDIT_COLLEGE: {
            const { id, name } = action.payload.value;
            const targetIndex = state.findIndex((element) => element.id === id);
            const stateNext = [...state];
            stateNext[targetIndex] = {
                ...stateNext[targetIndex],
                nameNext: name,
            };
            return stateNext;
        }
        case REMOVE_EDIT_COLLEGE:
            const { id } = action.payload.value;
            const targetIndex = state.findIndex((element) => element.id === id);
            const stateNext = [...state];
            stateNext[targetIndex].name = stateNext[targetIndex].nameNext;
            stateNext[targetIndex].nameNext = undefined;
            return stateNext;
        default:
            return state;
    }
};

export default collegeReducer;
