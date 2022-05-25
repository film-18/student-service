
import { useCallback, useMemo } from "react";
import { Button } from 'antd';

// import GeneralRequestText from '../../pages/GeneralRequestText';
import { Link } from "react-router-dom";

let status_name = {
    "teacher_pending": "อาจารย์กำลังดำเนินการ",
    "staff_pending": "เจ้าหน้าที่กำลังดำเนินการ",
    "dean_pending": "คณบดีกำลังดำเนินการ",
    "approved": "เสร็จสิ้น",
    "rejected": "ปฏิเสธ",
    "_": "ไม่มีสถานะ"
}


export const RequestList = ({ request }) => {
    const path = useMemo(
        () => {
            if (request.__typename === "GeneralRequest"){
                return `/service/general-request/${request._id}`
            }
            else {
                if (request.leaveType === "Business"){
                    return `/service/leave-request/personal/${request._id}`
                }
                else{
                    return `/service/leave-request/sick/${request._id}`
                }
            }
        },
        []
    )
    const setStatusColor = useMemo(
        () => {
            if (request.status == "approved") {
                return (
                    <div className="request-list-status bg-success text-white">{status_name[request.status]}</div>
                )
            }
            else if (request.status == "rejected") {
                return (
                    <div className="request-list-status bg-danger text-white">{status_name[request.status]}</div>
                    // <Button danger>{request.status}</Button>

                )
            }
            else if (request.status == "_") {
                return (
                    <div className="request-list-status bg-secondary text-white">{status_name[request.status]}</div>
                    // <Button danger>{request.status}</Button>

                )
            }
            else {
                return (
                    <div className="request-list-status bg-warning " >{status_name[request.status]}</div>
                )
            }
        },
        []
    )

    return (
        <Link to={path} className="text-black">

            <div className="request-list-item" >
                <div className="request-list-title">{request.title}</div>
                {request.updatedAt}
                {setStatusColor}
                {/* <Link to={`service/general-request/${request._id}`} className="text-decoration-none text-black">
                <GeneralRequestText generalRequest={request._id}/>
            </Link> */}

            </div>
        </Link>

    )
}
