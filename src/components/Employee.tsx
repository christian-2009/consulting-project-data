import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { EmployeeInterface } from "./MainContent";

const ACTION = {
  GET_NAME: "getName",
  GET_ROLE: "getRole",
  GET_AVATAR: "getAvatar",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION.GET_NAME:
      return { ...state, name: action.payload.name };
    case ACTION.GET_ROLE:
      return { ...state, role: action.payload.role };
    case ACTION.GET_AVATAR:
      return { ...state, avatar: action.payload.avatar };
    default:
      throw new Error();
  }
};

export default function Employee(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    role: "",
    avatar: "",
  });
  const { employeeId } = useParams();

  //fetch the employee data
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeData = await axios.get(
        `https://consulting-projects.academy-faculty.repl.co/api/employees/${employeeId}`
      );
      const employeeDataToSet: EmployeeInterface = await employeeData.data;
      console.log(employeeDataToSet);
      dispatch({ type: ACTION.GET_ROLE, payload: employeeDataToSet });
      dispatch({ type: ACTION.GET_NAME, payload: employeeDataToSet });
      dispatch({ type: ACTION.GET_AVATAR, payload: employeeDataToSet });
    };
    fetchEmployeeData();
  }, []);

  console.log(
    "name:",
    state.name,
    " role:",
    state.role,
    " avatar:",
    state.avatar
  );
  return (
    <>
      <div className="body">
        <h1>{state.name}</h1>
        <h3>Role: {state.role}</h3>
        <img src={state.avatar} />
      </div>
    </>
  );
}
