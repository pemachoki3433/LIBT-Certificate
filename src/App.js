import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import StudentId from "./views/StudentId";
import StudentContext from "./contexts/StudentContext";
import StudentContextProvider from "./contexts/StudentContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0a1c3d",
    },
    secondary: {
      main: "#ffab00",
    },
  },
});

function App() {
  return (
    <StudentContextProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StudentId />} />
              <Route path="/student/:studentID" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </StudentContextProvider>
  );
}

export default App;
