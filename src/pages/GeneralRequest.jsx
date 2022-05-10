import { Button, Modal } from 'antd'
import { useState, useEffect } from 'react'
import { RequestHeader } from "../components/Services/RequestHeader"
import { RequestInput } from "../components/Services/RequestInput"
import { useGoogle } from "../contexts/GoogleContext"

import data from '../data/students.json'

export const GeneralRequest = () => {

    const { user } = useGoogle()
    const [student, setStudent] = useState({})
    const [students, setStudents] = useState([])
    const [content, setContent] = useState([])
    const [contentDate, setContentDate] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const sendPopup = () => {
        const inputReqs = document.querySelectorAll(".input-request")
        const inputDataReqs = document.querySelectorAll(".input-request-date input")
        setContent([])

        inputReqs.forEach((el) => {
            if (el.value){
                setContent((prev) => {
                    return [...prev, el.value]
                })
            }
        })

        inputDataReqs.forEach((el) => {
            console.log(el);
            if (el.value){
                setContentDate((prev) => {
                    return [...prev, el.value]
                })
            }
        })

        showModal()
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
                    const std = students.filter(std => std.std_id == stdId)[0]
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
            <div className="request-col-2">
                <RequestInput text="หัวข้อเรื่อง" />
                <RequestInput text="ถึงอาจารย์" />
                <RequestInput text="รหัสนักศึกษา" value={student ? student.std_id : ""} disabled={student ? true : false} />
                <RequestInput text="ชื่อ - นามสกุล" value={student ? `${student.Fname} ${student.Lname}` : ""} disabled={student ? true : false} />
                <RequestInput text="ระดับ" value={student ? student.degree : ""} disabled={student ? true : false} />
                <RequestInput text="ปีที่" value={student ? student.year : ""} disabled={student ? true : false} />
                <RequestInput text="สาขาวิชา" value={student ? student.program : ""} disabled={student ? true : false} />
                <RequestInput text="แขนงวิชา" value={student ? student.major : ""} disabled={student ? true : false} />
                <RequestInput text="ภาคเรียนที่" />
                <RequestInput text="ปีการศึกษา" />
                <div className='w-100'>
                    <RequestInput text="รายละเอียด" type="text-area" />
                </div>
                <RequestInput text="วันที่" type="date" />
                <RequestInput text="ลงชื่อ" />
            </div>
            <div className='text-end mt-3 mb-3'>
                <Button type="primary" onClick={sendPopup}>ส่งเรื่อง</Button>
            </div>

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="ส่งใบ">
                {content.join(" ")}
                <br />
                {contentDate.join(" ")}
            </Modal>
        </div>
        
    )
}