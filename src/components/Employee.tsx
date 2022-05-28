import { useParams } from "react-router-dom";

export default function Employee(): JSX.Element {
  const { employeeId } = useParams();
  console.log(employeeId);
  return (
    <>
      <h1>Employee</h1>
      <h3>{employeeId}</h3>
    </>
  );
}
