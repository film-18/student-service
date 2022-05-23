
import { useCallback, useMemo } from "react";
import { Button } from 'antd';
export const RequestList = ({request}) => {

    const setStatusColor = useMemo(
        () => {
            if (request.status == "เสร็จสิ้น"){
                return (
                    <div className="request-list-status bg-success text-white">{request.status}</div>
                )
            }
            else if (request.status == "ปฏิเสธ"){
                return (
                    <div className="request-list-status bg-danger text-white">{request.status}</div>
                    // <Button danger>{request.status}</Button>
                    
                )
            }
            else{
                return (
                    <div className="request-list-status bg-warning " >{request.status}</div>
                )
            }
        },
        []
    )

    return (
        <div className="request-list-item">
            <div className="request-list-title">{request.title}</div>
            {setStatusColor}
            {/* <Button danger>Danger Default</Button> */}
        </div>
    )
}