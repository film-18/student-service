import { memo, useEffect, useCallback, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  List,
  Typography,
  Divider,
  Tabs,
  Modal,
  Layout,
} from "antd";
import { Radio, Input } from "antd";

import { DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Spin, Space, Empty } from "antd";
import { Button, Popover } from "antd";

import requestTopics from "../data/requestInfo.json";
import RequestInfo from "../data/ResquestInfo";
import { RequestTopic } from "../components/Services/RequestTopic";
import { RequestList } from "../components/Services/RequestList";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useApp } from "../contexts/AccountContext";
const { TabPane } = Tabs;
// const data = [
//     'Racing car sprays burning fuel into crowd.',
//     'Japanese princess to wed commoner.',
//     'Australian walks 100km after outback crash.',
//     'Man charged over missing wedding girl.',
//     'Los Angeles battles huge wildfires.',
// ];

const { Meta } = Card;

const USER_QUERY = gql`
  query ($id: MongoID!) {
    userId(_id: $id) {
      role
      RequestedGeneral {
        title
        status
        _id
        updatedAt
      }
      RequestedLeave {
        title
        status
        _id
        leaveType
        updatedAt
      }
      DoRequestGeneral {
        title
        status
        _id
        updatedAt
      }
      DoRequestLeave {
        title
        status
        _id
        leaveType
        updatedAt
      }
    }
  }
`;

const REQUEST_QUERY = gql`
  query {
    generalRequest {
      title
      status
      _id
      updatedAt
    }
    leaveRequest {
      title
      status
      _id
      leaveType
      updatedAt
    }
  }
`;

