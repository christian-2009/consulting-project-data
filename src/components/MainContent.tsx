import React, { useState } from "react";
import { IndividualProjects } from "./IndividualProjects";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  displayId?: number;
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
  const [toggleSortDate, setToggleSortDate] = useState<boolean>(false);
  const [toggleSortSize, setToggleSortSize] = useState<boolean>(false);

  //toggles the sort by ascending and descending
  function handleSortByDate() {
    if (toggleSortDate === true) {
      props.data.sort((a, b) => {
        const date1 = new Date(a.contract.endDate).valueOf();
        const date2 = new Date(b.contract.endDate).valueOf();
        return date2 - date1;
      });
      setToggleSortDate(!toggleSortDate);
    } else if (toggleSortDate === false) {
      props.data.sort((a, b) => {
        const date1 = new Date(a.contract.endDate).valueOf();
        const date2 = new Date(b.contract.endDate).valueOf();
        return date1 - date2;
      });

      setToggleSortDate(!toggleSortDate);
    }
  }
  //sorting the size of the projects
  function handleSortBySize() {
    if (toggleSortSize === true) {
      props.data.sort((a, b) => {
        if (parseInt(a.contract.size) > parseInt(b.contract.size)) {
          return 1;
        } else if (parseInt(a.contract.size) < parseInt(b.contract.size)) {
          return -1;
        } else return 0;
      });
      setToggleSortSize(!toggleSortSize);
    } else {
      props.data.sort((a, b) => {
        if (parseInt(a.contract.size) > parseInt(b.contract.size)) {
          return -1;
        } else if (parseInt(a.contract.size) < parseInt(b.contract.size)) {
          return 1;
        } else return 0;
      });
      setToggleSortSize(!toggleSortSize);
    }
  }

  //filter the array of projects based on client, employees who worked on it, date started, date ended and size
  const filtered = props.data.filter(
    (project) =>
      (typeof project.client !== "undefined" &&
        project.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      checkEmployeeOnProject(project.employeeIds) ||
      days[new Date(project.contract.startDate).getDay()].includes(
        searchTerm.toLowerCase()
      ) ||
      days[new Date(project.contract.endDate).getDay()].includes(
        searchTerm.toLowerCase()
      ) ||
      months[new Date(project.contract.startDate).getMonth()]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      months[new Date(project.contract.endDate).getMonth()]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.contract.startDate.includes(searchTerm) ||
      project.contract.endDate.includes(searchTerm) ||
      project.contract.size.includes(searchTerm)
  );

  //used to filter whether the employee is on the project
  function checkEmployeeOnProject(array: string[]) {
    for (const employee of array) {
      if (employee.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  }

  //getting total revenue
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
        <button onClick={handleSortBySize}>Sort by contract size</button>
        <h3>Aggregate Consultancy Project Revenue: £{revenue}</h3>
        <IndividualProjects projects={filtered} />
      </div>
    </>
  );
}
