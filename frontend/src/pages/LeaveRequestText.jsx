import { useState, useEffect, useMemo } from 'react'
import { useParams } from "react-router-dom"

import stdsData from '../data/students.json'
import reqData from '../data/requestItems.json'
import { gql, useQuery } from '@apollo/client';

const REQUEST_QUERY = gql`
query ($id: MongoID!) {
    leaveRequestId (_id: $id) {
      title
      leaveType
      studentId
      fullname
      program
      major
      degree
      year
      semester
      school_year
      description
      startDate
      endDate
      parent
      file
      _id
    }
  }
`;

export const LeaveRequestText = () => {
    const { id } = useParams()

    const {data: requestData} = useQuery(REQUEST_QUERY, {
        variables: {
            "id": id
        }
    })
    
    const [request, setRequest] = useState()
    
    useEffect(
        () => {
            setRequest(requestData?.leaveRequestId)
        },
        [requestData, setRequest]
    )

    const convertDate = (date) => {
        if (requestData) {
            const monthName = ["มกราคม", "กุมภาพันธ์", "มีนาคม","เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
            return [date[2], monthName[parseInt(date[1])], parseInt(date[0]) + 543]
        }
    }
    const dateStart = useMemo(
        () => {
            return convertDate(requestData?.leaveRequestId?.startDate.split("T")[0].split("-"))
        },
        [requestData]
    )
    const dateEnd = useMemo(
        () => {
            return convertDate(requestData?.leaveRequestId?.endDate.split("T")[0].split("-"))
        },
        [requestData]
    )
    const leaveType = useMemo(
        () => {
            if (requestData?.leaveRequestId?.leaveType === "Business"){
                return "ลากิจ"
            }
            else {
                return "ลาป่วย"
            }
        },
        [requestData]
    )
    
    // useEffect(
    //     () => {
    //         const req = reqData.find(req => req.req_id == id)
    //         setRequest(req);
    //         if (req){
    //             const std = stdsData.find(std => std.std_id == req.std_id)
    //             setStudent(std); 
    //         }
    //     if (requestData){
    //     }
    //     }, [requestData, setStudent]
    // )
    
    return (
        <div className="container pb-5 pt-4">
            <div className="request-form">
                <h3 className='text-center mt-5'>แบบฟอร์มใบลาเรียนของนักศึกษา</h3>
                <div>{request?.title}</div>
                {/* <div className='d-flex justify-content-between'>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <div>คณะเทคโนโลยีสารสนเทศ</div>
                        <div>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</div>
                        <div>
                            วันที่ {dateRequest ? dateRequest[0] : ""} เดือน {dateRequest ? dateRequest[1] : ""} พ.ศ. {parseInt(dateRequest ? dateRequest[2] : 0) +  543}

                        </div>
                    </div>
                </div>
                <div className='request-form-title mt-4'>
                    <b>เรื่อง : </b>
                    {requestData?.generalRequestId?.title} 
                    &nbsp;ภาคการศึกษาที่ {requestData?.generalRequestId?.semester}
                    &nbsp;ปีการศึกษา {requestData?.generalRequestId?.school_year}
                    </div>
                <div><b>เรียน : </b>คณบดีคณะเทคโนโลยีสารสนเทศ</div>
                <div className='mt-4'>
                    &emsp;&emsp;&emsp;&emsp;ข้าพเจ้า {requestData?.generalRequestId?.fullname}
                    &nbsp;รหัสนักศึกษา {requestData?.generalRequestId?.studentID}
                    &nbsp;ชั้นปีที่ {requestData?.generalRequestId?.year}
                    &nbsp;สาขาวิชา {requestData?.generalRequestId?.program}
                    &nbsp;{
                        requestData?.generalRequestId?.major != "-" ?
                        "แขนงวิชา " + requestData?.generalRequestId?.major :
                        ""
                    }
                </div>
                <div className='mt-4'>
                    &emsp;&emsp;&emsp;&emsp;มีความประสงค์ {requestData?.generalRequestId?.description}
                </div>
                <div className='mt-4'>&emsp;&emsp;&emsp;&emsp;จึงเรียนมาเพื่อโปรดพิจารณาและดำเนินการต่อไปด้วย</div>
                <div className='request-form-sign mt-4 d-flex justify-content-around'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className='text-center'>
                        <div>ขอแสดงความนับถือ</div>
                        <div>{requestData?.generalRequestId?.fullname}</div>
                        <div>({requestData?.generalRequestId?.fullname})</div>
                        <div>ผู้ยื่นคำร้อง</div>
                    </div>
                </div>
                <div className='request-form-table'>
                    <table>
                        <thead>
                            <th>ความเห็นอาจารย์ที่ปรึกษา/อาจารย์ผู้สอน</th>
                            <th>ความเห็นเจ้าหน้าที่</th>
                            <th>คำสั่ง</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{requestData?.generalRequestId?.teacherComment === "-" ? "" : requestData?.generalRequestId?.teacherComment}</td>
                                <td>{requestData?.generalRequestId?.staffComment === "-" ? "" : requestData?.generalRequestId?.staffComment}</td>
                                <td>{requestData?.generalRequestId?.deanComment === "-" ? "" : requestData?.generalRequestId?.deanComment}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>หมายเหตุ กรณีขอเปิดวิชาเรียนภายในคณะ ต้องผ่านการพิจารณาจากอาจารย์ผู้สอนประจำวิชา</div>
                <div className='mt-4'>ผู้ยื่นคำร้อง รับทราบคำร้อง</div>
                <div className='request-form-sign mt-4 d-flex justify-content-around'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className='text-center'>
                        <div>ลงชื่อ {requestData?.generalRequestId?.fullname}</div>
                        <div>({requestData?.generalRequestId?.fullname})</div>
                    </div>
                </div> */}
            </div>
        </div>
        // </Link>
    )
}