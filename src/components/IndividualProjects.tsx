import { ProjectInterface } from "./MainContent";
import { URL } from "../utils/URL";

//component displays the individual projects
export function IndividualProjects(props: {
  projects: ProjectInterface[];
}): JSX.Element {
  return (
    <>
      {props.projects.map((project) => (
        <div key={project.id} className="individual-project">
          <h2>Project {project.displayId && project.displayId}</h2>
          <a
            className="individual-project--client-names"
            href={`${URL}clients/${project.clientId}`}
          >
            {project.client}
          </a>
          <h4>Project size: {project.contract.size}</h4>
          <h4 className="individual-project--date">
            End date: {project.contract.endDate}
          </h4>
          <h4 className="individual-project--date">
            Start Date: {project.contract.startDate}
          </h4>
          <div className="individual-project--employee-names-container">
            <h4>Employees:</h4>
            {project.employeeIds.length > 0 ? (
              project.employeeIds.map((employee) => (
                <div key={employee}>
                  <a
                    className="individual-project--employee-names"
                    href={`${URL}employees/${employee.split("/")[0]}`}
                  >
                    {employee.split("/")[1]}
                  </a>
                </div>
              ))
            ) : (
              <p>No employees yet</p>
            )}
          </div>
          <br></br>
        </div>
      ))}
    </>
  );
}
