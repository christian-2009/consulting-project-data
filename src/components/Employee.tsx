import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  EmployeeInterface,
  ProjectInterface,
  ClientInterface,
} from "./MainContent";

enum ACTION {
  GET_NAME = "getName",
  GET_ROLE = "getRole",
  GET_AVATAR = "getAvatar",
  GET_PROJECTS = "getProjects",
  GET_CLIENTS = "getClients",
}

// interface ActionInterface {
//   type: ACTION;
//   payload:
// }

//eslint-disable-next-line
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION.GET_NAME:
      return { ...state, name: action.payload.name };
    case ACTION.GET_ROLE:
      return { ...state, role: action.payload.role };
    case ACTION.GET_AVATAR:
      return { ...state, avatar: action.payload.avatar };
    case ACTION.GET_PROJECTS:
      return { ...state, projects: action.payload.projects };
    case ACTION.GET_CLIENTS:
      return { ...state, clients: action.payload.clients };
    default:
      throw new Error();
  }
};

//component displays the employee data
export default function Employee(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    role: "",
    avatar: "",
    projects: [],
    clients: [],
  });

  const { employeeId } = useParams();

  const definedEmployeeId = employeeId ? employeeId : "not an employee";

  //fetch the employee data
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeData = await axios.get(
        `https://consulting-projects.academy-faculty.repl.co/api/employees/${employeeId}`
      );
      const employeeDataToSet: EmployeeInterface = await employeeData.data;
      console.log(employeeDataToSet);
      dispatch({ type: ACTION.GET_ROLE, payload: employeeDataToSet });
      dispatch({ type: ACTION.GET_NAME, payload: employeeDataToSet });
      dispatch({ type: ACTION.GET_AVATAR, payload: employeeDataToSet });
      const projectData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/projects"
      );
      const projectDataToSet = await projectData.data;
      dispatch({
        type: ACTION.GET_PROJECTS,
        payload: { projects: projectDataToSet },
      });
      const clientData = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/clients"
      );
      const clientDataToSet = await clientData.data;
      dispatch({
        type: ACTION.GET_CLIENTS,
        payload: { clients: clientDataToSet },
      });
    };
    fetchEmployeeData();
    //eslint-disable-next-line
  }, []);

  //get you the projects worked on by employee with the client names
  function getProjectsEmployeeWorked(
    employee: string,
    projects: ProjectInterface[],
    clients: ClientInterface[]
  ) {
    const arrayOfProjects = [];
    console.log(projects[0]);
    for (const project of projects) {
      if (project.employeeIds.includes(employee)) {
        arrayOfProjects.push(project);
      }
    }

    console.log("this is array of projects", arrayOfProjects);
    for (const project of arrayOfProjects) {
      for (const client of clients) {
        console.log("this is project id", project.clientId);
        console.log("client", client);
        if (project.clientId === client.id) {
          console.log("hiya");
          project.client = client.name;
        }
      }
    }
    return arrayOfProjects;
  }

  const projectsEmployeeWorked = getProjectsEmployeeWorked(
    definedEmployeeId,
    state.projects,
    state.clients
  );
  console.log("final result", projectsEmployeeWorked);

  return (
    <>
      <div className="body">
        <div className="employee-page">
          <h1 className="title">{state.name}</h1>
          <div className="employee-page--container">
            <h3>Role: {state.role}</h3>
            <img
              className="employee-page--image"
              src={state.avatar}
              alt="employee avatar"
            />
            <p>Projects:</p>
            <ul className="employee-page--list">
              {projectsEmployeeWorked.map((project) => (
                <li className="employee-page--list-item" key={project.id}>
                  {project.client}:<br /> {project.contract.startDate} -{" "}
                  {project.contract.endDate} <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
