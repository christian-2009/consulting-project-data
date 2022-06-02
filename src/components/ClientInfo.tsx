import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ProjectInterface } from "./MainContent";
import axios from "axios";

interface ClientInfoInterface {
  data: ProjectInterface[];
}

interface ClientInterface {
  id: string;
  name: string;
}

enum ACTION {
  GET_CLIENT = "getClient",
}

interface StateInterface {
  client: ClientInterface;
}

interface ActionInterface {
  type: ACTION;
  payload: ClientInterface;
}

const reducer = (
  state: StateInterface,
  action: ActionInterface
): StateInterface => {
  switch (action.type) {
    case ACTION.GET_CLIENT:
      return { ...state, client: action.payload };
  }
};

export default function ClientInfo(props: ClientInfoInterface): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    client: { id: "", name: "" },
  });
  const { clientId } = useParams();

  useEffect(() => {
    const fetchClientData = async () => {
      const individualClientData = await axios.get(
        `https://consulting-projects.academy-faculty.repl.co/api/clients/${clientId}`
      );
      const individualClientDataToSet = individualClientData.data;
      dispatch({ type: ACTION.GET_CLIENT, payload: individualClientDataToSet });
    };
    fetchClientData();
    //eslint-disable-next-line
  }, []);

  console.log(state);

  //finding what projects the client has worked on
  const projectsForClient: ProjectInterface[] = [];
  for (const project of props.data) {
    if (project.clientId === clientId) {
      projectsForClient.push(project);
    }
  }

  //finding what employees have worked on the projects
  const employeesForClient: string[] = []
  for (const project of projectsForClient){
    for (const employees of project.employeeIds){
      const currentEmployee = employees.split('/')[1]
      if(!employeesForClient.includes(currentEmployee)){
        employeesForClient.push(currentEmployee)
      }
    }
  }


  return (
    <>
      <div className = 'client-page'>
      <h1 className="title">{state.client.name}</h1>
      <div className = 'client-page--container'>
      <h2>Projects Completed</h2>
      {projectsForClient.map((project) => (
        <div key = {project.id}>
          <h3>Project {projectsForClient.length - projectsForClient.indexOf(project)}</h3>
          <p>{project.contract.startDate} - {project.contract.endDate}</p>
        </div>
      )
      )}
      <div className ='client-page--list-container'>
      <h3>Employees who have worked with {state.client.name} </h3>
      <ul className = 'client-page--list'>
      {employeesForClient.map((employee) => (
        <div key={employee}>
          <li>{employee}</li>
        </div>
      )

      )}
      </ul>
      </div>
      </div>
      </div>
    </>
  );
}
