import { NewsItem } from "../components/NewsItem";
import news from "../data/news.json";
import "../App.css";
import {
  Avatar,
  List,
  Space,
  Divider,
  Image,
  Button,
  Card,
  Row,
  Col,
  Typography,
} from "antd";
import React from "react";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AccountContext";
import moment from "moment";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const queryNews = gql`
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

export const News = () => {
  const { data: dateNews, refetch } = useQuery(queryNews);
  const { user2: user } = useApp();

  console.log(user);
  // const data = dateNews.from({
  //     length: dateNews.length,
  //   }).map((_, i) => ({
  //     href: 'https://ant.design',
  //     title: dateNews.title,
  //     avatar: 'https://joeschmoe.io/api/v1/random',
  //     description:
  //       dateNews.shortDes,
  //     content:
  //     dateNews.body,
  //   }));

  return (
    <div className="container my-3">
      {user?.role !== "student" ? (
        <div className="text-end">
          <Link to="/news/create">
            <Button type="primary">สร้างโพสต์</Button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="row">
        <Typography.Title level={3} className="text-center">
          ข่าวสาร
        </Typography.Title>
        {dateNews?.UpdateNews?.map((n) => {
          return (
            // n.shortDes n.body n.title n.image n._id
            <div className="col-md-6 my-2">
              <Link to={`/news/${n._id}`}>
                <div className="site-card-border-less-wrapper">
                  <Card bordered={false} hoverable>
                    <Row>
                      <Col span={8}>
                        <Avatar
                          shape="square"
                          size={175}
                          src={
                            n.image
                              ? n.image
                              : "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                          }
                        />
                      </Col>
                      <Col span={16}>
                        <h4>{n.title}</h4>
                        <p>
                          {" "}
                          <CalendarOutlined />{" "}
                          {moment(n.startDate).format("DD/MM/YYYY")} -{" "}
                          {moment(n.endDate).format("DD/MM/YYYY")}
                        </p>
                        <p>{n.shortDes}</p>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};
