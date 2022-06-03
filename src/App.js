import {
  Route,
  Routes,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import "./SCSS/GlobalStyles.scss";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import AppContext from "./Context/AppContext";
import { useContext } from "react";
import NavBar from "./Shared/NavBar";
import CoursesPage from "./Pages/CoursesPage";
import EnrollmentsPage from "./Pages/EnrollmentsPage";
import PaymentsPage from "./Pages/PaymentsPage";
import GradesPage from "./Pages/GradesPage";

function App() {
  const { isLoggedIn } = useContext(AppContext);

  if (isLoggedIn) {
    return (
      <div className="wrapper">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/courses" exact element={<CoursesPage />} />
            <Route path="/enrollments" exact element={<EnrollmentsPage />} />
            <Route path="/payments" exact element={<PaymentsPage />} />
            <Route path="/grades" exact element={<GradesPage />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    return <LoginPage />;
  }
}

export default App;
