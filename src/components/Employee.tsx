import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  EmployeeInterface,
  ProjectInterface
} from "./MainContent";

enum ACTION {
  GET_EMPLOYEE = 'getEmployee'
}

interface ActionInterface {
  type: ACTION;
  payload: EmployeeInterface;
}

interface StateInterface {
  employee: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }
}

const reducer = (
  state: StateInterface,
  action: ActionInterface
): StateInterface => {
  switch (action.type) {
    case ACTION.GET_EMPLOYEE:
      return { ...state, employee: action.payload };

    default:
      throw new Error();
  }
};

interface EmployeeComponentInterface {
  data: ProjectInterface[]
}

//component displays the employee data
export default function Employee(
  props: EmployeeComponentInterface
): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    employee: {id: '', name: '', role: '', avatar: ''  }
  });

  const { employeeId } = useParams();
  const definedEmployeeId = employeeId ? employeeId : "not an employee";


  //get you the projects worked on by employee
  function getProjectsEmployeeWorked(
    definedEmployeeId: string,
    data: ProjectInterface[]
  ) {

    const arrayOfProjects = []
    for (const project of data) {
      for (const employee of project.employeeIds)
      if (employee.split('/')[0].includes(definedEmployeeId)) {
        arrayOfProjects.push(project);
      }
    }

    return arrayOfProjects;
  }

  //fetch the employee data
  useEffect(() => {

    const fetchEmployeeData = async () => {
      const employeeData = await axios.get(
        `https://consulting-projects.academy-faculty.repl.co/api/employees/${employeeId}`
      );
      const employeeDataToSet: EmployeeInterface = await employeeData.data;
      dispatch({ type: ACTION.GET_EMPLOYEE, payload: employeeDataToSet });

    };
    fetchEmployeeData();
    //eslint-disable-next-line
  }, []);

  const projectsEmployeeWorked = getProjectsEmployeeWorked(
    definedEmployeeId,
    props.data
  );
  console.log("this is array we want", projectsEmployeeWorked);

  return (
    <>
      <div className="body">
        <div className="employee-page">
          <h1 className="title">{state.employee.name}</h1>
          <div className="employee-page--container">
            <h3>Role: {state.employee.role}</h3>
            <img
              className="employee-page--image"
              src={state.employee.avatar}
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
