import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import Employee from "./components/Employee";
import ClientInfo from "./components/ClientInfo";
import "./stylesheet.css";

function App(): JSX.Element {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/employees/:employeeId" element={<Employee />} />
          <Route path="/clients/:clientId" element={<ClientInfo />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
