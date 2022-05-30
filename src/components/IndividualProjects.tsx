interface IndividualProjectInterface {
  
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

export function IndividualProjects(props : {projects: IndividualProjectInterface[]}): JSX.Element {
  return (
    <>
    {props.projects.map((project) => 
       (
        <div key={project.id}>
          <h3>{project.client}</h3>
          <h4>{project.contract.startDate}</h4>
          <h4>{project.contract.endDate}</h4>
          <div>
            {project.employeeIds.map((employee) => ( 
              <p key = {employee}>{employee}</p>
            ))}
          </div>
          <br></br>
        </div>
      ))
    }
    </>
    
  )
}