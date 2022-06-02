import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ProjectInterface } from "./MainContent";
import axios from 'axios'

interface ClientInfoInterface{
  data: ProjectInterface[]
}

interface ClientInterface {
  id: string;
  name: string
}

enum ACTION  {
  GET_CLIENT = 'getClient'
}

interface StateInterface {
  client : ClientInterface
}

interface ActionInterface {
  type: ACTION;
  payload: ClientInterface
}

const reducer = (state: StateInterface, action: ActionInterface): StateInterface => {
  switch(action.type){
    case ACTION.GET_CLIENT:
      return {...state, client: action.payload}
  }
}

export default function ClientInfo(props: ClientInfoInterface): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    client: {id: '', name: ''}
  })
  const { clientId } = useParams();

  useEffect(() => {
    const fetchClientData = async () => {
      const individualClientData = await axios.get(`https://consulting-projects.academy-faculty.repl.co/api/clients/${clientId}`)
      const individualClientDataToSet = individualClientData.data
      dispatch({type: ACTION.GET_CLIENT, payload: individualClientDataToSet})
    }
  fetchClientData()
  //eslint-disable-next-line
  }, [])

  console.log(state)

  const projectsForClient = []
  for (const project of props.data){
    if (project.clientId === clientId){
      projectsForClient.push(project)
    }
  }
  
  return (
    <>
      <h1 className = 'title'>{state.client.name}</h1>
      <h5>{clientId}</h5>
    </>
  );
}
