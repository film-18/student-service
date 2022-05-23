import { NewsItem } from '../components/NewsItem'
import news from '../data/news.json'
import '../App.css'
import { Avatar, List, Space, Divider, Image } from 'antd';
import React from 'react';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { gql, useQuery, useMutation } from "@apollo/client"





const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


const queryNews = gql`
query {
    news {
      title,
      shortDes,
      body,
      image,
      startDate,
      endDate,
    }
  }
`;

export const News = () => {
    const { data: dateNews, refetch } = useQuery(queryNews);

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
            {dateNews?.news?.map((n) => {
                return <>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <Image
                                width={200}
                                src=""
                            />
                        </div>
                        <div className='col-12 col-md-8'>
                            <div className='card-title'>
                                {n.title}
                            </div>

                            <div className='card-bode'>
                                {n.shortDes}
                            </div>
                            <List.Item.Meta
                                description={n.body}
                            />
                        </div>
                        <Divider />

                    </div>
                </>

            })}

            <List
                itemLayout="vertical"
                size="default"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                // dataSource={title}

                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />

            {/* {
                news.map((n) => (
                    <div className='mt-2 mb-2' style={{ height: "fit-content" }}>
                        <NewsItem news={n} />
                    </div>
                ))
            } */}

        </div>






    )
}