import { memo, useEffect, useState, useCallback } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Button, Popover, Modal, Checkbox, Form, Input, Select } from "antd";
const { Option } = Select;
import { Outlet, Link } from "react-router-dom";
const { Meta } = Card;
import { gql, useQuery, useMutation } from "@apollo/client";

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

export const Profile = memo(() => {
  const { data: profileData, refetch: refetchStaff } = useQuery(queryProfile, {
    variables: { username: "student2" },
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [profile, setprofile] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = (data) => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      {profileData?.users?.map((p) => (
        <>
          <div className="container">
            <div className="row" style={{ backgroundColor: "white" }}>
              <div className="col-md-4 p-5 text-center">
                <img
                  className="rounded-circle"
                  src={
                    p.imageUri
                      ? p.imageUri
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  style={{ width: "60%" }}
                ></img>
                <h5>{p.firstname}</h5>
                <p>@{p.username}</p>

                <Button
                  className="mt-3"
                  type="primary"
                  size="large"
                  onClick={showModal}
                >
                  แก้ไข
                </Button>
              </div>
              <div className="col-md-8 p-5">
                <h3>{p.fullname}</h3>
                <p>{p.email}</p>
                <p>{p.studentId ? p.studentId : ""}</p>
                {p.role === "student" ? (
                  <div>
                    <p>Year: {p.year}</p>
                    <p>Degree: {p.degree}</p>
                    <p>Program: {p.program}</p>
                    <p>Major: {p.major}</p>
                  </div>
                ) : (
                  <p>Role: {p.role}</p>
                )}
                <p>Tel: {p.telephone}</p>
              </div>
            </div>
            <Modal
              visible={visible}
              title="แก้ไขข้อมูลส่วนตัว"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                name="basic"
                labelCol={{
                  span: 5,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input defaultValue={p.username} />
                </Form.Item>
                <Form.Item
                  label="Firstname"
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstname!",
                    },
                  ]}
                >
                  <Input defaultValue={p.firstname} />
                </Form.Item>
                <Form.Item
                  label="Lastname"
                  name="lastname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your lastname!",
                    },
                  ]}
                >
                  <Input defaultValue={p.lastname} />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Invalid email",
                    },
                  ]}
                >
                  <Input defaultValue={p.email} />
                </Form.Item>
                <Form.Item
                  label="Tel"
                  name="telephone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your contact num!",
                    },
                  ]}
                >
                  <Input defaultValue={p.telephone} />
                </Form.Item>
                <Form.Item label="Year">
                  <Select defaultValue={p.year}>
                    {/* ['Bachelor', 'Master', 'Doctor', '-'], */}
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Degree">
                  <Select defaultValue={p.degree}>
                    {/* ['Bachelor', 'Master', 'Doctor', '-'], */}
                    <Option value="-">-</Option>
                    <Option value="Bachelor">Bachelor</Option>
                    <Option value="Master">Master</Option>
                    <Option value="Docter">Docter</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Program">
                  <Select defaultValue={p.program}>
                    {/* ['Information Technology', 'Data Science and Business Analytics', 'Business Information Technology (International Program)', '-'] */}
                    <Option value="-">-</Option>
                    <Option value="Information Technology">
                      Information Technology
                    </Option>
                    <Option value="Data Science and Business Analytics">
                      Data Science and Business Analytics
                    </Option>
                    <Option value="Business Information Technology (International Program)">
                      Docter
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Major">
                  <Select defaultValue={p.major}>
                    {/* 'Software Engineering', 'Network and System Technology', 'Multimedia and Game Development', '-' */}
                    <Option value="-">-</Option>
                    <Option value="Software Engineering">
                      Software Engineering
                    </Option>
                    <Option value="Network and System Technology">
                      Network and System Technology
                    </Option>
                    <Option value="Multimedia and Game Development">
                      Multimedia and Game Development
                    </Option>
                  </Select>
                </Form.Item>
              </Form>
              <Button
                className="mt-3"
                type="danger"
                size="large"
                onClick={handleCancel}
              >
                ยกเลิก
              </Button>
              <Button
                className="mt-3"
                type="primary"
                size="large"
                onClick={showModal}
              >
                ยืนยันการแก้ไข
              </Button>
            </Modal>
          </div>
        </>
      ))}
    </>
  );
});
