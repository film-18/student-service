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
} from "antd";
import { AlertFilled, ExclamationCircleFilled } from "@ant-design/icons";
import data from "../data/news.json";
import { NewsItem } from "../components/NewsItem";
import { CalendarItem } from "../components/CalendarItem";
import axios from "axios";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { gql, useQuery, useMutation } from "@apollo/client";

function onChange(a, b, c) {
  console.log(a, b, c);
}

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

// const contentStyle = {
//     height: '500px',
//     color: '#fff',
//     lineHeight: '500px',
//     textAlign: 'center',
//     background: '#364d79',
// };

export const Home = memo(() => {
  const [news, setNews] = useState(null);
  const { data: staff, refetch } = useQuery(queryStaff);

  useEffect(() => {
    axios.get("http://localhost:8000/news").then((res) => {
      console.log(res.data);
      setNews(res.data);
    });
  }, []);

  return (
    <>
      {/* <Carousel afterChange={onChange}>
            <div>
                <h3 style={contentStyle}>
                    <img src="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/itkmitl-panorama-1.jpg" style={{ width: "100%", height: "500px", objectFit: "cover"}}></img>
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>

        </Carousel> */}

      <Layout style={{ backgroundColor: "#112B3C" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 text-start my-5">
              <Typography.Title level={3} style={{ color: "#08979c" }} mark>
                ล่าสุด !{/* <ExclamationCircleFilled /> */}
              </Typography.Title>
              <h4 style={{ color: "#08979c" }}>
                Undergraduate Admission – TCAS Round 5 Academic Year 2019
              </h4>
              <p style={{ color: "#08979c" }}>
                Faculty of Information Technology announces the list of
                qualified applicants to be interview on Thursday, June 13, 2019
                at Faculty of Information Technology Building, 1st Floor, Room
                M04, KMITL.
              </p>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={() => (location.href = "/news")}
              >
                <span>อ่านเพิ่มเติม</span>
              </Button>
            </div>
            <div className="col-12 col-md-6">
              <div className="news-img">
                <img
                  src="https://www.it.kmitl.ac.th/wp-content/uploads/2019/06/1300x867_BSC_TCAS-5-2562-ANNOUCEMENT-OF-QUALIFIED-CANDIDATES-FOR-INTERVIEW.jpg"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <div className="container my-5">
        <Typography.Title level={2}>ข่าวสารและประชาสัมพันธ์</Typography.Title>
        <div className="row">
          <div className="col-12">
            <div className="news">
              <div
                className="news-main"
                style={{ color: "#f5f5f5", backgroundColor: "#112B3C" }}
              >
                <div className="news-img">
                  <img
                    src="https://www.it.kmitl.ac.th/wp-content/uploads/2019/06/1300x867_BSC_TCAS-5-2562-ANNOUCEMENT-OF-QUALIFIED-CANDIDATES-FOR-INTERVIEW.jpg"
                    width="100%"
                  />
                </div>
                <div
                  className="m-2"
                  style={{ color: "#f5f5f5", backgroundColor: "#112B3C" }}
                >
                  <div className="news-topic">{data[0].topic}</div>
                  <span className="news-date">{data[0].date}</span>
                  <div className="news-short">{data[0].short}</div>
                </div>
              </div>
              <div className="news-list">
                <NewsItem news={data[0]} />
                <NewsItem news={data[0]} />
                <NewsItem news={data[0]} />
              </div>
            </div>
            <div className="text-center my-3">
              <Pagination size="small" total={50} />
            </div>
          </div>
        </div>

        <div style={{ padding: "30px", paddingTop: "100px" }}>
          <Typography.Title level={2}>ปฏิทินการศึกษา</Typography.Title>
          <CalendarItem lists={{}} />
        </div>
        {news?.map((_news) => (
          <>
            <h2>{_news.title}</h2>
            <p>{_news.content}</p>
          </>
        ))}

        <div className="container text-center my-5">
          <div className="row">
            <Typography.Title level={2} className="mb-4">
              เจ้าหน้าที่ห้องฟ้า
            </Typography.Title>
            {staff?.users?.map((s) => (
              <div className="col-4">
                <div className="mt-5">
                  <Avatar size={200} src={<Image src={s.imageUri}   />} />
                </div>
                <h2>{s.fullname}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="container text-center">
          <div className="row">
            <Typography.Title level={2} className="mb-4">
              อาจารย์
            </Typography.Title>
          </div>
        </div>
      </div>
      {/* <div style={{ padding: '30px' }} div className="container"> */}
      {/* <Typography.Title level={4}>
                ข่าวสารและประชาสัมพันธ์
            </Typography.Title>

            <div className="news" >
                <div className="news-main" style={{ backgroundColor: "#112B3C" }}>
                    <div className="news-img"><img src={data[0].images[0]} width="100%" /></div>
                    <div className="news-detail">
                        <div className="news-topic">{data[0].topic}</div>
                        <span className="news-date">{data[0].date}</span>
                        <div className="news-short">{data[0].short}</div>
                    </div>
                </div>
                <div className="news-list">
                    <NewsItem news={data[0]} />
                    <NewsItem news={data[0]} />
                    <NewsItem news={data[0]} />
                </div>
            </div> */}

      {/* <Button type="primary" shape="round" size="large" style={{ marginTop: '30px', float: 'right' }} icon={<AlertFilled />} onClick={() => location.href = '/news'}>
                <span className="thaiFont">
                    ข่าวสารเพิ่มเติม
                </span>
            </Button> */}

      {/* <div style={{ padding: '30px', paddingTop: '100px' }}>
                <Typography.Title level={3}>
                    ปฏิทินการศึกษา
                </Typography.Title>
                <CalendarItem lists={{}} />
            </div>
            {news?.map(_news => <>
                <h2>
                    {_news.title}
                </h2>
                <p>
                    {_news.content}
                </p>
            </>)} */}
      {/* </div> */}
    </>
  );
});
