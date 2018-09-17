import * as types from '../../actionTypes';
const RanksAction = (data) => {
    return {
        type: types.RANKLIST,
        data: data
    }
};
export { RanksAction };