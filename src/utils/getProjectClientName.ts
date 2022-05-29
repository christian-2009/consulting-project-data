import { ProjectInterface, ClientInterface } from "../components/MainContent"

export default function getProjectClientName(projects: ProjectInterface[], clients: ClientInterface[]): ProjectInterface[]{
    const projectsClone = projects
    
    for (const projectObj of projectsClone){
      for(const clientObj of clients){
        if (projectObj.clientId == clientObj.id){
          projectObj.client = clientObj.name
        }
      }
    }return projectsClone
  }