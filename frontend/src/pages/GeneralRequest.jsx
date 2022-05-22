import { Button, Modal } from 'antd'
import { useState, useEffect } from 'react'
import { RequestHeader } from "../components/Services/RequestHeader"
import { RequestInput } from "../components/Services/RequestInput"
import { useGoogle } from "../contexts/GoogleContext"

import data from '../data/students.json'
import reqInfo from '../data/requestInfo.json'

export const GeneralRequest = () => {

    const { user } = useGoogle()
    const [student, setStudent] = useState(null)
    const [students, setStudents] = useState([])
    const [content, setContent] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const sendPopup = () => {
        const inputReqs = document.querySelectorAll(".student-request :where(input.input-request, textarea.input-request,.input-request input)")

        let countEmtry = 0
        setContent([])
        inputReqs.forEach((el) => {
            if (el.value){
                setContent((prev) => {
                    return [...prev, el.value]
                })
            }
            else{
                countEmtry++
            }
        })

        if (!countEmtry){
            showModal()
        }
        else{
            alert("ไม่ครบ")
        }

    }

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    useEffect(
        () => {
            setStudents(data)

            if (user){
                const stdId = user.email.split("@")[0]
                if (students){
                    const std = students.find(std => std.std_id == stdId)
                    setStudent(std);
                }
            }
        },
        [data, setStudents, setStudent, user, students]
    )
    
    return (
        <div className="container mt-5 pb-5">
            <h2 className="text-center">สร้างใบคำร้องทั่วไป</h2>
            <RequestHeader text="สำหรับนักศึกษา" />
            <div className="request-col-2 student-request">
                <RequestInput text="หัวข้อเรื่อง" />
                <RequestInput text="ถึงอาจารย์" />
                <RequestInput text="รหัสนักศึกษา" value={student ? student.std_id : ""} disabled={student ? true : false} />
                <RequestInput text="ชื่อ - นามสกุล" value={student ? `${student.Fname ?? ""} ${student.Lname ?? ""}` : ""} disabled={student ? true : false} />
                <RequestInput text="ระดับ" value={student ? student.degree : ""} disabled={student ? true : false} />
                <RequestInput text="ปี" value={student ? student.year : ""} disabled={student ? true : false} />
                <RequestInput text="สาขาวิชา" value={student ? student.program : ""} disabled={student ? true : false} />
                <RequestInput text="แขนงวิชา" value={student ? student.major : ""} disabled={student ? true : false} />
                <RequestInput text="ภาคเรียน" />
                <RequestInput text="ปีการศึกษา" />
                <div className='w-100'>
                    <RequestInput text="รายละเอียด" type="text-area" />
                </div>
                <RequestInput text="วันที่" type="date" />
                <RequestInput text="ลงชื่อ" />
            </div>
            <div className='text-end mt-3 mb-3'>
                <button className="btn btn-primary" onClick={sendPopup}>ส่งเรื่อง</button>
            </div>

            <div className='row'>
                <div className="col teacher-request">
                    <RequestHeader text="สำหรับอาจารย์" />
                    <RequestInput text="ความคิดเห็น" />
                    <RequestInput text="วันที่" type="date" />
                    <div className='mt-3 text-end'>
                        <button className="btn btn-success btn-approve">อนุญาต</button>
                        <button className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                    </div>
                </div>
                <div className="col staff-request">
                    <RequestHeader text="สำหรับเจ้าหน้าที่" />
                    <RequestInput text="ความคิดเห็น" />
                    <RequestInput text="วันที่" type="date" />
                    <div className='mt-3 text-end'>
                        <button className="btn btn-success btn-approve">อนุญาต</button>
                        <button className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                    </div>
                </div>
                <div className="col dean-request">
                    <RequestHeader text="สำหรับคณบดี" />
                    <RequestInput text="ความคิดเห็น" />
                    <RequestInput text="วันที่" type="date" />
                    <div className='mt-3 text-end'>
                        <button className="btn btn-success btn-approve">อนุญาต</button>
                        <button className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                    </div>
                </div>
            </div>

            <Modal title="ยืนยันใบคำร้องทั่วไป" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="ส่งใบ">
            {
                content.map((c, i) => (
                    <div key={"ct-"+i}>
                        {reqInfo[0].input[i].nameTH} : {c}
                    </div>
                ))
            }
            <div className="mt-3 text-secondary">กรุณาตรวจสอบใบคำร้องอีกครั้ง ถ้าข้อมูล<ins>ครบ</ins>และ<ins>ถูกต้อง</ins> กรุณากดปุ่ม ส่งใบ</div>
            </Modal>
        </div>
        
    )
}