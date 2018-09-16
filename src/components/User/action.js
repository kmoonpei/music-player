
import * as actionTypes from '../../actionTypes';
const LoginAction = (data) => {
    return {
        type: actionTypes.LOGIN,
        data: data
    }
};
export { LoginAction };