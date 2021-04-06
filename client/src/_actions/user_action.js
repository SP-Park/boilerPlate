import axios from 'axios';
import {
  LOGIN_USER
} from './types';

export function loginUser(dataTosubmit) {

    const request = axios
    .post('/api/users/login', dataTosubmit)
    .then(response => response.data)

    //user_reducer.js 로 전달
    return {
      type: LOGIN_USER,
      payload: request
    }
}