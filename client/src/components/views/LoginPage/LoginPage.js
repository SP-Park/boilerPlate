import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {

  const dispatch = useDispatch();

  //state - react hook
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  //event
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 새로고침 되는 것을 방지
    
    let body = {
      email: Email,
      password: Password
    }
    
    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          props.history.push('/')
        } else {
          alert('Error')
        }
      })
    // axios
    // .post('/api/users/login', body)
    // .then(response => {

    // })

    //Redux 사용 전 부분 -> Redux 사용시 dispatch 선언 후 Axios 부분은 user_action.js 로 이동
  
  }
  

  return (
    <div style={{
      display: 'flex', justifyContent:'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
