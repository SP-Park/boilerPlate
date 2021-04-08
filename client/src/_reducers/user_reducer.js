//이전 state와 action => 다음 state (previousState, action) => nextState

import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from '../_actions/types';


export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      //... 스프레드 연산자, 위 파라메터를 똑같이 가져온다 아래는 빈 상태를 나타냄
      return { ...state, loginSuccess: action.payload }
      break;

    case REGISTER_USER:
      return { ...state, register: action.payload }
      break;

    case AUTH_USER:
      return { ...state, userData: action.payload }
      break;

      default:
        return state;
  }
}


