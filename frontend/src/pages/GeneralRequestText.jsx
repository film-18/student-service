import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { RequestHeader } from "../components/Services/RequestHeader"
import { RequestInput } from "../components/Services/RequestInput"

import stdsData from '../data/students.json'
import reqData from '../data/requestItems.json'
import { gql, useMutation, useQuery } from '@apollo/client';
import { useApp } from "../contexts/AccountContext"
import { Modal } from 'antd'

const REQUEST_QUERY = gql`
query ($gen_id: MongoID!) {
    generalRequestId (_id: $gen_id) {
        title
        teacherID
        studentIdMongo
        teacherName
        studentId
        semester
        description
        requestDate
        degree
        year
        school_year
        fullname
        program
        major
        teacherComment
        teacherDate
        staffComment
        staffDate
        deanComment
        deanDate
    }
}
`;

const TEACHER_COMMENT_MUTAION = gql`
mutation ($record: UpdateByIdGeneralRequestInput!, $id: MongoID!) {
    updateGeneralRequestId (_id: $id,record : $record) {
      record {
        teacherStatus
      }
    }
  }
`

const STAFF_COMMENT_MUTAION = gql`
mutation ($record: UpdateByIdGeneralRequestInput!, $id: MongoID!) {
    updateGeneralRequestId (_id: $id,record : $record) {
      record {
        staffStatus
      }
    }
  }
`

const DEAN_COMMENT_MUTAION = gql`
mutation ($record: UpdateByIdGeneralRequestInput!, $id: MongoID!) {
    updateGeneralRequestId (_id: $id,record : $record) {
      record {
        deanStatus
      }
    }
  }
`
const createNotification = gql`
  mutation ($record: CreateOneNotificationInput!) {
    createnotification(record: $record) {
      recordId
    }
  }
`;


export const GeneralRequestText = () => {
    const { id } = useParams()
    const { user2 } = useApp()
    const navigate = useNavigate()
    const [userRole, setuserRole] = useState(null)

    const { data: requestData, refetch: requestRefetch } = useQuery(REQUEST_QUERY, {
        variables: {
            "gen_id": id
        }
    })

    const [createNoti] = useMutation(createNotification)
    const [createTeacherCommentMutation] = useMutation(TEACHER_COMMENT_MUTAION)
    const [createStaffCommentMutation] = useMutation(STAFF_COMMENT_MUTAION)
    const [createDeanCommentMutation] = useMutation(DEAN_COMMENT_MUTAION)

    useEffect(() => {
        setuserRole(user2)
        console.log(user2?.role)
    }, [user2])

    const dateRequest = useMemo(
        () => { 
            if (requestData) {
                const date = requestData?.generalRequestId?.requestDate.split("T")[0].split("-")
                const monthName = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
                return [date[2], monthName[parseInt(date[1])], date[0]]
            }
        },
        [requestData]
    )

    const updateRequest = useCallback(
        (who, status) => async () => {
            const inputReqs = document.querySelectorAll(`.${who}-request :where(input.input-request, .input-request input)`)
            let statusNext;
            if (status === "rejected"){
                statusNext = "rejected"
            }
            try {
                if (who === "teacher") {
                    await createTeacherCommentMutation({
                        variables: {
                            id,
                            record : {
                                teacherComment: inputReqs[0].value,
                                teacherDate: inputReqs[1].value,
                                teacherStatus: status,
                                status: statusNext ?? "staff_pending"
                            }
                        }
                    })
                    await createNoti({
                        variables: {
                          record: {
                            title: requestData?.generalRequestId.title,
                            status: statusNext ?? "staff_pending",
                            type: "ใบคำร้องทั่วไป",
                            studentId: requestData?.generalRequestId.studentIdMongo,
                            teacherId: requestData?.generalRequestId.teacherID
                          },
                        },
                      });
                }
                else if (who === "staff") {
                    await createStaffCommentMutation({
                        variables: {
                            id,
                            record : {
                                staffComment: inputReqs[0].value,
                                staffDate: inputReqs[1].value,
                                staffStatus: status,
                                status: statusNext ?? "dean_pending"
                            }
                        }
                    })
                    await createNoti({
                        variables: {
                          record: {
                            title: requestData?.generalRequestId.title,
                            status: statusNext ?? "dean_pending",
                            type: "ใบคำร้องทั่วไป",
                            studentId: requestData?.generalRequestId.studentIdMongo,
                            teacherId: requestData?.generalRequestId.teacherID
                          },
                        },
                      });
                }
                else {
                    await createDeanCommentMutation({
                        variables: {
                            id,
                            record : {
                                deanComment: inputReqs[0].value,
                                deanDate: inputReqs[1].value,
                                deanStatus: status,
                                status: status
                            }
                        }
                    })
                    await createNoti({
                        variables: {
                          record: {
                            title: requestData?.generalRequestId.title,
                            status: status,
                            type: "ใบคำร้องทั่วไป",
                            studentId: requestData?.generalRequestId.studentIdMongo,
                            teacherId: requestData?.generalRequestId.teacherID
                          },
                        },
                      });
                }
                const modal = Modal.success({
                    content: 'อัปเดตเสร็จสิ้น',
                });
                setTimeout(() => {
                    navigate("/service")
                    modal.destroy()
                }, 2000)
            } catch (error) {
                
            }
        }
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
        // <Link to={`service/general-request/${generalRequest._id}`} className="text-decoration-none text-black">
        <div className="container pb-5 pt-4">
            <div className="request-form">
                <div className='request-form-degree text-end'>
                    <div>ระดับ{requestData?.generalRequestId?.degree}</div>
                </div>
                {/* <h3 className='text-center mt-5'>คำร้องทั่วไป</h3> */}
                <div className='row'>
                    <div className='col-2 mx-5 mt-1'>
                        <img src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/cropped-it-logo.png" width="50%" />
                    </div>
                    <div className='col-6 text-center'>
                        <h3 className='text-center mt-4'>คำร้องทั่วไป</h3>
                    </div>
                    {/* <div className='col-2'>
                    </div> */}
                </div>
                <div className='d-flex justify-content-between'>
                    <div>

                    </div>
                    <div>
                        <div>คณะเทคโนโลยีสารสนเทศ</div>
                        <div>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</div>
                        <div>
                            วันที่ {dateRequest ? dateRequest[0] : ""} เดือน {dateRequest ? dateRequest[1] : ""} พ.ศ. {parseInt(dateRequest ? dateRequest[2] : 0) + 543}

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
                </div>
            </div>
            <div className='row mt-2' >
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

            </div>
        </div>
        // </Link>
    )
}