import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import stdsData from '../data/students.json'
import reqData from '../data/requestItems.json'

export const GeneralRequestText = () => {
    const { id } = useParams()
    const [request, setRequest] = useState(null)
    const [student, setStudent] = useState(null)

    useEffect(
        () => {
            const req = reqData.find(req => req.req_id == id)
            setRequest(req);
            if (req){
                const std = stdsData.find(std => std.std_id == req.std_id)
                setStudent(std); 
            }
        }, []
    )
    
    return (
        <div className="container pb-5 pt-4">
            <div className="request-form">
                <div className='request-form-degree text-end'>
                    <div>ระดับ{student?.degree}</div>
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
                            วันที่ {request?.date.split("/")[2]} เดือน {request?.date.split("/")[1]} พ.ศ. {parseInt(request?.date.split("/")[0]) + 543}

                        </div>
                    </div>
                </div>
                <div className='request-form-title mt-4'>
                    <b>เรื่อง : </b>
                    {request?.title} 
                    &nbsp;ภาคการศึกษาที่ {request?.semester}
                    &nbsp;ปีการศึกษา {request?.school_year}
                    </div>
                <div><b>เรียน : </b>คณบดีคณะเทคโนโลยีสารสนเทศ</div>
                <div className='mt-4'>
                    &emsp;&emsp;&emsp;&emsp;ข้าพเจ้า {student?.Fname} {student?.Lname}
                    &nbsp;รหัสนักศึกษา {student?.std_id}
                    &nbsp;ชั้นปีที่ {student?.year}
                    &nbsp;สาขาวิชา {student?.program}
                    &nbsp;{
                        student?.major != "-" ?
                        "แขนงวิชา " + student?.major :
                        ""
                    }
                </div>
                <div className='mt-4'>
                    &emsp;&emsp;&emsp;&emsp;มีความประสงค์ {request?.detail}
                </div>
                <div className='mt-4'>&emsp;&emsp;&emsp;&emsp;จึงเรียนมาเพื่อโปรดพิจารณาและดำเนินการต่อไปด้วย</div>
                <div className='request-form-sign mt-4 d-flex justify-content-around'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className='text-center'>
                        <div>ขอแสดงความนับถือ</div>
                        <div>{student?.Fname} {student?.Lname}</div>
                        <div>({student?.Fname} {student?.Lname})</div>
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
                                <td></td>
                                <td></td>
                                <td></td>
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
                        <div>ลงชื่อ {student?.Fname} {student?.Lname}</div>
                        <div>({student?.Fname} {student?.Lname})</div>
                    </div>
                </div>
            </div>
        </div>
    )
}