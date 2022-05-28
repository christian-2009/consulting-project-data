import { useParams } from "react-router-dom"

export default function ClientInfo(): JSX.Element {
    const {clientId} = useParams()
    console.log(clientId)
    return (
        <>
        <h1>Client</h1>
        <h5>{clientId}</h5>
        </>
    )
}