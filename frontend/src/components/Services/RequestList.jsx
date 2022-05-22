import { useCallback, useMemo } from "react";

export const RequestList = ({request}) => {

    const setStatusColor = useMemo(
        () => {
            if (request.status == "เสร็จสิ้น"){
                return (
                    <div className="request-list-status approved">{request.status}</div>
                )
            }
            else if (request.status == "ปฏิเสธ"){
                return (
                    <div className="request-list-status rejected">{request.status}</div>
                )
            }
            else{
                return (
                    <div className="request-list-status warning">{request.status}</div>
                )
            }
        },
        []
    )

    return (
        <div className="request-list-item">
            <div className="request-list-title">{request.title}</div>
            {setStatusColor}
        </div>
    )
}