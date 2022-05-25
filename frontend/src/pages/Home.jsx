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
import { Avatar, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { gql, useQuery, useMutation } from "@apollo/client";

function onChange(a, b, c) {
    console.log(a, b, c);
}



const queryUpdateNews = gql`
query{
    news {
      title,
      shortDes,
      body,
      image,
      startDate,
      endDate,
    }
  }`;


// const contentStyle = {
//     height: '500px',
//     color: '#fff',
//     lineHeight: '500px',
//     textAlign: 'center',
//     background: '#364d79',
// };

export const Home = memo(() => {
    const [news, setNews] = useState(null);
    const { data: updateNews, refetch: refetchNews } = useQuery(queryUpdateNews);

    useEffect(() => {
        console.log(updateNews)
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
                            <div className="row">
                                <h4 style={{ color: "#08979c" }}>
                                    {updateNews?.news?.[0].title}
                                </h4>
                                <p style={{ color: "#08979c" }}>
                                    {updateNews?.news?.[0].shortDes}
                                <br></br>
                                    {updateNews?.news?.[0].body}</p>
                            </div>
                            
                            <Button
                                type="primary"
                                shape="round"
                                size="large"
                                onClick={() => (location.href = "/news")}
                            >
                                <span>ข่าวเพิ่มเติม</span>
                            </Button>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="news-img my-3 text-center">
                                    <img
                                        src={updateNews?.news?.[0].image}
                                        width="auto"
                                        height="300px"
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
                    <CalendarItem lists={updateNews?.news} />
                </div>
                {updateNews?.news?.map((_news) => (
                    <>
                        <h2>{_news.title+"::startat:"+_news.startDate+"::endDate:"+_news.endDate}</h2>
                    </>
                ))}

                {/* <div className="container text-center">
          <div className="row">
            <Typography.Title level={2} className="mb-4">
              อาจารย์
            </Typography.Title>
          </div>
        </div> */}
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
