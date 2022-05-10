import { useParams } from "react-router-dom"

export const LeaveRequest = () => {
    const { type } = useParams()
    return (
        <div>Hi Leave {type}</div>
    )
}