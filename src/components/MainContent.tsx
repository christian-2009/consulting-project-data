import React, { useState } from "react";
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

interface MainContentInterface {
  data: ProjectInterface[];
}

export default function MainContent(props: MainContentInterface): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toggleSort, setToggleSort] = useState<boolean>(false);

  //toggles the sort by ascending and descending
  function handleSortByDate() {
    if (toggleSort === true) {
      props.data.sort((a, b) => {
        const date1 = new Date(a.contract.endDate).valueOf();
        const date2 = new Date(b.contract.endDate).valueOf();
        return date2 - date1;
      });
      setToggleSort(!toggleSort);
    } else if (toggleSort === false) {
      props.data.sort((a, b) => {
        const date1 = new Date(a.contract.endDate).valueOf();
        const date2 = new Date(b.contract.endDate).valueOf();
        return date1 - date2;
      });

      setToggleSort(!toggleSort);
    }
  }

  //filter the array of projects based on client and employees who worked on it
  const filtered = props.data.filter(
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

  let revenue = 0;
  for (const project of props.data) {
    revenue += parseInt(project.contract.size);
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
        <h3>Aggregate consultancy project revenue: £{revenue}</h3>
        <IndividualProjects projects={filtered} />
      </div>
    </>
  );
}
