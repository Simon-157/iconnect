import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import { HOME, LOGIN, COMPLAINT, REGISTER, COMPLAINTS, PAGENOTFOUND, PROFILE,SIMON, ROOMS, ROOM, ANALYTICS, ADDISSUE, CALENDAR, ASSIGNED, PEOPLE, REPORTS, LANDINGPAGE } from "./utils/Routes";


// import { Test } from "./pages/Test";
import { Login,CalendarPage, HotLineRooms,HotLineRoom, Register,  Complaints, Reports, SubmitComplaint, PageNotFound, ComplaintDetails, People, LandingPage, AssignedIssues, Profile, Simon, Analytics } from "./pages";


function App() {

 
  const [isDarkMode, setIsDarkMode] = useState(false);
return (
      
        <div className='flex h-screen w-screen bg-app-background-1 overflow-hidden' >
            <Routes>
              <Route path={HOME} element={<LandingPage  />} />
              <Route path={SIMON} element={<Simon />} />
              <Route path={LOGIN} element={<Login />} />
              <Route path={REGISTER} element={<Register />} />

              <Route path = "/playground" element={<Protected />}>
                <Route path={ADDISSUE} element={<SubmitComplaint isDarkMode={isDarkMode} />} />
                <Route path={PROFILE} element={<Profile />} />
                <Route path={ROOM} element={<HotLineRoom/>} />
                <Route path={ROOMS} element = {<HotLineRooms />}/>
                <Route path={ANALYTICS} element={<Analytics />} />
                <Route path={COMPLAINTS} element={<Complaints />} />
                <Route path={CALENDAR} element={<CalendarPage />} />
                <Route path={COMPLAINT} element={<ComplaintDetails />}/>
                <Route path={ASSIGNED} element={<AssignedIssues />} />  
                <Route path={PEOPLE} element={<People />} />
                <Route path={REPORTS} element={<Reports />} />
              </Route>
              <Route path={PAGENOTFOUND} element={<PageNotFound />} />
            </Routes>
      </div>
  );
}

export default App;
