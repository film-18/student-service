import { Button, Modal } from "antd";
import { useState, useEffect, useCallback, useMemo } from "react";
import { RequestHeader } from "../components/Services/RequestHeader";
import { RequestInput } from "../components/Services/RequestInput";
import { useApp } from "../contexts/AccountContext";

import data from "../data/students.json";
import reqInfo from "../data/requestInfo.json";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";

const CREATE_REQUEST_MUTATION = gql`
  mutation ($record: CreateOneGeneralRequestInput!) {
    createGeneralRequest(record: $record) {
      recordId
    }
  }
`;

const USER_QUERY = gql`
  query {
    users {
      _id
      fullname
      role
    }
  }
`;
const createNotification = gql`
  mutation ($record: CreateOneNotificationInput!) {
    createnotification(record: $record) {
      recordId
    }
  }
`;

// const { Option } = Select;
export const GeneralRequest = () => {
  const navigate = useNavigate();
  // const { user } = useGoogle()
  const { user2: user } = useApp();
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [content, setContent] = useState([]);

  const { data: teacherData, loading } = useQuery(USER_QUERY);

  const [createNoti] = useMutation(createNotification);

  const [createRequestMutation] = useMutation(CREATE_REQUEST_MUTATION);

  useEffect(() => {
    setStudent(user);
    // console.log(user?._id)
  }, [user]);

  const handleCreateRequest = useCallback(
    async (e) => {
      e.preventDefault();
      // console.log(title, content, authorId, tagId)
      const inputReqs = document.querySelectorAll(
        ".student-request :where(input.input-request, textarea.input-request,select.input-request,.input-request input)"
      );

      const teacherName = localStorage.getItem("itss-requestTeacherName");

      // console.log(student);

      const record = {
        title: inputReqs[0].value,
        teacherID: inputReqs[1].value,
        teacherName: teacherName,
        studentIdMongo: user?._id,
        studentId: inputReqs[2].value,
        fullname: inputReqs[3].value,
        degree: inputReqs[4].value,
        year: inputReqs[5].value,
        program: inputReqs[6].value,
        major: inputReqs[7].value,
        semester: inputReqs[8].value,
        school_year: inputReqs[9].value,
        description: inputReqs[10].value,
        status: "teacher_pending",
      };
      console.log(record);

      try {
        await createRequestMutation({
          variables: {
            record,
          },
        });
        await createNoti({
          variables: {
            record: {
              title: record.title,
              status: record.status,
              type: "ใบคำร้องทั่วไป",
              teacherId: record.teacherID,
              studentId: record.studentIdMongo
            },
          },
        });
        const modal = Modal.success({
          content: "สร้างใบคำร้องเสร็จสิ้น",
        });
        setTimeout(() => {
          navigate("/service");
          modal.destroy();
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    },
    [createRequestMutation, user]
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const sendPopup = () => {
    const inputReqs = document.querySelectorAll(
      ".student-request :where(input.input-request, textarea.input-request,select.input-request,.input-request input)"
    );

    const teacherName = teacherData?.users?.find(
      (t) => t._id == inputReqs[1].value
    ).fullname;

    localStorage.setItem("itss-requestTeacherName", teacherName);
    let countEmtry = 0;
    setContent([]);
    inputReqs.forEach((el, i) => {
      if (el.value) {
        if (i == 1) {
          setContent((prev) => {
            return [...prev, teacherName];
          });
        } else {
          setContent((prev) => {
            return [...prev, el.value];
          });
        }
      } else {
        countEmtry++;
      }
    });

    if (!countEmtry) {
      showModal();
    } else {
      alert("ไม่ครบ");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // useEffect(
  //     () => {
  //         setStudents(data)

  //         if (user){
  //             const stdId = user.email.split("@")[0]
  //             if (students){
  //                 const std = students.find(std => std.std_id == stdId)
  //                 setStudent(std);
  //             }
  //         }
  //     },
  //     [data, setStudents, setStudent, user, students]
  // )

  // useEffect(() => {
  //     setStudent(user)
  //     console.log(user._id)
  // }, [user])
  const program = useMemo(() => {
    const programName = {
      Information_Technology: "เทคโนโลยีสารสนเทศ",
      Data_Science_and_Business_Analytics:
        "วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ",
      Business_Information_Technology__International_Program_:
        "เทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
    };
    return programName[user?.program];
  }, [user]);

  const major = useMemo(() => {
    const majorName = {
      "-": "-",
      Software_Engineering: "วิศวกรรมซอฟต์แวร์",
      Network_and_System_Technology: "เทคโนโลยีเครือข่ายและระบบ",
      Multimedia_and_Game_Development: "การพัฒนาสื่อประสมและเกม",
    };
    return majorName[user?.major];
  }, [user]);

  const degree = useMemo(() => {
    const degreeName = {
      Bachelor: "ปริญญาตรี",
      Master: "ปริญญาโท",
      Doctor: "ปริญญาเอก",
    };
    return degreeName[user?.degree];
  }, [user]);

  return (
    <div className="container mt-5 pb-5">
      <h2 className="text-center">สร้างใบคำร้องทั่วไป</h2>
      <RequestHeader text="สำหรับนักศึกษา" />
      <div className="request-col-2 student-request">
        <RequestInput text="หัวข้อเรื่อง" />
        {/* <RequestInput text="ถึงอาจารย์" /> */}
        <div className="request-input">
          <div className="request-input-text">ถึงอาจารย์ :</div>
          <select
            className="input-request w-100"
            style={{
              height: "40px",
              border: "1px solid #d9d9d9",
              borderRadius: "2px",
              padding: "5.7px 11px",
            }}
          >
            {teacherData?.users
              ?.filter((t) => t.role === "teacher")
              .map((t) => (
                <option value={t._id}>{t.fullname}</option>
              ))}
          </select>
        </div>
        <RequestInput
          text="รหัสนักศึกษา"
          value={student ? student.studentID : ""}
          disabled={student ? true : false}
        />
        <RequestInput
          text="ชื่อ - นามสกุล"
          value={
            student
              ? `${student.firstname || ""} ${student.lastname || ""}`
              : ""
          }
          disabled={student ? true : false}
        />
        <RequestInput
          text="ระดับ"
          value={degree ?? ""}
          disabled={student ? true : false}
        />
        <RequestInput
          text="ปี"
          value={student ? student.year : ""}
          disabled={student ? true : false}
        />
        <RequestInput
          text="สาขาวิชา"
          value={program ?? ""}
          disabled={student ? true : false}
        />
        <RequestInput
          text="แขนงวิชา"
          value={major ?? ""}
          disabled={student ? true : false}
        />
        <RequestInput text="ภาคเรียน" />
        <RequestInput text="ปีการศึกษา" />
        <div className="w-100">
          <RequestInput text="รายละเอียด" type="text-area" />
        </div>
        <RequestInput text="วันที่" type="date" />
        <RequestInput text="ลงชื่อ" />
      </div>
      <div className="text-end mt-3 mb-3">
        {/* <Button
                    className="mt-3"
                    type="primary"
                    size="large"
                    onClick={sendPopup}
                >
                    ส่งเรื่อง
                </Button> */}
        {/* <button className="btn btn-primary" onClick={sendPopup}>ส่งเรื่อง</button> */}
        <Button size="large" type="primary" onClick={sendPopup}>
          ส่งเรื่อง
        </Button>
      </div>

      {/* <div className='row'>
                <div className="col teacher-request">
                    <RequestHeader text="สำหรับอาจารย์"/>
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
            </div> */}

      <Modal
        title="ยืนยันใบคำร้องทั่วไป"
        visible={isModalVisible}
        onOk={handleCreateRequest}
        onCancel={handleCancel}
        okText="ส่งใบ"
      >
        {content.map((c, i) => (
          <div key={"ct-" + i}>
            {reqInfo[0].input[i].nameTH} : {c}
          </div>
        ))}
        <div className="mt-3 text-secondary">
          กรุณาตรวจสอบใบคำร้องอีกครั้ง ถ้าข้อมูล<ins>ครบ</ins>และ
          <ins>ถูกต้อง</ins> กรุณากดปุ่ม ส่งใบ
        </div>
      </Modal>
    </div>
  );
};
