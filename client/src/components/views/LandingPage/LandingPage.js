import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage(props) {

  //state
  const [Movie, setMovie] = useState([])
  const [MainMovieImage, setMainMovieimage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);

  }, [])

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setMovie([...Movie, ...response.results])   //기존에 있던 Movie state 에 새로운 response.results를 추가하도록 해줌 
      setMainMovieimage(response.results[0])
      setCurrentPage(response.page)
    })
  } 

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${ CurrentPage + 1 }`;
    fetchMovies(endpoint);
  }



  return (
    <div style={{ width: '100%', margin: '0' }}>
      
      {/* Main Page */}
      { MainMovieImage &&
      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
        title={MainMovieImage.original_title}
        text={MainMovieImage.overview}
      />
      }

      <div style={{ width: '85%', margin: '1rem auto'}}>
        <h2>Movies by latest</h2>
        <hr />

        {/* Grid Cards 그리드 카드에 가져온 정보를 하나하나 넣어줌*/}  
        <Row gutter={[ 16, 16]}>
          
          {Movie && Movie.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCards 
                image={movie.poster_path ?
                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                movieId={movie.id}   //무비 고유의 정보를 획득하기 위해 필요
                movieName={movie.original_title}
              />

            </React.Fragment>
          ))}
        
        </Row>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center'}}>
          <button onClick={loadMoreItems}>Load more</button>
      </div>

    </div>
  )
}

export default withRouter(LandingPage)
