import * as types from './actionTypes';
const saveRankList = (data) => {
    return {
        type: types.SAVE_RANKLIST,
        data
    }
};
export { saveRankList };