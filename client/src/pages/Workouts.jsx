import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { CircularProgress } from "@mui/material";
import { getWorkouts } from "../api/index.js";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 22px 0px;
  overflow-y: scroll;
  // background-color:#A78DA5;

`;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  max-width: 1600px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;
const Left = styled.div`
  flex: 0.3;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 3px 2px 20px 0px #0076CE;
  // background-color:#BDA9BB;
  background-color:#ABCDE5;
`;
const Right = styled.div`
  flex: 1; 
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const SecTitle = styled.div`
  font-size: 23px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 550;
`;
const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 100px;
  flex-wrap: wrap; //to wrap the exceed content inside container
`;

const Workouts = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fitfreak-app-token");
    await getWorkouts(token, date ? `?date=${date}` : "")
      .then((res) => {
        setTodaysWorkouts(res?.data?.todaysWorkouts);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date]); //whenevr the date changed the api should be called

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Calender</Title>
          {/* Data picker for calender */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              // This event object (e)contains information about the selected date. Here format a date into the MM/DD/YYYY format using properties from an event object (e).
              // e.$M + 1 : For example, if e.$M is 0, adding 1 gives you 1 (January). e.$D:  represents the day of the month. e.$y represents the full year.
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Daily Workouts</SecTitle>
            <CardWrapper>
              {loading ? (
                <CircularProgress />
              ) : todaysWorkouts.length === 0 ? (
                <p>No workout found 🔍 </p>
              ) : (
                todaysWorkouts.map((workout) => {
                  return <WorkoutCard workout={workout} />;
                })
              )}
             
            </CardWrapper>
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
