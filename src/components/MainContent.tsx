import axios from 'axios'
import React, {useState, useEffect} from 'react';

interface ProjectInterface {
    id: string;
    clientId: string;
    employeeIds : [];
    contract: {
        startDate: string;
        endDate: string;
        size: string;
    }
}

export default function MainContent(): JSX.Element {
    const [projects, setProjects] = useState<ProjectInterface[]>([])
  const employeeId = 4;
  const clientId = 3;
  return (
    <>
      <a href={`http://localhost:3000/ + employees/ + ${employeeId}  `}>Employee</a>
      <br />
      <a href={`http://localhost:3000/ + clients/ + ${clientId}  `}>Client</a>
      <h1>Main</h1>
    </>
  ); 
}
