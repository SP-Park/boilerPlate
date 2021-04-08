import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';


// HOC : 백엔드에 리쿼스트를 날려서 접근하려는 사람의 상태를 가져온 후 진입 여부 판별
// 다른 컴포넌트를 hoc에 넣어줌 (app.js의 switch 부분에 각 페이지 앞에 auth로 감싸준다.)
export default function (SpecificComponent, option, adminRoute = null) {

  //option 설명 
  //null = 아무나 출입이 가능한 페이지
  //true = 로그인한 유저만 출입이 가능한 페이지
  //false = 로그인한 유저는 출입이 불가능한 페이지

    // adminRoute 설명
    // admin유저만 들어가기를 원하는 페이지

  function AuthenticationCheck(props) {

    const dispatch = useDispatch();

    useEffect(() => {
     
      dispatch(auth()).then(response => {
        console.log(response)

        //로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if(option) {
            props.history.push('/login')
          }
        } else {
          //로그인한 상태
          // 1. 로그인 한 관리자가 아닌 유저가 어드민 페이지에 접근 시도 시
          if(adminRoute && !response.payload.isAdmin) {
            props.history.push('/')
          } else { 
          // 2. 로그인한 유저가 출입 불가능한 페이지에 접근 시도 시 (로그인, 등록 페이지..)
            if(option === false) props.history.push('/')
          }
        }
      })
     



    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck
}