import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import getProjectClientName from "../utils/getProjectClientName";
import { IndividualProjects } from "./IndividualProjects";

export interface ProjectInterface {
  id: string;
  clientId: string;
  employeeIds: string[];
  contract: {
    startDate: string;
    endDate: string;
    size: string;
  };
  client?: string;
}

export interface ClientInterface {
  id: string;
  name: string;
}

export interface EmployeeInterface {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

enum ACTION {
  GET_PROJECTS = "getProjects",
  GET_CLIENTS = "getClients",
  GET_EMPLOYEES = "getEmployees",
}

interface ActionInterface {
  type: ACTION;
  payload: EmployeeInterface[] | ClientInterface[] | ProjectInterface[];
}

// interface StateInterface {
//   projects: any[];
//   clients: any[];
//   employees: any[]
// }

//eslint-disable-next-line
const reducer = (state: any, action: ActionInterface) => {
  switch (action.type) {
    case ACTION.GET_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case ACTION.GET_CLIENTS:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case ACTION.GET_EMPLOYEES:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    default:
      throw new Error();
  }
};

export default function MainContent(): JSX.Element {
  //eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, {
    projects: [],
    clients: [],
    employees: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [projectsWithClientsAndEmployees, setProjectsWithClientsAndEmployees] =
    useState<ProjectInterface[]>([]);
  const [toggleSort, setToggleSort] = useState<boolean>(true);

  //getting client, employee and project data and combining them
  useEffect(() => {
    const fetchData = async () => {
      const projectData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/projects"
      );
      const projectDataToSet: ProjectInterface[] = await projectData.data;
      dispatch({
        type: ACTION.GET_PROJECTS,
        payload: projectDataToSet,
      });
      const clientData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/clients"
      );
      const clientDataToSet: ClientInterface[] = await clientData.data;
      dispatch({
        type: ACTION.GET_CLIENTS,
        payload: clientDataToSet,
      });
      const employeeData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/employees"
      );
      const employeeDataToSet = await employeeData.data;
      dispatch({
        type: ACTION.GET_EMPLOYEES,
        payload: employeeDataToSet,
      });
      setProjectsWithClientsAndEmployees(
        getProjectClientName(
          projectDataToSet,
          clientDataToSet,
          employeeDataToSet
        )
      );
    };
    fetchData();
  }, []);

  //filter the array of projects based on client and employees who worked on it
  const filtered = projectsWithClientsAndEmployees.filter(
    (project) =>
      (typeof project.client !== "undefined" &&
        project.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      checkEmployeeOnProject(project.employeeIds)
  );

  //used to filter whether the employee is on the project
  function checkEmployeeOnProject(array: string[]) {
    for (const employee of array) {
      if (employee.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  }

  //toggles the sort by ascending and descending
  function handleSortByDate() {
    if (toggleSort === true) {
      setProjectsWithClientsAndEmployees(
        filtered.sort((a, b) => {
          const date1 = new Date(a.contract.endDate).valueOf();
          const date2 = new Date(b.contract.endDate).valueOf();
          return date2 - date1;
        })
      );
      setToggleSort(!toggleSort);
    } else if (toggleSort === false) {
      setProjectsWithClientsAndEmployees(
        filtered.sort((a, b) => {
          const date1 = new Date(a.contract.endDate).valueOf();
          const date2 = new Date(b.contract.endDate).valueOf();
          return date1 - date2;
        })
      );
      setToggleSort(!toggleSort);
    }
  }

  return (
    <>
      <div className="main-dashboard">
        <h1 className="title">Dashboard</h1>

        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="search projects..."
          value={searchTerm}
        ></input>
        <button onClick={handleSortByDate}>Toggle Sort By Date</button>
        <IndividualProjects projects={filtered} />
      </div>
    </>
  );
}
