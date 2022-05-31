interface IndividualProjectInterface {
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

export function IndividualProjects(props: {
  projects: IndividualProjectInterface[];
}): JSX.Element {
  return (
    <>
      {props.projects.map((project) => (
        <div key={project.id} className="individual-project">
          <h3>{project.client}</h3>
          <h4 className="individual-project--date">
            {project.contract.startDate}
          </h4>
          <h4 className="individual-project--date">
            {project.contract.endDate}
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
