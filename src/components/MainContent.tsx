import axios from 'axios'
import React, {useState, useEffect} from 'react';
import getProjectClientName from '../utils/getProjectClientName';

export interface ProjectInterface {
    id: string;
    clientId: string;
    employeeIds : [];
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


export default function MainContent(): JSX.Element {
  const [projects, setProjects] = useState<ProjectInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [projectPerPage, setProjectPerPage] = useState(10)
  const [clients, setClients] = useState<ClientInterface[]>([])
  const [projectsWithClientName, setProjectsWithClientName] =useState<ProjectInterface[]>([])



  useEffect(() => {
     const fetchProjectData = async () => {
        const projectData = await axios.get('https://consulting-projects.academy-faculty.repl.co/api/projects')
        setProjects(projectData.data)
    }
    const fetchClientData = async () => {
      const clientData = await axios.get('https://consulting-projects.academy-faculty.repl.co/api/clients')
      setClients(clientData.data)
    }
    fetchClientData()
    fetchProjectData()
    setProjectsWithClientName(getProjectClientName(projects,clients))
  }, [])


  


  console.log(projectsWithClientName)

  

 
  const employeeId = 4;
  const clientId = 3;
  return (
    <>
      <a href={`http://localhost:3000/ + employees/ + ${employeeId}  `}>Employee</a>
      <br />
      <a href={`http://localhost:3000/ + clients/ + ${clientId}  `}>Client</a>
      <h1>Main</h1>
      {projectsWithClientName.map((project) => {
        return (
          <div key={project.id}>
            <h3>{project.client}</h3>
            <h4>{project.contract.startDate}</h4>
            <h4>{project.contract.endDate}</h4>
            <br></br>
          </div>
        )
      })}
    </>
  ); 
}
