import { useNavigate, useParams } from "react-router-dom"
import { Button, Modal } from 'antd'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { RequestHeader } from "../components/Services/RequestHeader"
import { RequestInput } from "../components/Services/RequestInput"
// import { useGoogle } from "../contexts/GoogleContext"
import data from '../data/students.json'
import reqInfo from '../data/requestInfo.json'

import { Upload, message, Select  } from 'antd';
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

const { Option } = Select;

export const LeaveRequest = () => {
    const { type } = useParams()
    const navigate = useNavigate()
    
    const {user2: user} = useApp()
    // const { user } = useGoogle()
    const [student, setStudent] = useState({})
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([""])
    const [content, setContent] = useState([])
    const [fileUploadName, setFileUploadName] = useState([])
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
                "leaveType": content[1] === "??????????????????" ? "Sick" : "Business",
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
                status: "teacher_pending",
            }

            try {
                console.log(record);
                await createLeaveRequestMutation({
                    variables: {
                        record
                    }
                })
                const modal = Modal.success({
                    content: '??????????????????????????????????????????????????????????????????',
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
        inputReqs.forEach(el => console.log(el))
        const fileUploads = document.querySelectorAll(".file-upload-name a")
        setFileUploadName([])
        fileUploads.forEach((el) => {
            setFileUploadName((prev) => [...prev, el.innerHTML])
        })


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
            alert("??????????????????")
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
                  "Information_Technology": "???????????????????????????????????????????????????",
                  "Data_Science_and_Business_Analytics": "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                  "Business_Information_Technology__International_Program_": "?????????????????????????????????????????????????????????????????????????????? (????????????????????????????????????????????????)"
              }
              return programName[user?.program]
        },
        [user]
    )

    const major = useMemo(
        () => {
              const majorName = {
                  "-": "-",
                  "Software_Engineering": "???????????????????????????????????????????????????",
                  "Network_and_System_Technology": "???????????????????????????????????????????????????????????????????????????",
                  "Multimedia_and_Game_Development": "?????????????????????????????????????????????????????????????????????"
              }
              return majorName[user?.major]
        },
        [user]
    )

    const degree = useMemo(
        () => {
              const degreeName = {
                  "Bachelor": "???????????????????????????",
                  "Master": "????????????????????????",
                  "Doctor": "???????????????????????????"
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
            <h2 className="text-center">???????????????????????????{type === "sick" ? "????????????" : "?????????"}</h2>
            <RequestHeader text="??????????????????????????????????????????" />
            <div className="request-col-2 student-request">
                <RequestInput text="????????????????????????????????????" />
                <RequestInput text="?????????????????????????????????" value={type === "sick" ? "??????????????????" : "???????????????"} disabled={true} />
                <RequestInput text="????????????????????????????????????" value={student ? student.studentID : ""} disabled={student ? true : false} />
                <RequestInput text="???????????? - ?????????????????????" value={student ? `${student.firstname ?? ""} ${student.lastname ?? ""}` : ""} disabled={student ? true : false} />
                <RequestInput text="???????????????" value={degree ?? ""}  disabled={student ? true : false} />
                <RequestInput text="???????????????" value={student ? student.year : ""} disabled={student ? true : false} />
                <RequestInput text="????????????????????????" value={program ?? ""} disabled={student ? true : false} />
                <RequestInput text="????????????????????????" value={major ?? ""} disabled={student ? true : false} />
                <RequestInput text="?????????????????????????????????" />
                <RequestInput text="??????????????????????????????" />
                <div className='w-100'>
                    <RequestInput text="??????????????????????????????" type="text-area" />
                </div>
                <RequestInput text="???????????????????????????????????????" type="date" />
                <RequestInput text="???????????????????????????" type="date" />
                <RequestInput text="??????????????????" />
                <RequestInput text="?????????????????????????????????????????????" />
                <div className="w-100">
                    <div className="request-input-text">???????????? :</div>
                    <div className="input-subjects">
                        <div>
                            <div className="request-input">
                                <div className="request-input-text">???????????????????????? :</div>
                            </div>
                            <div className="request-input">
                                <div className="request-input-text">???????????????????????? :</div>
                            </div>
                            <div className="request-input">
                                <div className="request-input-text">????????????????????? :</div>
                            </div>
                            <Button type="danger" className="opacity-0">??????</Button>
                        </div>
                        {
                            subjects.map((_, i) => (
                                <div className="mt-2">
                                    <RequestInput />
                                    <RequestInput />
                                    <div className="request-input">
                                        <select className="w-100 input-request" style={{height: "40px", borderRadius: "2px"}}>
                                            {userData?.users?.filter((u) => u.role === "teacher").map((u) => (
                                                <option  value={u._id}>{u.fullname}</option >
                                            ))}
                                        </select>
                                    </div>
                                    <Button type="danger" size="large" onClick={deleteSubject} disabled={i == 0}>??????</Button>
                                </div>
                            ))
                        }
                    </div>
                    <Button size="large" className="mt-3 bg-success" onClick={addSubject}>+ ???????????????</Button>
                </div>
                <div className="w-100">
                    <div>?????????????????? : </div>
                    {/* <Button size="large" className="mt-3 bg-success">+ ?????????????????????????????????</Button> */}
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
                        uploadedFiles.map(file => <div className="file-upload-name">
                            <a href={`https://s3.ktnis.me/std-service/${file}`} target='_blank'>{file}</a><br/>
                        </div>)
                    }

                </div>
            </div>
            <div className='text-end mt-3 mb-3'>
                <Button size="large" type="primary" onClick={sendPopup}>???????????????????????????</Button>
            </div>

            {/* <div className='teacher-request'>
                <RequestHeader text="???????????????????????????????????????" />
                    <div className="d-flex justify-content-between" style={{gap: "10px"}}>
                        <div className="request-input">
                            <div className="request-input-text">?????????????????????</div>
                        </div>
                        <div className="request-input">
                            <div className="request-input-text">?????????????????????????????????</div>
                        </div>
                        <div className="request-input">
                            <div className="request-input-text">??????????????????</div>
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
                    <Button size="large" className="bg-success">??????????????????</Button>
                    <Button size="large" type="danger">??????????????????</Button>
                </div>
            </div> */}

            <Modal title="??????????????????????????????" visible={isModalVisible} onOk={handleCreateLeaveRequest} onCancel={handleCancel} okText="???????????????">
            {
                content.filter((_, i) => i < 15).map((c, i) => (
                    <div key={"ct-"+i}>
                        {reqInfo[1].input[i].nameTH} : {c}
                    </div>
                ))
            }
            <div>???????????? : </div>
            <div className="row">
                <div className="col-4">{reqInfo[1].input[15].nameTH}</div>
                <div className="col-4">{reqInfo[1].input[16].nameTH}</div>
                <div className="col-4">{reqInfo[1].input[17].nameTH}</div>
                {
                    content.filter((_, i) => i >= 15).map((c, i) => (
                        (Number.isInteger((i+1)/3)) ?
                        <div className="col-4">{teachers[parseInt(i/3)]?.teacherName}</div> : <div className="col-4">{c}</div>
                    ))
                }
            </div>
            <div>?????????????????????????????????????????? : {fileUploadName.map((f) => <div>{f}</div>)}</div>
            <div className="mt-3 text-secondary">???????????????????????????????????????????????????????????????????????? ???????????????????????????<ins>?????????</ins>?????????<ins>?????????????????????</ins> ????????????????????????????????? ???????????????</div>
            </Modal>
        </div>
    )
}