import { ProjectInterface } from "./MainContent";

//component displays the individual projects
export function IndividualProjects(props: {
  projects: ProjectInterface[];
}): JSX.Element {
  return (
    <>
      {props.projects.map((project) => (
        <div key={project.id} className="individual-project">
          <a
            className="individual-project--client-names"
            href={`http://localhost:3000/clients/${project.clientId}`}
          >
            {project.client}
          </a>
          <h4 className="individual-project--date">
            {project.contract.endDate}
          </h4>
          <h4 className="individual-project--date">
            {project.contract.startDate}
          </h4>
          <div className="individual-project--employee-names-container">
            {project.employeeIds.map((employee) => (
              <div key={employee}>
                <a
                  className="individual-project--employee-names"
                  href={`http://localhost:3000/employees/${
                    employee.split("/")[0]
                  }`}
                >
                  {employee.split("/")[1]}
                </a>
              </div>
            ))}
          </div>
          <br></br>
        </div>
      ))}
    </>
  );
}
