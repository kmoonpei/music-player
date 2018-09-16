import * as actionTypes from '../../actionTypes';
let init_state = { status: 'logOut' };
const loginState= (state = init_state, action) => {
    console.log('login action:',action)
    switch (action.type) {
        case actionTypes.LOGIN:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
export {loginState};