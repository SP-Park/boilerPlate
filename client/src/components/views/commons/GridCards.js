import React from 'react';
import { Col } from 'antd';

function GridCards(props) {

    if(props.landingPage) {
        return (
            //한 컬럼에 24 사이즈( 6*4 =24) 가장 클때 4개 , 중간 3개 작을때 1개 로 설정하기 위해 24 / 원하는 표시될 카드 숫자 나누기를 해서 결과값을 아래에 적어줌
            <Col lg={6} md={8} xs={24}>
               <div style={{ position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px'}} src={props.image} alt={props.movieName}/>
                    </a>
              </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative'}}>
                     <img style={{ width: '100%', height: '320px'}} src={props.image} alt={props.characterName}/>
           </div>
         </Col>
        )
    }


}

export default GridCards
