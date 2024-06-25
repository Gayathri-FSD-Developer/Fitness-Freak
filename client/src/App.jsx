import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication.jsx";

import NavbarCompo from "./components/NavbarCompo.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./pages/Dashboard.jsx";
import Workouts from "./pages/Workouts.jsx";
import Contact from "./pages/Contact.jsx";
import { useSelector } from "react-redux";
import Blog from "./pages/Blog.jsx";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  
  // Current user token 
   const { currentUser } = useSelector((state) => state.user);
  
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {/* If user present it go for home. If not present go for Authentication */}
        {currentUser ? (
          <Container>
            <NavbarCompo currentUser={currentUser}/>

            {/* Routing 
          the navbar and the routes specified in your routing configuration are connected 
          through the paths you define. When you click a link in the navbar,
           React Router will match the path of the clicked link to the corresponding route 
           and render the appropriate component.*/}
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blog/>}/>
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
