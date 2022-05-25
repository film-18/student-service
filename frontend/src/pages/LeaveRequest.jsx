import { useParams } from "react-router-dom"
import { Button, Modal } from 'antd'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { RequestHeader } from "../components/Services/RequestHeader"
import { RequestInput } from "../components/Services/RequestInput"
// import { useGoogle } from "../contexts/GoogleContext"
import data from '../data/students.json'
import reqInfo from '../data/requestInfo.json'

import { Upload, message } from 'antd';
import { useApp } from "../contexts/AccountContext"
import { gql, useQuery } from "@apollo/client"

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

const USER_QUERY = gql`
query {
    users {
      _id
      fullname
      role
    }
}
`
export const LeaveRequest = () => {
    const { type } = useParams()
    
    const {user2: user} = useApp()
    // const { user } = useGoogle()
    const [student, setStudent] = useState({})
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [content, setContent] = useState([])
    const [fileUploadName, setFileUploadName] = useState("")

    const [isModalVisible, setIsModalVisible] = useState(false);

    const sendPopup = () => {
        const inputReqs = document.querySelectorAll(".student-request :where(input.input-request, textarea.input-request,.input-request input)")

        const fileUpload = document.querySelector(".ant-upload-list-item-name")

        inputReqs.forEach((el, i) => console.log(i, el.value))

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

        if (fileUpload){
            setFileUploadName(fileUpload.innerHTML)
        }
        else{
            setFileUploadName("")
        }

        // showModal()

        if (!countEmtry && fileUpload){
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

      const addSubject = useCallback(
        () => {
            setSubjects((prev) => [...prev, ""])
        },
        [setSubjects]
      )

      const deleteSubject = useCallback(
        () => {
            setSubjects((prev) => {
                return [...prev.slice(0, subjects.length-1)]
            })
        },
        [setSubjects]
      )

      const program = useMemo(
        () => {
              const programName = {
                  "Information_Technology": "เทคโนโลยีสารสนเทศ",
                  "Data_Science_and_Business_Analytics": "วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ",
                  "Business_Information_Technology__International_Program_": "เทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)"
              }
              return programName[user?.program]
        },
        []
    )

    const major = useMemo(
        () => {
              const majorName = {
                  "-": "-",
                  "Software_Engineering": "วิศวกรรมซอฟต์แวร์",
                  "Network_and_System_Technology": "เทคโนโลยีเครือข่ายและระบบ",
                  "Multimedia_and_Game_Development": "การพัฒนาสื่อประสมและเกม"
              }
              return majorName[user?.major]
        },
        []
    )

    const degree = useMemo(
        () => {
              const degreeName = {
                  "Bachelor": "ปริญญาตรี",
                  "Master": "ปริญญาโท",
                  "Doctor": "ปริญญาเอก"
              }
              return degreeName[user?.degree]
        },
        []
    )
    
    useEffect(
        () => {
            setStudent(user)
            console.log(user);
            // setStudents(user)

            // if (user){
                // const stdId = user.email.split("@")[0]
                // if (students){
                //     const std = students.find(std => std.std_id == stdId)
                //     setStudent(std);
                // }
            // }
        },
        [data, setStudent, user, students, subjects]
    )

    return (
        <div className="container mt-5 pb-5">
            <h2 className="text-center">สร้างใบลา{type === "sick" ? "ป่วย" : "กิจ"}</h2>
            <RequestHeader text="สำหรับนักศึกษา" />
            <div className="request-col-2 student-request">
                <RequestInput text="หัวข้อเรื่อง" />
                <RequestInput text="ประเภทการลา" value={type === "sick" ? "ลาป่วย" : "ลากิจ"} disabled={true} />
                <RequestInput text="รหัสนักศึกษา" value={student ? student.studentID : ""} disabled={student ? true : false} />
                <RequestInput text="ชื่อ - นามสกุล" value={student ? `${student.firstname ?? ""} ${student.lastname ?? ""}` : ""} disabled={student ? true : false} />
                <RequestInput text="ระดับ" value={degree ?? ""} disabled={student ? true : false} />
                <RequestInput text="ปีที่" value={student ? student.year : ""} disabled={student ? true : false} />
                <RequestInput text="สาขาวิชา" value={program ?? ""} disabled={student ? true : false} />
                <RequestInput text="แขนงวิชา" value={major ?? ""} disabled={student ? true : false} />
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
                            <button className="btn btn-secondary mt-4" onClick={deleteSubject} disabled>ลบ</button>
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
                    <Upload {...props} className="file-upload">
                        <button className="btn btn-success mt-3">+ อัปโหลดไฟล์</button>
                    </Upload>
                </div>
            </div>
            <div className='text-end mt-3 mb-3'>
                <button className="btn btn-primary" onClick={sendPopup}>ส่งเรื่อง</button>
            </div>

            <div className='teacher-request'>
                <RequestHeader text="สำหรับอาจารย์" />
                    <div className="d-flex justify-content-between" style={{gap: "10px"}}>
                        <RequestInput text="อาจารย์" />
                        <RequestInput text="ความคิดเห็น" />
                        <RequestInput text="วันที่" type="date" />
                    </div>
                    {
                        subjects.map((s) => (
                            <div className="d-flex justify-content-between" style={{gap: "10px"}}>
                                <RequestInput />
                                <RequestInput />
                                <RequestInput type="date" />
                            </div>
                        ))
                    }
                <div className='mt-3 text-end'>
                    <button className="btn btn-success btn-approve">อนุญาต</button>
                    <button className="btn btn-danger ms-2 btn-reject">ปฏิเสธ</button>
                </div>
            </div>

            <Modal title="ยืนยันใบลา" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="ส่งใบ">
            {
                content.filter((_, i) => i < 15).map((c, i) => (
                    <div key={"ct-"+i}>
                        {reqInfo[1].input[i].nameTH} : {c}
                    </div>
                ))
            }
            <div>วิชา : </div>
            <div className="row">
                <div className="col-4">{reqInfo[1].input[15].nameTH}</div>
                <div className="col-4">{reqInfo[1].input[16].nameTH}</div>
                <div className="col-4">{reqInfo[1].input[17].nameTH}</div>
                {
                    content.filter((_, i) => i >= 15).map((c, i) => (
                        <div className="col-4">{c}</div>
                    ))
                }
            </div>
            <div>ไฟล์ที่อัปโหลด : {fileUploadName}</div>
            <div className="mt-3 text-secondary">กรุณาตรวจสอบใบลาอีกครั้ง ถ้าข้อมูล<ins>ครบ</ins>และ<ins>ถูกต้อง</ins> กรุณากดปุ่ม ส่งใบ</div>
            </Modal>
        </div>
    )
}