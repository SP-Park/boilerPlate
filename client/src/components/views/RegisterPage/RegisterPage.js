import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {

  const dispatch = useDispatch();

  //state - react hook
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  //event
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 새로고침 되는 것을 방지
    
    if(Password !== ConfirmPassword) {
      return alert ('비밀번호가 다릅니다.')
    }

    let body = {
      email: Email,
      name: Name,
      password: Password
    }
    
    dispatch(registerUser(body))
    // 성공 시 화면 리다이렉트
      .then(response => {
        if(response.payload.success) {
          props.history.push("/login")
        } else {
          alert("Failed to sign up")
        }
      })
    }
  return (
    <div>
      <div style={{
      display: 'flex', justifyContent:'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        
        <label>Comfirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        
        <br />
        <button>회원 가입</button>
      </form>
    </div>
    </div>
  )
}

export default withRouter(RegisterPage)
