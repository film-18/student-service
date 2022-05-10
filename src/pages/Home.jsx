import { memo, useEffect, useState } from "react";
import { Image, Carousel, Row, Col, Button, Typography } from 'antd';
import { AlertFilled } from '@ant-design/icons';
import data from "../data/news.json"
import { NewsItem } from "../components/NewsItem";
import { CalendarItem } from "../components/CalendarItem";
import axios from 'axios'


function onChange(a, b, c) {
    console.log(a, b, c);
}

const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
};


export const Home = memo(() => {

    const [news, setNews] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/news')
            .then((res) => {
                console.log(res.data);
                setNews(res.data)
            })
    }, [])

    return <>
        <Carousel afterChange={onChange}>
            <div>
                <h3 style={contentStyle}>
                    <img src="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/itkmitl-panorama-1.jpg" style={{ width: "100%", height: "500px", objectFit: "cover" }}></img>

                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>

        </Carousel>
        <div style={{ padding: '30px' }} div className="container">
            <Typography.Title level={3}>
            ข่าวสารและประชาสัมพันธ์
            </Typography.Title>
            {/* <p className="thaiFont">
                ข่าวสารและประชาสัมพันธ์
            </p> */}
            <div className="news">
                <div className="news-main">
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
            </div>

            <Button type="primary" shape="round" size="large" style={{ marginTop: '30px', float: 'right' }} icon={<AlertFilled />}>
                <span className="thaiFont">
                    ข่าวสารเพิ่มเติม
                </span>
            </Button>
            
            <div style={{ padding: '30px', paddingTop: '100px' }}>
                <Typography.Title level={3}>
                    ปฏิทินการศึกษา
                </Typography.Title>
                {/* <p className="thaiFont" style={{ fontSize: '40px' }}>
                    ปฏิทินการศึกษา
                </p> */}
                <CalendarItem lists={{}} />
            </div>
            {news?.map(_news => <>
                <h2>
                    {_news.title}
                </h2>
                <p>
                    {_news.content}
                </p>
            </>)}
        </div>

    </>

});