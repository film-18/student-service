import { useState, useEffect, useMemo } from 'react'
import { useParams } from "react-router-dom"

import stdsData from '../data/students.json'
import reqData from '../data/requestItems.json'
import { gql, useQuery } from '@apollo/client';

const REQUEST_QUERY = gql`
query ($gen_id: MongoID!) {
    generalRequestId (_id: $gen_id) {
        title
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
        staffComment
        deanComment
    }
}
`;

export const GeneralRequestText = () => {
    const { id } = useParams()

    const {data: requestData} = useQuery(REQUEST_QUERY, {
        variables: {
            "gen_id": id
        }
    })

    const dateRequest = useMemo(
        () => {
            if (requestData) {
                const date = requestData?.generalRequestId?.requestDate.split("T")[0].split("-")
                const monthName = ["มกราคม", "กุมภาพันธ์", "มีนาคม","เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
                return [date[2], monthName[parseInt(date[1])], date[0]]
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
        // <Link to={`service/general-request/${generalRequest._id}`} className="text-decoration-none text-black">
        <div className="container pb-5 pt-4">
            <div className="request-form">
                <div className='request-form-degree text-end'>
                    <div>ระดับ{requestData?.generalRequestId?.degree}</div>
                </div>
                <h3 className='text-center mt-5'>คำร้องทั่วไป</h3>
                <div className='d-flex justify-content-between'>
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
                </div>
            </div>
        </div>
        // </Link>
    )
}