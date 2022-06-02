import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import Employee from "./components/Employee";
import ClientInfo from "./components/ClientInfo";
import "./stylesheet.css";
import { useReducer, useEffect } from "react";
import { ClientInterface, ProjectInterface } from "./components/MainContent";
import axios from "axios";
import getProjectClientNameAndEmployeeNames from "./utils/getProjectClientNameAndEmployeeNames";

enum ACTION {
  GET_DATA = "getData",
}

interface StateInterface {
  data: ProjectInterface[];
}

//NOTE may have to give reducer a return type

interface ActionInterface {
  type: ACTION;
  payload: ProjectInterface[];
}

const reducer = (
  state: StateInterface,
  action: ActionInterface
): StateInterface => {
  switch (action.type) {
    case ACTION.GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      throw new Error();
  }
};

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
  });

  //getting client, employee and project data and combining them
  useEffect(() => {
    const fetchData = async () => {
      const projectData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/projects"
      );
      const projectDataToSet: ProjectInterface[] = await projectData.data;
      const clientData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/clients"
      );
      const clientDataToSet: ClientInterface[] = await clientData.data;
      const employeeData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/employees"
      );
      const employeeDataToSet = await employeeData.data;

      const stitchedDataToSet = getProjectClientNameAndEmployeeNames(
        projectDataToSet,
        clientDataToSet,
        employeeDataToSet
      );
      dispatch({
        type: ACTION.GET_DATA,
        payload: stitchedDataToSet,
      });
    };

    fetchData();
  }, []);
  console.log("this is data", state.data);

  //sorting initial data
  const sortedData = state.data.sort((a, b) => {
    const date1 = new Date(a.contract.endDate).valueOf();
    const date2 = new Date(b.contract.endDate).valueOf();
    return date2 - date1;
  });

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<MainContent data={sortedData} />} />
          <Route
            path="/employees/:employeeId"
            element={<Employee data={state.data} />}
          />
          <Route
            path="/clients/:clientId"
            element={<ClientInfo data={state.data} />}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
