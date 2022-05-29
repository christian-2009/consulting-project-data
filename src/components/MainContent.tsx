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
  const [searchTerm, setSearchTerm] = useState<string>('')
  // const [loading, setLoading] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [projectPerPage, setProjectPerPage] = useState(10)
  const [clients, setClients] = useState<ClientInterface[]>([])
  const [projectsWithClientName, setProjectsWithClientName] =useState<ProjectInterface[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectInterface[]>([])
  const [toggle, setToggle] = useState<boolean>(true)

  useEffect(() => {
     const fetchData = async () => {
        const projectData = await axios.get('https://consulting-projects.academy-faculty.repl.co/api/projects')
        const projectDataToSet = await projectData.data
        setProjects(projectDataToSet)
        const clientData = await axios.get('https://consulting-projects.academy-faculty.repl.co/api/clients')
        const clientDataToSet = await clientData.data
        setClients(clientDataToSet)
        setProjectsWithClientName(getProjectClientName(projectDataToSet,clientDataToSet))
    }
    fetchData()
    console.log('this is projects', projects, 'this is clients', clients)
  },[])

  const handleSearch = () => {
    setFilteredProjects(projectsWithClientName.filter((project) => 
      typeof project.client !== 'undefined' && project.client.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }

  const handleEnter = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      handleSearch()
    }
  }

  console.log('this is projects outsdie useffect', projects, 'this is clients outsdie useffect', clients)
  
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
      {filteredProjects.length === 0 ? 
       projectsWithClientName.map((project) => {
        return (
          <div key={project.id}>
            <h3>{project.client}</h3>
            <h4>{project.contract.startDate}</h4>
            <h4>{project.contract.endDate}</h4>
            <br></br>
          </div>
        )
      }) :
      filteredProjects.map((project) => {
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
