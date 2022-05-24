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
                            {/* <Avatar src="https://joeschmoe.io/api/v1/random" /> */}
                            <Image
                                width={200}
                                src={n.image}
                            />
                        </div>
                        <div className='col-12 col-md-8'>
                            <div className='card-title'>
                                {/* <Typography.Title level={3} >
                                    {n.title}
                                </Typography.Title> */}

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
            <div>
                {/* {dateNews?.news?.map((s) => {
                    return <> */}
                        {/* <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={dateNews?.news?.map(s)}
                            renderItem={(s) => (    
                                <List.Item
                                    key={s.title}
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
                                        avatar={<Avatar src={s.title} />}
                                        title={<a>{s.body}</a>}
                                        description={s.shortDes}
                                    />
                                    
                                </List.Item>

                            )}
                        /> */}
                    {/* </>

                })} */}
            </div>




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