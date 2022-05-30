import axios from 'axios'
import React, {useState, useEffect, useReducer} from 'react';
import getProjectClientName from '../utils/getProjectClientName';
import { IndividualProjects } from './IndividualProjects';

export interface ProjectInterface {
    id: string;
    clientId: string;
    employeeIds : string[];
    contract: {
        startDate: string;
        endDate: string;
        size: string;
    }
    client?: string
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

const ACTION = {
  GET_PROJECTS: 'getProjects',
  GET_CLIENTS: 'getClients',
  GET_EMPLOYEES: 'getEmployees'
}

const reducer = (state: any,action: any) => {
  switch (action.type) {
    case ACTION.GET_PROJECTS:
      return {...state, projects: [...state.projects, action.payload.projectData]}
    case ACTION.GET_CLIENTS:
      return {...state, clients: [...state.clients, action.payload.clientData]}
    case ACTION.GET_EMPLOYEES:
      return {...state, employees: [...state.employees, action.payload.employeeData]}
    default:
      throw new Error()
  }
}


export default function MainContent(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {projects: [], clients: [], employees: []})
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [projectsWithClientsAndEmployees, setProjectsWithClientsAndEmployees] =useState<ProjectInterface[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectInterface[]>([])

  useEffect(() => {
     const fetchData = async () => {
        const projectData = await axios.get('https://consulting-projects.academy-faculty.repl.co/api/projects')
        const projectDataToSet = await projectData.data
        dispatch({type: ACTION.GET_PROJECTS, payload: {projectData: projectDataToSet}})
        const clientData = await axios.get('https://consulting-projects.academy-faculty.repl.co/api/clients')
        const clientDataToSet = await clientData.data
        dispatch({type: ACTION.GET_CLIENTS, payload: { clientData: clientDataToSet}})
        const employeeData = await axios.get('https://consulting-projects.academy-faculty.repl.co/api/employees')
        const employeeDataToSet = await employeeData.data
        dispatch({type: ACTION.GET_EMPLOYEES, payload: {employeeData: employeeDataToSet}})
        setProjectsWithClientsAndEmployees(getProjectClientName(projectDataToSet,clientDataToSet, employeeDataToSet))
    }
    fetchData()
    
  },[])

  const handleSearch = () => {
    setFilteredProjects(projectsWithClientsAndEmployees.filter((project) => 
      typeof project.client !== 'undefined' && project.client.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }

  const handleEnter = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      handleSearch()
    }
  }

  console.log('this is all projects with employee names and client names', projectsWithClientsAndEmployees)
  console.log('this is projects', state.projects, 'this is clients', state.clients, 'this is employees', state.employees)
  const employeeId = 4;
  const clientId = 3;
  return (
    <>
      <a href={`http://localhost:3000/ + employees/ + ${employeeId}  `}>Employee</a>
      <br />
      <a href={`http://localhost:3000/ + clients/ + ${clientId}  `}>Client</a>
      <h1>Main</h1>

      <input
        onChange={(e) => {setSearchTerm(e.target.value)}}
        onKeyDown={(e) => handleEnter(e)}
        type='text'
        placeholder='search projects...'
        value={searchTerm}
      ></input>
      {filteredProjects.length === 0 ? <IndividualProjects projects={projectsWithClientsAndEmployees} /> : 
      <IndividualProjects projects={filteredProjects} /> }
      
    </>
  ); 
}

