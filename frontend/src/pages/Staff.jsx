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

const { Meta } = Card;
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

export const Staff = memo(() => {
  return (
    <>
      <div className="container my-5 text-center">
        <div className="row mb-2">
          <Typography.Title level={3}>IT Kmitl Staff</Typography.Title>
        </div>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Academic Staff" key="1">
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
          <TabPane tab="Support Staff" key="2">
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
        </Tabs>
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col-4">
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{ width: 240 }}
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </div>
          <div className="col-4">
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{ width: 240 }}
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </div><div className="col-4">
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{ width: 240 }}
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </div>    
        </div>
      </div> */}
    </>
  );
});
