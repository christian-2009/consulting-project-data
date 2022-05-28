export default function MainContent(): JSX.Element {
  const employeeId = 4;
  const clientId = 3;
  return (
    <>
      <a href={`http://localhost:3000/ + employees/ + ${employeeId}  `}>
        Employee
      </a>
      <br />
      <a href={`http://localhost:3000/ + clients/ + ${clientId}  `}>Client</a>
      <h1>Main</h1>
    </>
  );
}
