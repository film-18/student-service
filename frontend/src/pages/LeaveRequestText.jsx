import { useState, useEffect, useMemo } from 'react'
import { useParams } from "react-router-dom"

import stdsData from '../data/students.json'
import reqData from '../data/requestItems.json'
import { gql, useQuery } from '@apollo/client';
import { Avatar, List, Space, Divider, Image, Button } from 'antd';
import { useApp } from "../contexts/AccountContext"

const REQUEST_QUERY = gql`
query ($id: MongoID!) {
    leaveRequestId (_id: $id) {
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
      teacherName
      updatedAt
      createdAt
      teacherList {
        subjectId
        subjectName
        teacherName
        teacherComment
        teacherStatus
        teacherDate
      }
    }
  }
`;

export const LeaveRequestText = () => {
    const { id } = useParams()
    const { user2 } = useApp()

    const { data: requestData } = useQuery(REQUEST_QUERY, {
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

    useEffect(() => {
        // setuserRole(user2)
        console.log(user2?.role)
    }, [user2])

    const convertDate = (date) => {
        if (requestData) {
            const monthName = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
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
    const createReq = useMemo(
        () => {
            return convertDate(requestData?.leaveRequestId?.createdAt.split("T")[0].split("-"))
        },
        [requestData]
    )
    const leaveType = useMemo(
        () => {
            if (requestData?.leaveRequestId?.leaveType === "Business") {
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
                <div className='row'>
                    <div className='col-2 mx-5 mt-1'>
                        <img src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/cropped-it-logo.png" width="50%" />
                    </div>
                    <div className='col-6 text-center'>
                        <h3 className='text-center mt-4'>แบบฟอร์มใบลาเรียนของนักศึกษา</h3>
                    </div>
                    {/* <div className='col-2'>
                    </div> */}
                </div>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <div>คณะเทคโนโลยีสารสนเทศ</div>
                        <div>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</div>
                        <div>
                            วันที่ {createReq ? createReq[0] : ""} เดือน {createReq ? createReq[1] : ""} พ.ศ. {parseInt(createReq ? createReq[2] : 0)}
                        </div>
                    </div>
                </div>
                <div className='request-form-title mt-4'>
                    <b>เรื่อง : </b>
                    {requestData?.generalRequestId?.title}
                    &nbsp;ขอลา {leaveType}
                    &nbsp;
                </div>
                <div><b>เรียน : </b>อาจารย์ประจำวิชา (ผ่านอาจารย์ที่ปรึกษา)</div>
                <div className='mt-4'>
                    &emsp;&emsp;&emsp;&emsp;ข้าพเจ้า {request?.fullname}
                    &nbsp;รหัสนักศึกษา {request?.studentId}
                    &nbsp;ชั้นปีที่ {request?.year}
                    &nbsp;สาขาวิชา {request?.program}
                    &nbsp;{
                        request?.major != "-" ?
                            "แขนงวิชา " + request?.major :
                            ""
                    }
                    &nbsp;ระดับ{request?.degree}
                    &nbsp;ภาคการศึกษาที่ {request?.semester}
                    &nbsp;ปีการศึกษา {request?.school_year}

                </div>
                <div className='mt-2'>
                    &emsp;&emsp;&emsp;&emsp;มีความประสงค์ {request?.description} โดยได้แนบเอกสารดังนี้
                </div>
                <div className='mt-2'>
                    &emsp;&emsp;&emsp;&emsp; {request?.file}
                </div>
                <div className='mt-2'>
                    &emsp; จึงขอลาเรียนตั้งแต่วันที่ {dateStart ? dateStart[0] : ""} เดือน {dateStart ? dateStart[1] : ""} พ.ศ. {parseInt(dateStart ? dateStart[2] : 0)}
                    &emsp;ถึง วันที่ {dateEnd ? dateEnd[0] : ""} เดือน {dateEnd ? dateEnd[1] : ""} พ.ศ. {parseInt(dateEnd ? dateEnd[2] : 0)}
                    {/* &emsp;รวมเป็นเวลา */}
                    &emsp;เมื่อครบกำหนดกำหนดแล้วข้าพเจ้าจะมาเรียนตามปกติและขอรับรองว่าเป็นความจรริงทุกประการ <th>(หากข้อความข้างต้นเป็นเท็จข้าพเจ้าขอยอมรับผิดตามที่คณะเทคโนโลยีสารสนเทศ สจล. เห็นสมควร)</th>
                </div>
                <div className='mt-2'>
                    &emsp;&emsp;&emsp;&emsp; จึงเรียนมาเพื่อโปรดพิจารณา
                </div>
                <div className='request-form-sign mt-4 d-flex justify-content-around'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className='text-center'>
                        <div>ขอแสดงความนับถือ</div>
                        <div>{request?.fullname}</div>
                        <div>({request?.fullname})</div>
                        <div>นักศึกษา</div>
                    </div>
                </div>
                <div className='request-form-sign mt-4 d-flex row'>
                    <div className='col-6 text-center mt-4 '>
                        <div>ขอแสดงความนับถือ</div>
                        <div>{request?.parent}</div>
                        <div>({request?.parent})</div>
                        <div>ผู้ปกครอง</div>
                    </div>
                    <div className='col-6 text-center mt-4'>
                        <div>ขอแสดงความนับถือ</div>
                        <div>{request?.teacherName}</div>
                        <div>({request?.teacherName})</div>
                        <div>อาจาร์ยที่ปรึกษา</div>
                    </div>
                </div>
                <div className='request-form-table leave' style={{ width: "auto"}}>
                    <table>
                        <thead>
                            
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>อาจารย์ผู้สอน</th>
                            <th>คำสั่ง</th>
                            <th>วัน / เดือน / ปี</th>
                            <th>หมายเหตุ</th>
                        </thead>
                        <tbody>
                            {
                                request?.teacherList.map((l) => (
                                    <tr>
                                        <td>{l.subjectId}</td>
                                        <td>{l.subjectName}</td>
                                        <td>{l.teacherName}</td>
                                        <td>{l.teacherStatus !== "_" ? l.teacherStatus : ""}</td>
                                        <td>{l.teacherDate ?? ""}</td>
                                        <td>{l.teacherComment !== "-" ? l.teacherComment : ""}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {/* <div className='row mt-2' >
                {user2?.role === "teacher" ? (
                    <div className="col teacher-request">
                        <RequestHeader text="สำหรับอาจารย์" />
                        <RequestInput text="ความคิดเห็น" />
                        <RequestInput text="วันที่" type="date" />
                        <div className='mt-3 text-end'>
                            <button onClick={updateRequest("teacher", "approved")} className="btn btn-success btn-approve">อนุญาต</button>
                            <button onClick={updateRequest("teacher", "rejected")} className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                        </div>
                    </div>
                ) : (
                    <p></p>
                )}

                {user2?.role === "staff" ? (
                    <div className="col staff-request">
                        <RequestHeader text="สำหรับเจ้าหน้าที่" />
                        <RequestInput text="ความคิดเห็น" />
                        <RequestInput text="วันที่" type="date" />
                        <div className='mt-3 text-end'>
                            <button onClick={updateRequest("staff", "approved")} className="btn btn-success btn-approve">อนุญาต</button>
                            <button onClick={updateRequest("staff", "rejected")} className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                        </div>
                    </div>
                ) : (
                    <p></p>
                )}

                {user2?.role === "dean" ? (
                    <div className="col dean-request">
                    <RequestHeader text="สำหรับคณบดี" />
                    <RequestInput text="ความคิดเห็น" />
                    <RequestInput text="วันที่" type="date" />
                    <div className='mt-3 text-end'>
                        <button onClick={updateRequest("dean", "approved")} className="btn btn-success btn-approve">อนุญาต</button>
                        <button onClick={updateRequest("dean", "rejected")} className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                    </div>
                </div>
                ) : (
                    <p></p>
                )}

            </div> */}
            </div>
        </div>
        // </Link>
    )
}