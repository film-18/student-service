import { memo, useEffect, useState, useCallback } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, } from "antd"; 
import { Button, Popover, Modal, Checkbox, Form, Input, Select,Spin } from "antd";
const { Option } = Select;
import { Outlet, Link } from "react-router-dom";
const { Meta } = Card;
import { gql, useQuery, useMutation } from "@apollo/client";
import { useApp } from "../contexts/AccountContext";
import { useNavigate } from "react-router-dom";

const queryProfile = gql`
  query ($username: String) {
    users(filter: { username: $username }) {
      fullname
      firstname
      lastname
      username
      password
      telephone
      email
      year
      role
      degree
      program
      major
      imageUri
      _id
    }
  }
`;

const editProfile = gql`
  mutation ($record: UpdateByIdUserInput!, $_id: MongoID!) {
    updateuserId(_id: $_id, record: $record) {
      recordId
    }
  }
`;

// const record = {
//   username,
//   firstname,
//   lastname,
//   email,
//   telephone
// }

export const Profile = memo(() => {
  const { user2: user, refetch,loading } = useApp();

  const [visible, setVisible] = useState(false);

  const [edit] = useMutation(editProfile);

  const [username, setusername] = useState(null);
  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [email, setemail] = useState(null);
  const [telephone, settelephone] = useState(null);
  const [imageUri, setimage] = useState(null);

  useEffect(() => {
    if (user) {
      setusername(user.username);
      setfirstname(user.firstname);
      setlastname(user.lastname);
      setemail(user.email);
      settelephone(user.telephone);
      setimage(user.imageUri);
    }
  }, [
    user,
    setusername,
    setfirstname,
    setlastname,
    setimage,
    setemail,
    settelephone,
  ]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    const record = {
      username,
      firstname,
      lastname,
      email,
      telephone,
      imageUri,
    };
    console.log(record);
    try {
      await edit({
        variables: {
          _id: user._id,
          record,
        },
      });
      refetch();

      const modal = Modal.success({
        content: "โพสต์เสร็จสิ้น",
      });
      setTimeout(() => {
        modal.destroy;
      }, 500);
      setVisible(false);
    } catch {
      console.log("error");
    }
  };

  const handleCancel = () => {
    setusername(user.username);
    setfirstname(user.firstname);
    setlastname(user.lastname);
    setemail(user.email);
    setimage(user.imageUri);
    settelephone(user.telephone);
    setVisible(false);
  };
  if (loading) {
    return <><div className="container w-100 p-3 text-center" style={{ height: 500}}><Spin style={{ fontSize: 200 }} /></div></>;
  }

  return (
    <>
      <div className="container">
        <div className="row" style={{ backgroundColor: "white" }}>
          <div className="col-md-4 p-5 text-center">
            <Avatar
              size={200}
              src={
                user?.imageUri
                  ? user.imageUri
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              }
              
            />
            <h5 className="mt-3">{user?.firstname}</h5>
            <p>@{user?.username}</p>

            <Button
              className="mt-3"
              type="primary"
              size="large"
              onClick={showModal}
            >
              แก้ไขข้อมูล
              <EditOutlined />
            </Button>
          </div>
          <div className="col-md-8 p-5">
            <h3>
              {user?.firstname} {user?.lastname}
            </h3>
            <p>{user?.email}</p>
            <p>{user?.studentId ? user?.studentId : ""}</p>
            {user?.role === "student" ? (
              <div>
                <p>Year: {user?.year}</p>
                <p>Degree: {user?.degree}</p>
                <p>Program: {user?.program}</p>
                <p>Major: {user?.major}</p>
              </div>
            ) : (
              <p>Role: {user?.role}</p>
            )}
            <p>Tel: {user?.telephone}</p>
          </div>
        </div>
        <Modal visible={visible} onCancel={handleCancel} footer={null}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h3>Edit Profile</h3>
                ชื่อผู้ใช้
                <Input
                  className="input-request"
                  onChange={(e) => setusername(e.target.value)}
                  value={username}
                ></Input>
                ชื่อจริง
                <Input
                  className="input-request"
                  onChange={(e) => setfirstname(e.target.value)}
                  value={firstname}
                ></Input>
                นามสกุล
                <Input
                  className="input-request"
                  onChange={(e) => setlastname(e.target.value)}
                  value={lastname}
                ></Input>
                อีเมล์
                <Input
                  className="input-request"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                ></Input>
                เบอร์โทรศัพท์
                <Input
                  className="input-request"
                  onChange={(e) => settelephone(e.target.value)}
                  value={telephone}
                ></Input>
                ลิงก์รูปภาพ
                <Input
                  className="input-request"
                  onChange={(e) => setimage(e.target.value)}
                  value={imageUri}
                ></Input>
                <div className="mb-3">ตัวอย่างรูปภาพ</div>
                <img src={imageUri} alt="" width="70%" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-2 mx-3">
                    <Button
                      className="mt-3"
                      type="danger"
                      size="large"
                      onClick={handleCancel}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                  <div className="col-2">
                    <Button
                      className="mt-3"
                      type="primary"
                      size="large"
                      onClick={handleOk}
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
});
