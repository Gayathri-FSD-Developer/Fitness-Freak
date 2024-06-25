import React from 'react';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);


  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 576px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #222;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 576px) {
    font-size: 1.5em;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.25em;
  }

  @media (max-width: 576px) {
    font-size: 1em;
  }
`;

const Paragraph = styled.p`
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #444;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 576px) {
    font-size: 0.8em;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 15px 0;
  }

  @media (max-width: 576px) {
    margin: 10px 0;
  }
`;

const BlogPost = () => {
  return (
    <BlogContainer>
      <Title>The Ultimate Guide to Fitness and Workouts</Title>
      <Subtitle>Introduction</Subtitle>
      <Paragraph>
        Fitness is not just about hitting the gym; it's a lifestyle. Whether you are a beginner or a seasoned athlete, having a comprehensive understanding of fitness and workouts is crucial to achieving your health goals.
      </Paragraph>

      <Subtitle>Benefits of Regular Exercise</Subtitle>
      <Paragraph>
        Regular physical activity can improve your muscle strength and boost your endurance. Exercise delivers oxygen and nutrients to your tissues and helps your cardiovascular system work more efficiently. When your heart and lung health improve, you have more energy to tackle daily chores.
      </Paragraph>

      <Subtitle>Types of Workouts</Subtitle>
      <Paragraph>
        There are various types of workouts you can incorporate into your fitness routine:
      </Paragraph>
      <ul>
        <li>Cardiovascular exercises like running, cycling, and swimming.</li>
        <li>Strength training exercises such as weight lifting and bodyweight exercises.</li>
        <li>Flexibility exercises like yoga and stretching routines.</li>
      </ul>

      <Subtitle>Creating a Workout Plan</Subtitle>
      <Paragraph>
        A well-rounded workout plan should include a mix of cardiovascular, strength, and flexibility exercises. Here are some tips to get started:
      </Paragraph>
      <ul>
        <li>Set clear, achievable goals.</li>
        <li>Start slow and gradually increase the intensity.</li>
        <li>Incorporate rest days to allow your body to recover.</li>
        <li>Stay consistent and track your progress.</li>
      </ul>

      <Subtitle>Conclusion</Subtitle>
      <Paragraph>
        Achieving fitness goals requires dedication, consistency, and a positive mindset. Remember to listen to your body and enjoy the journey. Fitness is not a destination but a way of life.
      </Paragraph>
    </BlogContainer>
  );
};

export default BlogPost;
