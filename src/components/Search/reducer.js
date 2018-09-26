import * as types from '../../actionTypes';
const initState = { list: [], search_words: [] }
export default function HotSearch(state = initState, action) {
    switch (action.type) {
        case types.HOTWORD:
            return Object.assign({}, state, action.data);
        case types.SEARCHWORD:
            // state.search_words.push(action.data);
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

