import React, { useEffect } from "react";
import styled from "styled-components";
// import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard.jsx";
import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";
import WeeklyStatCard from "../components/cards/WeeklyStatCard.jsx";
import CategoryChart from "../components/cards/CategoryChart.jsx";
import AddWorkout from "../components/AddWorkout.jsx";
import WorkoutCard from "../components/cards/WorkoutCard.jsx";
import { getDashboardDetails, addWorkout, getWorkouts } from "../api/index.js";
import { useState } from "react";

// Datas for CountCard(Dashboard)
const counts = [
  {
    name: "Calories Burned",
    icon: (
      <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />
    ),
    desc: "Total calories burned today",
    key: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Workouts",
    icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Total no of workouts for today",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Average  Calories Burned",
    icon: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Average Calories Burned on each workout",
    key: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];

//   Style Components
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  // background-color:#9A8C98;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  // Initialy empty arry
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  // Default workout added
  const [workout, setWorkout] = useState(`#Legs
  -Back Squat
  -5 setsX15 reps
  -30 kg
  -10 min`);

  // Function toget data for dashboard
  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fitfreak-app-token"); //getItem() get the (Browser-Specific Storage)locally stored token
    await getDashboardDetails(token) //api call by passing token
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
        setButtonDisabled(false);
      });
  };
  // Function to Add workout
  const addNewWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fitfreak-app-token");
    await addWorkout(token, { workoutString: workout })
      // console.log("workoutString",workout)
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
        setButtonDisabled(false);
      });
  };

  //Get today added workouts
  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    // no date so server(backend)it take today as default date
    await getWorkouts(token, "")
      .then((res) => {
        setTodaysWorkouts(res?.data?.todaysWorkouts);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
        setButtonDisabled(false);
      });
  };

  // Calling the fun everytime when the page loads. So calling the fun inside useEffect hook
  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []); //Run Once on Mount stage

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} data={data} />
          ))}
        </FlexWrap>
        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout} //passing functions as well the other states
            buttonLoading={buttonLoading}
          />
        </FlexWrap>
        <Section>
          <Title>Todays Workout</Title>
          <CardWrapper>
            {todaysWorkouts.length === 0 ? (
              <p>No workout found for today 🔍 </p>
            ) : (
              todaysWorkouts.map((workout) => <WorkoutCard workout={workout} />)
            )}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
