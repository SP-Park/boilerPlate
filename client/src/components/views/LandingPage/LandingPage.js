import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage(props) {

   //state
  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null)

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(endpoint)
    .then(response => response.json()) //response를 바로 읽을 수는 없고 json을 통해 읽을 수 있음
    .then(response => {
      console.log(response)
      setMovies([response.results]) //가져온 결과를 movie state에 넣어줌
      setMainMovieImage(response.results[0]) //가장 인기있는 정보를 가져와서 메인에 넣어줌
    })

  }, [])



  return (
    <div style={{
      width: '100%', margin: '0' }}>
      
      {/* Main Image */}
      {MainMovieImage &&  // MainMovieImage 정보를 가져왔으면 아래 부분을 해라 라는 뜻
      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
        title={MainMovieImage.original_title}
        text={MainMovieImage.overview}
      />
      }

      <div style={{ width: '85%', margin: '1rem auto'}}>

        <h2>Movies by latest</h2>
        <hr />

        {/* Movie Grid Cards */}


      </div>

      <div style={{ display: 'flex', justifyContent: 'center '}}>
        <button>Load More</button>
      </div>  
    
    
    </div>
  )
}

export default withRouter(LandingPage)
