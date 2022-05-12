import { useParams } from "react-router-dom"
import { Button, Modal } from 'antd'
import { useState, useEffect, useCallback } from 'react'
import { RequestHeader } from "../components/Services/RequestHeader"
import { RequestInput } from "../components/Services/RequestInput"
import { useGoogle } from "../contexts/GoogleContext"
import data from '../data/students.json'

import { Upload, message } from 'antd';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const LeaveRequest = () => {
    const { type } = useParams()

    const { user } = useGoogle()
    const [student, setStudent] = useState({})
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [content, setContent] = useState([])
    const [contentDate, setContentDate] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const sendPopup = () => {
        const inputReqs = document.querySelectorAll(".student-request .input-request")
        const inputDataReqs = document.querySelectorAll(".student-request .input-request-date input")
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

      const addSubject = useCallback(
        () => {
            setSubjects((prev) => [...prev, ""])
        },
        [setSubjects]
      )

      const deleteSubject = useCallback(
        () => {
            event.target.parentNode.remove()
            // let cpy = subjects
            // cpy.pop()
            // setSubjects(cpy)
            // console.log(subjects);
        },
        [setSubjects]
      )

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
        [data, setStudents, setStudent, user, students, subjects]
    )

    return (
        <div className="container mt-5 pb-5">
            <h2 className="text-center">สร้างใบลา{type === "sick" ? "ป่วย" : "กิจ"}</h2>
            <RequestHeader text="สำหรับนักศึกษา" />
            <div className="request-col-2 student-request">
                <RequestInput text="หัวข้อเรื่อง" />
                <RequestInput text="ประเภทการลา" value={type === "sick" ? "ลาป่วย" : "ลากิจ"} disabled={true} />
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
                <RequestInput text="ตั้งแต่วันที่" type="date" />
                <RequestInput text="ถึงวันที่" type="date" />
                <RequestInput text="ลงชื่อ" />
                <RequestInput text="ลงชื่อผู้ปกครอง" />
                <div className="w-100">
                    <div className="request-input-text">วิชา :</div>
                    <div className="input-subjects">
                        <div>
                            <RequestInput text="รหัสวิชา" />
                            <RequestInput text="ชื่อวิชา" />
                            <RequestInput text="อาจารย์" />
                            <div></div>
                        </div>
                        {
                            subjects.map((s) => (
                                <div>
                                    <RequestInput />
                                    <RequestInput />
                                    <RequestInput />
                                    <button className="btn btn-danger" onClick={deleteSubject}>ลบ</button>
                                </div>
                            ))
                        }
                    </div>
                    <button className="btn btn-success mt-3" onClick={addSubject}>+ เพิ่ม</button>
                </div>
                <div className="w-100">
                    <div>เอกสาร : </div>
                    <Upload {...props}>
                        <button className="btn btn-success mt-3">+ อัปโหลดไฟล์</button>
                    </Upload>
                </div>
            </div>
            <div className='text-end mt-3 mb-3'>
                <button className="btn btn-primary" onClick={sendPopup}>ส่งเรื่อง</button>
            </div>

            <div className='teacher-request'>
                <RequestHeader text="สำหรับอาจารย์" />
                <div className="row">
                    <div className="col d-flex justify-content-between">
                        <RequestInput text="อาจารย์" />
                        <RequestInput text="ความคิดเห็น" />
                        <RequestInput text="วันที่" type="date" />
                    </div>
                </div>
                <div className='mt-3 text-end'>
                    <button className="btn btn-success btn-approve">อนุญาต</button>
                    <button className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                </div>
            </div>

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="ส่งใบ">
                {content.join(" ")}
                <br />
                {contentDate.join(" ")}
            </Modal>
        </div>
    )
}