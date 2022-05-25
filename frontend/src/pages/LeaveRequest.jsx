import { useNavigate, useParams } from "react-router-dom"
import { Button, Modal } from 'antd'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { RequestHeader } from "../components/Services/RequestHeader"
import { RequestInput } from "../components/Services/RequestInput"
// import { useGoogle } from "../contexts/GoogleContext"
import data from '../data/students.json'
import reqInfo from '../data/requestInfo.json'

import { Upload, message } from 'antd';
import { useApp } from "../contexts/AccountContext"
import { gql, useMutation, useQuery } from "@apollo/client"

const UPLOAD_MUTATION = gql`
mutation ($file: Upload) {
    UploadLeaveRequestFile(document: $file)
}
`

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

const CREATE_REQUEST_MUTATION = gql`
mutation ($record: CreateOneLeaveRequestInput!){
    createLeaveRequest (record: $record) {
      recordId
    }
  }
`

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
    const navigate = useNavigate()
    
    const {user2: user} = useApp()
    // const { user } = useGoogle()
    const [student, setStudent] = useState({})
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([""])
    const [content, setContent] = useState([])
    const [fileUploadName, setFileUploadName] = useState("")
    const [teachers, setTeachers] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [createLeaveRequestMutation] = useMutation(CREATE_REQUEST_MUTATION)
    const {data: userData} = useQuery(USER_QUERY)

    const [uploadedFiles, setUploadFiles] = useState([])
    const [uploadImage, { data: uploadedImageData, reset: resetUploaded }] = useMutation(UPLOAD_MUTATION)

    useEffect(() => {
        if(uploadedImageData && uploadedImageData.UploadLeaveRequestFile) {
            setUploadFiles([...uploadedFiles, uploadedImageData.UploadLeaveRequestFile])
            resetUploaded()
        }
        console.log(uploadedFiles)
    }, [uploadedImageData, uploadedFiles])

    const handleCreateLeaveRequest = useCallback(
        async() => {
            // content.forEach((c, i) => console.log(i, c))
            // console.log(teachers);

            const record = {
                "studentIdMongo": user._id,
                "title": content[0],
                "leaveType": content[1] === "ลาป่วย" ? "Sick" : "Business",
                "studentId": content[2],
                "fullname": content[3],
                "degree": content[4],
                "year": content[5],
                "program": content[6],
                "major": content[7],
                "semester": content[8],
                "school_year": content[9],
                "description": content[10],
                "startDate": content[11],
                "endDate": content[12],
                "parent": content[14],
                "file": uploadedFiles,
                "teacherList": teachers,
            }

            try {
                console.log(record);
                await createLeaveRequestMutation({
                    variables: {
                        record
                    }
                })
                const modal = Modal.success({
                    content: 'สร้างใบคำร้องเสร็จสิ้น',
                });
                setTimeout(() => {
                    navigate("/service")
                    modal.destroy()
                }, 2000)
            } catch (error) {
                console.log(error.message);
            }
        },
        [teachers, content]
    )

    const sendPopup = () => {
        const inputReqs = document.querySelectorAll(".student-request :where(input.input-request, select.input-request, textarea.input-request,.input-request input)")

        const fileUpload = document.querySelector(".ant-upload-list-item-name")
        
        

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

        if (!countEmtry && uploadedFiles.length > 0){
            setTeachers([])
            for (let i = 0; i < (inputReqs.length - 15) / 3; i++){
                const teacherName = userData?.users.find((u) => u._id === inputReqs[+(15+(3*i)+2)].value).fullname
                setTeachers((prev) => {
                    return [...prev, {
                        subjectId: inputReqs[+(15+((3*i)+0))].value, 
                        subjectName: inputReqs[+(15+(3*i)+1)].value, 
                        teacherID: inputReqs[+(15+(3*i)+2)].value, 
                        teacherName}
                    ]
                })
            }
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
        [setSubjects, subjects]
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
        [user]
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
        [user]
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
        [user]
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
                <RequestInput text="ระดับ" value={degree ?? ""}  disabled={student ? true : false} />
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
                            <div className="request-input">
                                <div className="request-input-text">รหัสวิชา :</div>
                            </div>
                            <div className="request-input">
                                <div className="request-input-text">ชื่อวิชา :</div>
                            </div>
                            <div className="request-input">
                                <div className="request-input-text">อาจารย์ :</div>
                            </div>
                            <Button type="danger" className="opacity-0">ลบ</Button>
                        </div>
                        {
                            subjects.map((_, i) => (
                                <div className="mt-2">
                                    <RequestInput />
                                    <RequestInput />
                                    <div className="request-input">
                                        <select className="w-100 input-request" style={{height: "40px", border: "1px solid #d9d9d9", borderRadius: "2px"}}>
                                            {userData?.users?.filter((u) => u.role === "teacher").map((u) => (
                                                <option value={u._id}>{u.fullname}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Button type="danger" size="large" onClick={deleteSubject} disabled={i == 0}>ลบ</Button>
                                </div>
                            ))
                        }
                    </div>
                    <Button size="large" className="mt-3 bg-success" onClick={addSubject}>+ เพิ่ม</Button>
                </div>
                <div className="w-100">
                    <div>เอกสาร : </div>
                    <input
                        type={'file'}
                        onChange={async (e) => {
                            await uploadImage({
                                variables: {
                                    file: e.target.files[0]
                                }
                            })
                        }}
                    />

                    {
                        uploadedFiles.map(file => <>
                            <a href={`https://s3.ktnis.me/std-service/${file}`} target='_blank'>{file}</a><br/>
                        </>)
                    }

                </div>
            </div>
            <div className='text-end mt-3 mb-3'>
                <Button size="large" type="primary" onClick={sendPopup}>ส่งเรื่อง</Button>
            </div>

            {/* <div className='teacher-request'>
                <RequestHeader text="สำหรับอาจารย์" />
                    <div className="d-flex justify-content-between" style={{gap: "10px"}}>
                        <div className="request-input">
                            <div className="request-input-text">อาจารย์</div>
                        </div>
                        <div className="request-input">
                            <div className="request-input-text">ความคิดเห็น</div>
                        </div>
                        <div className="request-input">
                            <div className="request-input-text">วันที่</div>
                        </div>
                    </div>
                    {
                        subjects.map((s) => (
                            <div className="d-flex justify-content-between mt-2" style={{gap: "10px"}}>
                                <RequestInput />
                                <RequestInput />
                                <RequestInput type="date" />
                            </div>
                        ))
                    }
                <div className='mt-3 text-end'>
                    <Button size="large" className="bg-success">อนุญาต</Button>
                    <Button size="large" type="danger">ปฏิเสธ</Button>
                </div>
            </div> */}

            <Modal title="ยืนยันใบลา" visible={isModalVisible} onOk={handleCreateLeaveRequest} onCancel={handleCancel} okText="ส่งใบ">
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