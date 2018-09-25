import * as types from '../../actionTypes';
const HotSearchAction = (data) => {
    return {
        type: types.HOTWORD,
        data: data
    }
};
export { HotSearchAction };