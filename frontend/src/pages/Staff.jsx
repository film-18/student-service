import { memo } from "react";
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
import staffInfo from "../data/staff.json";
import { gql, useQuery, useMutation } from "@apollo/client";

const queryStaff = gql`
  query {
    users(filter: { role: staff }) {
      fullname
      firstname
      lastname
      username
      password
      email
      year
      role
      degree
      program
      major
      _id
      imageUri
    }
  }
`;


const { Meta } = Card;
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

export const Staff = memo(() => {
  const { data: staff, refetch: refetchStaff } = useQuery(queryStaff);
  return (
    <>
      <div className="container my-3 text-center">
        <div className="row mb-2">
          <Typography.Title level={3}>บุคลลากร</Typography.Title>
        </div>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="บุคลากรสายวิชาการ" key="1">
            <div className="row">
              {staffInfo
                .filter((s) => s.type === "Academic")
                .map((staff) => (
                  <div className="col-md-3 mb-3">
                    <Card
                      small
                      hoverable
                      cover={<img alt="example" src={staff.imgUri} />}
                    >
                      <Meta title={staff.name} description={staff.email} />
                    </Card>
                  </div>
                ))}
            </div>
          </TabPane>
          <TabPane tab="บุคลากรสายสนับสนุน" key="2">
            <div className="row">
              {staffInfo
                .filter((s) => s.type === "Support")
                .map((staff) => (
                  <div className="col-md-3 mb-3">
                    <Card
                      small
                      hoverable
                      cover={<img alt="example" src={staff.imgUri} />}
                    >
                      <Meta title={staff.name} description={staff.email} />
                    </Card>
                  </div>
                ))}
            </div>
          </TabPane>
          <TabPane tab="เจ้าหน้าที่ห้องฟ้า" key="3">
            <div className="row">
              {staff?.users?.map((s) => (
                <div className="col-md-3 mb-3">
                  <Card
                    small
                    hoverable
                    cover={<img alt="example" src={s.imageUri} />}
                  >
                    <Meta title={s.fullname} description={s.email} />
                  </Card>
                </div>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
});
