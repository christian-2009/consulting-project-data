import {
  ProjectInterface,
  ClientInterface,
  EmployeeInterface,
} from "../components/MainContent";

export default function getProjectClientName(
  projects: ProjectInterface[],
  clients: ClientInterface[],
  employees: EmployeeInterface[]
): ProjectInterface[] {
  const projectsClone = projects;

  for (const projectObj of projectsClone) {
    for (const clientObj of clients) {
      if (projectObj.clientId === clientObj.id) {
        projectObj.client = clientObj.name;
      }
    }
  }
  for (const projectObj of projectsClone) {
    for (const employeeObj of employees) {
      if (projectObj.employeeIds.indexOf(employeeObj.id) !== -1) {
        const indexOfEmployee = projectObj.employeeIds.indexOf(employeeObj.id);
        projectObj.employeeIds[indexOfEmployee] += "/" + employeeObj.name;
      }
    }
  }
  return projectsClone;
}
