import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import ImageOne from '../utils/Images/pexels-pixabay-221247.jpg';
import ImageFour from '../utils/Images/pexels-pixabay-39671.jpg';
import ImageThree from '../utils/Images/pexels-jonathanborba-3076513.jpg';
import ImageTwo from '../utils/Images/pexels-victorfreitas-2261477.jpg';
import ImageFive from '../utils/Images/pexels-pixabay-416778.jpg';
import BlogPost from '../components/BlogPost.jsx';


const Container = styled.div`
display: flex;
flex:1;
  flex-direction: column;
  align-items: center;
  overflow-y:scroll;
  padding: 20px;
   background-color:#6C93A4;
  //  background-color:#A78DA5;
   `;
  
const CarouselWrapper  = styled.div` width: 100%;
  max-width: 1200px;
//   margin-bottom: 20px;
   border-radius: 25px; /* Border radius for the entire carousel */  
`;
const AdditionalContent  = styled.div`width: 100%;
  max-width: 1200px;
  background-color: #7C9473;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);`;

  const StyledCarouselImage= styled.img`
  width: 100%;
  height: 400px; // Set a fixed height for the carousel container
  object-fit: cover;
  border-radius: 25px;
  `;
  


const Blog = () => {
    return (
        <Container>
        <CarouselWrapper>
          <Carousel  interval={1000} pause={false}>
            <Carousel.Item>
              <StyledCarouselImage
                className="d-block w-100"
                src={ImageOne}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <StyledCarouselImage
                className="d-block w-100"
                src={ImageTwo}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <StyledCarouselImage
                className="d-block w-100"
                src={ImageThree}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <StyledCarouselImage
                className="d-block w-100"
                src={ImageFour}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <StyledCarouselImage
                className="d-block w-100"
                src={ImageFive}
                alt="Third slide"
              />
            </Carousel.Item>          
          </Carousel>
        </CarouselWrapper>
        {/* <AdditionalContent>
          <h2>Additional Content</h2>
          <p>This is some additional content below the carousel.</p>
        </AdditionalContent> */}
      <BlogPost />
      </Container>
    );
};

export default Blog;