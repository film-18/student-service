import { memo, useEffect, useState } from "react";
import {
  Image,
  Carousel,
  Row,
  Col,
  Button,
  Typography,
  Layout,
  Pagination,
  Card,
} from "antd";
import { AlertFilled, ExclamationCircleFilled } from "@ant-design/icons";
import data from "../data/news.json";
import { NewsItem } from "../components/NewsItem";
import { CalendarItem } from "../components/CalendarItem";
import axios from "axios";
import { Avatar, Descriptions, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import moment from "moment";
function onChange(a, b, c) {
  console.log(a, b, c);
}

const queryUpdateNews = gql`
  query {
    UpdateNews {
      title
      shortDes
      body
      image
      startDate
      endDate
      _id
    }
  }
`;

export const Home = memo(() => {
  const [news, setNews] = useState(null);
  const {
    data: updateNews,
    refetch: refetchNews,
    loading,
  } = useQuery(queryUpdateNews);

  useEffect(() => {
    console.log(updateNews);
  }, []);

  if (loading) {
    return <><div className="container w-100 p-3 text-center" style={{ height: 500}}><Spin style={{ fontSize: 200 }} /></div></>;
  }

  return (
    <>
      <Layout style={{ backgroundColor: "#112B3C" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 text-start my-5 px-5">
              <Typography.Title level={3} style={{ color: "white" }} mark>
                ล่าสุด!
              </Typography.Title>
              <div className="row">
                <h4 style={{ color: "white" }}>
                  {updateNews?.UpdateNews?.[0].title}
                </h4>
                <div>
                  <p
                    style={{
                      color: "white",
                      overflow: "hidden",
                      width: "100%",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {updateNews?.UpdateNews?.[0].shortDes}
                    <br></br>
                    {updateNews?.UpdateNews?.[0].body}
                  </p>
                </div>
              </div>

              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={() =>
                  (location.href = "/news/" + updateNews?.UpdateNews?.[0]._id)
                }
              >
                <span>อ่านต่อ</span>
              </Button>
            </div>
            <div className="col-12 col-md-6">
              <div className="news-img my-3 text-center">
                <Avatar
                  shape="square"
                  size={300}
                  src={
                    updateNews?.UpdateNews?.[0].image
                      ? updateNews?.UpdateNews?.[0].image
                      : "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <div className="container my-5">
        <Typography.Title level={2}>ข่าวสารและประชาสัมพันธ์</Typography.Title>
        <Row>
          <Col span={8}>
            <Avatar
              shape="square"
              size={400}
              src={
                "https://www.simplilearn.com/ice9/free_resources_article_thumb/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg"
              }
            />
          </Col>
          <Col span={16} style={{ height: 400, overflow: "auto" }}>
            {updateNews?.UpdateNews?.map((n) => (
              <>
                <Link to={`/news/${n._id}`}>
                  <Card bordered={false} hoverable className="mb-2">
                    <Row>
                      <Col span={2} className="text-center py-4">
                        <Typography.Title level={1} className="text-center">
                          {n.startDate === null
                            ? "ไม่มี"
                            : moment(n.startDate).format("DD")}
                          <p>
                            {n.startDate === null
                              ? "กำหนด"
                              : moment(n.startDate)
                                  .add(543, "year")
                                  .format("ll")
                                  .slice(2)}
                          </p>
                        </Typography.Title>
                      </Col>
                      <Col span={17} className="py-1 px-5">
                        <Typography.Title level={4}>
                          {n.title}
                          <p>{n.shortDes}</p>
                        </Typography.Title>
                        <p
                          style={{
                            overflow: "hidden",
                            width: "100%",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {n.body}
                        </p>
                      </Col>
                      <Col span={4}>
                        <Avatar
                          shape="square"
                          size={150}
                          src={
                            n.image
                              ? n.image
                              : "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                          }
                        />
                      </Col>
                    </Row>
                  </Card>
                </Link>
              </>
            ))}
          </Col>
        </Row>

        <div style={{ padding: "30px", paddingTop: "100px" }}>
          <Typography.Title level={2}>ปฏิทินการศึกษา</Typography.Title>
          <CalendarItem lists={updateNews?.updateNews} />
        </div>
        {/* {updateNews?.UpdateNews?.map((_news) => (
          <>
            <h2>
              {_news.title +
                "::startat:" +
                _news.startDate +
                "::endDate:" +
                _news.endDate}
            </h2>
          </>
        ))} */}
      </div>
    </>
  );
});