export const Service = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState([...RequestInfo]);
  const [isError, setIsError] = useState(false);
  const [requestPopup, setRequestPopup] = useState(null);

  const { user2: user } = useApp();

  const {
    data: dataService,
    refetch,
    loading,
  } = useQuery(USER_QUERY, {
    variables: {
      id: user?._id ?? "628c892d914de55bf71b90be",
      // id: "628cd69016475755ddf0f005"
    },
  });

  const { data: dataAllRequest } = useQuery(REQUEST_QUERY);

  const showModal = useCallback(
    (req) => () => {
      setRequestPopup(req);
      setIsModalVisible(true);
    },
    []
  );

  const handleCreate = useCallback(
    (page) => () => {
      window.location.href = `service/${page}/create`;
      setIsModalVisible(false);
    },
    []
  );

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isError)
    return (
      <>
        <div>
          <Spin size="large" />
        </div>
      </>
    );

  const [requests, setRequests] = useState(null);
  const [filterRequest, setfilterRequest] = useState({});
  const [value, setValue] = useState("all");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!dataService || !dataAllRequest) {
      console.log("No!");
      setRequests(null);
    } else if (dataService?.userId?.role === "student") {
      console.log("STUDENT : " + dataService?.userId?.role);
      setRequests([
        [...dataService?.userId?.RequestedGeneral],
        [...dataService?.userId?.RequestedLeave],
      ]);
    } else if (dataService?.userId?.role === "teacher") {
      console.log("TEACHER : " + dataService?.userId?.role);
      let reqs = [];
      if (dataService.userId.DoRequestGeneral) {
        reqs.push(dataService.userId.DoRequestGeneral);
      } else {
        reqs.push([]);
      }
      if (dataService.userId.DoRequestLeave) {
        reqs.push(dataService.userId.DoRequestLeave);
      } else {
        reqs.push([]);
      }
      setRequests(reqs);
    } else {
      console.log("OTHER : " + dataService?.userId?.role);
      console.log(dataAllRequest);
      setRequests([
        dataAllRequest?.generalRequest,
        dataAllRequest?.leaveRequest,
      ]);
      // setRequests([dataAllRequest?.generalRequest.filter((r) => r.status === "staff_pending"), dataAllRequest?.leaveRequest.filter((r) => r.status === "staff_pending")])
    }
    refetch();
  }, [dataService, setRequests, dataAllRequest]);

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
    return (
      <>
        <div
          className="container w-100 p-3 text-center"
          style={{ height: 400 }}
        >
          <Empty description={"????????????????????????????????????????????????????????????????????????????????????"} />
          <Link to="/login">?????????????????????????????????</Link>
        </div>
      </>
    );
  }
  return (
    <>
      <Layout
        style={{
          background:
            "linear-gradient(180deg, #112B3C 70%, rgb(235, 245, 255) 50%)",
        }}
      >
        <div className="container my-5 text-center">
          <div className="row mb-2">
            <Typography.Title level={3} style={{ color: "#d9d9d9" }}>
              ????????????????????????????????????
            </Typography.Title>
            <p style={{ color: "#d9d9d9" }}>
              ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
          </div>
          <div className="row mb-0">
            {requestTopics.map((request) => (
              <>
                <div className="col-md-6 col-lg-3 mb-5  justify-content-center d-flex">
                  <RequestTopic request={request} toggleModal={showModal} />
                </div>
              </>
            ))}
          </div>
        </div>
      </Layout>
      <div className="container ">
        <div className="request-body row justify-content-center">
          <Radio.Group
            onChange={onChange}
            value={value}
            className="text-center mb-3"
          >
            <Space direction="horizontal">
              <Radio value={"all"}>????????????????????????????????????</Radio>
              <Radio value={"success"}>???????????????????????????</Radio>
              <Radio value={"fail"}>??????????????????</Radio>
              <Radio value={"pending"}>??????????????????????????????????????????</Radio>
            </Space>
          </Radio.Group>
          <Tabs defaultActiveKey="0">
            <TabPane tab="?????????????????????" key="0" className="request-list">
              <div className="d-flex flex-column-reverse">
                {(requests && value == "all"
                  ? [...requests[0], ...requests[1]]
                  : []
                ).map((req) => (
                  <RequestList request={req} />
                ))}
                {(requests && value == "success"
                  ? [
                      ...requests[0].filter((x) => x.status == "approved"),
                      ...requests[1].filter((x) => x.status == "approved"),
                    ]
                  : []
                ).map((req) => (
                  <RequestList request={req} />
                ))}
                {(requests && value == "fail"
                  ? [
                      ...requests[0].filter((x) => x.status == "rejected"),
                      ...requests[1].filter((x) => x.status == "rejected"),
                    ]
                  : []
                ).map((req) => (
                  <RequestList request={req} />
                ))}
                {(requests && value == "pending"
                  ? [
                      ...requests[0].filter(
                        (x) =>
                          x.status == "teacher_pending" ||
                          x.status == "staff_pending" ||
                          x.status == "dean_pending"
                      ),
                      ...requests[1].filter(
                        (x) =>
                          x.status == "teacher_pending" ||
                          x.status == "staff_pending" ||
                          x.status == "dean_pending"
                      ),
                    ]
                  : []
                ).map((req) => (
                  <RequestList request={req} />
                ))}
              </div>
            </TabPane>
            <TabPane tab="??????????????????????????????????????????" key="1" className="request-list">
              <div className="d-flex flex-column-reverse">
                {(requests && value == "all" ? requests[0] : []).map((req) => (
                  <RequestList request={req} />
                ))}
                {(requests && value == "success"
                  ? requests[0].filter((x) => x.status == "approved")
                  : []
                ).map((req) => (
                  <RequestList request={req} />
                ))}
                {(requests && value == "fail"
                  ? requests[0].filter((x) => x.status == "rejected")
                  : []
                ).map((req) => (
                  <RequestList request={req} />
                ))}
                {(requests && value == "pending"
                  ? requests[0].filter(
                      (x) =>
                        x.status == "teacher_pending" ||
                        x.status == "staff_pending" ||
                        x.status == "dean_pending"
                    )
                  : []
                ).map((req) => (
                  <RequestList request={req} />
                ))}
              </div>
            </TabPane>
            <TabPane tab="????????????????????????" key="2" className="request-list">
              <div className="d-flex flex-column-reverse">
                {(requests && value == "all" ? requests[1] : [])
                  .filter((l) => l.leaveType === "Sick")
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
                {(requests && value == "success" ? requests[1] : [])
                  .filter(
                    (l) => l.leaveType === "Sick" && l.status == "approved"
                  )
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
                {(requests && value == "fail" ? requests[1] : [])
                  .filter(
                    (l) => l.leaveType === "Sick" && l.status == "rejected"
                  )
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
                {(requests && value == "pending" ? requests[1] : [])
                  .filter(
                    (l) =>
                      l.leaveType === "Sick" &&
                      (l.status == "teacher_pending" ||
                        l.status == "staff_pending" ||
                        l.status == "dean_pending")
                  )
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
              </div>
            </TabPane>
            <TabPane tab="?????????????????????" key="3" className="request-list">
              <div className="d-flex flex-column-reverse">
                {(requests && value == "all" ? requests[1] : [])
                  .filter((l) => l.leaveType === "Business")
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
                {(requests && value == "success" ? requests[1] : [])
                  .filter(
                    (l) => l.leaveType === "Business" && l.status == "approved"
                  )
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
                {(requests && value == "fail" ? requests[1] : [])
                  .filter(
                    (l) => l.leaveType === "Business" && l.status == "rejected"
                  )
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
                {(requests && value == "pending" ? requests[1] : [])
                  .filter(
                    (l) =>
                      l.leaveType === "Business" &&
                      (l.status == "teacher_pending" ||
                        l.status == "staff_pending" ||
                        l.status == "dean_pending")
                  )
                  .map((req) => (
                    <RequestList request={req} />
                  ))}
              </div>
            </TabPane>
            <TabPane tab="?????????????????????????????????????????????" key="4" className="request-list">
              <Empty description="?????????????????????????????????????????????" />
            </TabPane>
          </Tabs>
        </div>

        {requestPopup ? (
          <Modal
            className="p-5"
            visible={isModalVisible}
            //onOk={this.handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <h2 className="text-center mb-3 fs-3">{requestPopup.name}</h2>
            <h6>???????????????????????????????????? {requestPopup.category.join(" ")}</h6>
            <h6>?????????????????????????????? : {requestPopup.description}</h6>
            <div class="row">
              <Button
                className="mt-4"
                size="large"
                icon={<DownloadOutlined />}
                href={
                  requestPopup?.name === "??????????????????????????????????????????"
                    ? "https://s3.ktnis.me/std-service/????????????????????????????????????.pdf"
                    : "https://s3.ktnis.me/std-service/????????????????????????????????????????????????????????????????????????????????????.pdf"
                }
                target="_blank"
              >
                ?????????????????????????????????????????????
              </Button>

              <Button
                className="mt-3"
                type="primary"
                size="large"
                onClick={handleCreate(requestPopup.page)}
              >
                ?????????????????????????????????
              </Button>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </>
  );
});
