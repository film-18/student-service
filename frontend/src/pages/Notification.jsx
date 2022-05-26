import { memo, useEffect, useState } from "react";
import { Avatar, List, Card, Row, Col, Typography, Spin, Empty } from "antd";
const { Title } = Typography;
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useApp } from "../contexts/AccountContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";

const queryFromStudent = gql`
  query ($studentId: String!) {
    notification(filter: { studentId: $studentId }) {
      title
      createdAt
      type
      status
    }
  }
`;

const queryFromTeacher = gql`
  query ($teacherId: String!) {
    notification(filter: { teacherId: $teacherId }) {
      title
      createdAt
      type
      status
    }
  }
`;

const queryFromStaff = gql`
  query {
    notification(filter: { status: "staff_pending" }) {
      title
      createdAt
      type
      status
    }
  }
`;

const queryFromDean = gql`
  query {
    notification(filter: { status: "dean_pending" }) {
      title
      createdAt
      type
      status
    }
  }
`;

export const Notification = memo(() => {
  const { user2: user } = useApp();
  return (
    <>
      <div className="container" style={{ height: 500, overflow: "auto" }}>
        <div className="row">
          <Typography.Title level={3} className="text-center">
            การแจ้งเตือน
          </Typography.Title>
          <General role={user?.role}></General>
        </div>
      </div>
    </>
  );
});

const General = ({ role }) => {
  const { user2: user } = useApp();
  const { data: queryStudent, loading } = useQuery(queryFromStudent, {
    variables: {
      studentId: user?._id,
    },
  });
  const { data: queryTeacher } = useQuery(queryFromTeacher, {
    variables: {
      teacherId: user?._id,
    },
  });
  const { data: queryStaff } = useQuery(queryFromStaff);
  const { data: queryDean } = useQuery(queryFromDean);

  if (loading) {
    return (
      <>
        <div
          className="container w-100 p-3 text-center"
          style={{ height: 500 }}
        >
          <Spin style={{ fontSize: 200 }} />
        </div>
      </>
    );
  }

  if (!user) {
    return <><Empty /></>;
  }

  if (role == "student") {
    return (
      <>
        <Noticard prop={queryStudent}></Noticard>
      </>
    );
  } else if (role == "teacher") {
    return (
      <>
        <Noticard prop={queryTeacher}></Noticard>
      </>
    );
  } else if (role == "staff") {
    return (
      <>
        <Noticard prop={queryStaff}></Noticard>
      </>
    );
  } else if (role == "staff") {
    return (
      <>
        <Noticard prop={queryDean}></Noticard>
      </>
    );
  } else {
    return <div></div>;
  }
};

const Noticard = ({ prop }) => {
  return (
    <>
      {prop?.notification?.map((item) => (
        <>
          <Card bordered={false} className="my-2" hoverable>
            <Row>
              <Col span={7}>{moment(item.createdAt).format("llll")}</Col>
              <Col span={10} className="text-center">
                ใบคำร้องทั่วไป : {item.title}
              </Col>
              <Col span={7} className="text-center">
                <Status status={item.status}></Status>
              </Col>
            </Row>
          </Card>
        </>
      ))}
    </>
  );
};

const Status = ({ status }) => {
  return (
    <>
      {status === "approved" ? (
        <Title level={5} className="text-success">
          <CheckCircleOutlined /> อนุมัติแล้ว
        </Title>
      ) : (
        ""
      )}
      {status === "rejected" ? (
        <Title level={5} className="text-danger">
          <CloseCircleOutlined /> ถูกปฏิเสธ
        </Title>
      ) : (
        ""
      )}
      {status === "teacher_pending" ? (
        <Title level={5} className="text-warning">
          <QuestionCircleOutlined /> อาจารย์กำลังดำเนินการ
        </Title>
      ) : (
        ""
      )}
      {status === "staff_pending" ? (
        <Title level={5} className="text-warning">
          <QuestionCircleOutlined /> เจ้าหน้าที่กำลังดำเนินการ
        </Title>
      ) : (
        ""
      )}
      {status === "dean_pending" ? (
        <Title level={5} className="text-warning">
          <QuestionCircleOutlined /> คณบดีกำลังดำเนินการ
        </Title>
      ) : (
        ""
      )}
    </>
  );
};
