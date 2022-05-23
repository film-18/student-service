
import { useCallback, useMemo } from "react";
import { Button } from 'antd';

let status_name = {
  "teacher_pending" : "อาจารย์กำลังดำเนินการ",
  "staff_pending" : "เจ้าหน้าที่กำลังดำเนินการ",
  "dean_pending" : "คณบดีกำลังดำเนินการ",
  "approved" : "เสร็จสิ้น",
  "rejected" : "ปฏิเสธ",
  "_" : "ไม่มีสถานะ"
}

export const RequestList = ({request}) => {



    const setStatusColor = useMemo(
        () => {
            if (request.status == "approved"){
                return (
                    <div className="request-list-status bg-success text-white">{status_name[request.status]}</div>
                )
            }
            else if (request.status == "rejected"){
                return (
                    <div className="request-list-status bg-danger text-white">{status_name[request.status]}</div>
                    // <Button danger>{request.status}</Button>
                    
                )
            }
            else if (request.status == "_"){
                return (
                    <div className="request-list-status bg-secondary text-white">{status_name[request.status]}</div>
                    // <Button danger>{request.status}</Button>
                    
                )
            }
            else{
                return (
                    <div className="request-list-status bg-warning " >{status_name[request.status]}</div>
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