import { useState, useEffect, useMemo, useCallback } from 'react'
import { Navigate, useParams } from "react-router-dom"

import stdsData from '../data/students.json'
import reqData from '../data/requestItems.json'
import { gql, useQuery, useMutation } from '@apollo/client';
import { Avatar, List, Space, Divider, Image, Button, Input, DatePicker } from 'antd';
import { useApp } from "../contexts/AccountContext"
import { RequestInput } from '../components/Services/RequestInput';
import { RequestHeader } from '../components/Services/RequestHeader';
import { Modal } from 'antd'
import moment from 'moment'
import 'moment/locale/th'
moment.locale('th')


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
        teacherID
        teacherComment
        teacherStatus
        teacherDate
      }
    }
  }
`;



const TEACHER_COMMENT_MUTAION = gql`
mutation ($record : UpdateByIdLeaveRequestInput! , $id :MongoID!) {
    updateGeneralLeaveRequestId (_id : $id , record: $record) {
      record {
        teacherStatus
      }
    }
  }
`;

export const LeaveRequestText = () => {
    const { id } = useParams()
    const { user2 } = useApp()

    const { data: requestData, refetch } = useQuery(REQUEST_QUERY, {
        variables: {
            "id": id
        }
    })

    const [createTeacherCommentMutation] = useMutation(TEACHER_COMMENT_MUTAION)
    const [comment, setComment] = useState(null)
    const [date, setDate] = useState(null)

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


    const onChangeDate = (date, dateString) => {
        setDate(dateString)
        console.log(dateString);
      };
      

    const convertDate = (date) => {
        if (requestData) {
            const monthName = ["??????????????????", "??????????????????????????????", "??????????????????", "??????????????????", "?????????????????????", "????????????????????????", "?????????????????????", "?????????????????????", "?????????????????????", "??????????????????", "???????????????????????????", "?????????????????????"]
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
                return "???????????????"
            }
            else {
                return "??????????????????"
            }
        },
        [requestData]
    )

    // const indexList = useMemo(
    //     () => {
    //         const obj = request?.teacherList.find((l) => l.teacherID === user2?._id)
    //         const index = request?.teacherList.findIndex((o) => o.teacherID === obj.teacherID)
    //         console.log(index);
    //         return index
    //     },
    //     [request, user2]
    // )

    const updateRequest = useCallback(
        (who, status) => async () => {
            const inputReqs = document.querySelectorAll(`.${who}-request :where(input.input-request, .input-request input)`)
            console.log(inputReqs)
            try {
                console.log(status);
                if (who === "teacher") {
                    console.log(comment, date)
                    let teacherList = request?.teacherList
                    let teacherListNew = []
                    teacherList.forEach((l) => {
                        let newL = {
                            ...l
                        }
                        delete newL["__typename"]
                        teacherListNew.push(newL)
                    })
                    console.log(teacherListNew);

                    const obj = request?.teacherList.find((l) => l.teacherID === user2?._id)
                    const indexList = request?.teacherList.findIndex((o) => o.teacherID === obj.teacherID)
                    
                    const newRecord = {
                        ...teacherListNew[indexList],
                        teacherStatus: status,
                        teacherComment: comment,
                        teacherDate: date
                    }
                    const newTeacherList = teacherListNew.map((l, i) => {
                        if (i == indexList){
                            return newRecord
                        }
                        return l
                    })
                    const isSuccess = newTeacherList.filter((l) => l.teacherStatus == "_")
                    const statusAll = newTeacherList.map((l) => l.teacherStatus == "approved")
                    const isApproved = statusAll.filter((l) => l)
                    console.log(statusAll);
                    console.log();
                    let statusRequest;
                    if (isSuccess.length === 0){
                        if (statusAll.length === isApproved.length) {
                            statusRequest = "approved"
                        }
                        else {
                            statusRequest = "rejected"
                        }
                    }
                    console.log(newTeacherList);
                    await createTeacherCommentMutation({
                        variables: {
                            id,
                            record : {
                                teacherList: newTeacherList,
                                status: statusRequest ?? "teacher_pending"
                            }
                        }
                    })
                }
                refetch()
                const modal = Modal.success({
                    content: '?????????????????????????????????????????????',
                });
                setTimeout(() => {
                    navigate("/service")
                    modal.destroy()
                }, 2000)
            } catch (error) {
                console.log(error.message);
            }
        }
    )

    // useEffect(
    //     () => {
    //         setComment(Comment)
    //     },
    //     [setComment]
    // )

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
                        <h3 className='text-center mt-4'>????????????????????????????????????????????????????????????????????????????????????</h3>
                    </div>
                    {/* <div className='col-2'>
                    </div> */}
                </div>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <div>????????????????????????????????????????????????????????????</div>
                        <div>??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</div>
                        <div>
                            ?????????????????? {createReq ? createReq[0] : ""} ??????????????? {createReq ? createReq[1] : ""} ???.???. {parseInt(createReq ? createReq[2] : 0)}
                        </div>
                    </div>
                </div>
                <div className='request-form-title mt-4'>
                    <b>?????????????????? : </b>
                    {requestData?.generalRequestId?.title}
                    &nbsp;???????????? {leaveType}
                    &nbsp;
                </div>
                <div><b>??????????????? : </b>???????????????????????????????????????????????? (????????????????????????????????????????????????????????????)</div>
                <div className='mt-4'>
                    &emsp;&emsp;&emsp;&emsp;???????????????????????? {request?.fullname}
                    &nbsp;???????????????????????????????????? {request?.studentId}
                    &nbsp;??????????????????????????? {request?.year}
                    &nbsp;???????????????????????? {request?.program}
                    &nbsp;{
                        request?.major != "-" ?
                            "???????????????????????? " + request?.major :
                            ""
                    }
                    &nbsp;???????????????{request?.degree}
                    &nbsp;?????????????????????????????????????????? {request?.semester}
                    &nbsp;?????????????????????????????? {request?.school_year}

                </div>
                <div className='mt-2'>
                    &emsp;&emsp;&emsp;&emsp;??????????????????????????????????????? {request?.description} ???????????????????????????????????????????????????????????????
                </div>
                <div className='mt-2'>
                    &emsp;&emsp;&emsp;&emsp; <a href={`https://s3.ktnis.me/std-service/${request?.file}`} target="_blank">{(request?.file + "").split("_")[2]}
                
                    </a>
                    
                </div>
                <div className='mt-2'>
                    &emsp; ??????????????????????????????????????????????????????????????????????????? {dateStart ? dateStart[0] : ""} ??????????????? {dateStart ? dateStart[1] : ""} ???.???. {parseInt(dateStart ? dateStart[2] : 0)}
                    &emsp;????????? ?????????????????? {dateEnd ? dateEnd[0] : ""} ??????????????? {dateEnd ? dateEnd[1] : ""} ???.???. {parseInt(dateEnd ? dateEnd[2] : 0)}
                    {/* &emsp;????????????????????????????????? */}
                    &emsp;?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? <th>(?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????. ???????????????????????????)</th>
                </div>
                <div className='mt-2'>
                    &emsp;&emsp;&emsp;&emsp; ??????????????????????????????????????????????????????????????????????????????
                </div>
                <div className='request-form-sign mt-4 d-flex justify-content-around'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className='text-center'>
                        <div>????????????????????????????????????????????????</div>
                        <div>{request?.fullname}</div>
                        <div>({request?.fullname})</div>
                        <div>????????????????????????</div>
                    </div>
                </div>
                <div className='request-form-sign mt-4 d-flex row'>
                    <div className='col-6 text-center mt-4 '>
                        <div>????????????????????????????????????????????????</div>
                        <div>{request?.parent}</div>
                        <div>({request?.parent})</div>
                        <div>???????????????????????????</div>
                    </div>
                    <div className='col-6 text-center mt-4'>
                        <div>????????????????????????????????????????????????</div>
                        <div>{request?.teacherName}</div>
                        <div>({request?.teacherName})</div>
                        <div>????????????????????????????????????????????????</div>
                    </div>
                </div>
                <div className='request-form-table leave' style={{ width: "auto"}}>
                    <table>
                        <thead>
                            
                            <th>????????????????????????</th>
                            <th>????????????????????????</th>
                            <th>???????????????????????????????????????</th>
                            <th>??????????????????</th>
                            <th>????????? / ??????????????? / ??????</th>
                            <th>????????????????????????</th>
                        </thead>
                        <tbody>
                            {
                                request?.teacherList.map((l) => (
                                    <tr>
                                        <td>{l.subjectId}</td>
                                        <td>{l.subjectName}</td>
                                        <td>{l.teacherName}</td>
                                        <td>{l.teacherStatus === "_" ? "" : l.teacherStatus === "approved" ? "??????????????????" : "??????????????????"}</td>
                                        <td>{l.teacherDate?.split("T")[0] ?? ""}</td>
                                        <td>{l.teacherComment !== "-" ? l.teacherComment : ""}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                user2?.role === "teacher" ?
                <div className='teacher-request'>
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
                            request?.teacherList.map((t) => (
                                <div className="d-flex justify-content-between mt-2" style={{gap: "10px"}}>
                                    <RequestInput value={t.teacherName} disabled={true} />
                                    <div className="request-input">
                                        {/* <RequestInput disabled={user2?._id != t.teacherID} onChange={(e) => setComment(e.target.value)} />
                                        <RequestInput disabled={user2?._id != t.teacherID} type="date" /> */}
                                        <Input disabled={user2?._id != t.teacherID || t.teacherComment !== "-"} size="large" onChange={(e) => setComment(e.target.value)} value={t.teacherComment !== "-" ? t.teacherComment : comment} className="input-request"></Input>
                                    </div>
                                    <div className='request-input'>
                                    <DatePicker size="large" className="w-100 input-request" disabled={user2?._id != t.teacherID || t.teacherComment !== "-"} format="YYYY/MM/DD"
                                    onChange={onChangeDate} />
                                    </div>
                                </div>
                            ))
                        }
                    <div className='mt-3 text-end'>
                        <Button size="large" onClick={updateRequest("teacher", "approved")} className="bg-success mx-2">??????????????????</Button>
                        <Button size="large"  onClick={updateRequest("teacher", "rejected")} type="danger">??????????????????</Button>
                    </div>
                </div> : ""
            }
        </div>
        // </Link>
    )
}