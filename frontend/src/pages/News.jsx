import { NewsItem } from '../components/NewsItem'
import news from '../data/news.json'
import '../App.css'
import { Avatar, List, Space } from 'antd';
import React from 'react';
import { StarOutlined , LikeOutlined , MessageOutlined  } from '@ant-design/icons';

const data = Array.from({
    length: 23,
  }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));


const IconText = ({ icon, text }) => (
<Space>
    {React.createElement(icon)}
    {text}
</Space>
);


export const News = () => {
    return (
        <div className="container my-3">
            <List
                itemLayout="vertical"
                size="default"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={data}
                
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

            {
                news.map((n) => (
                    <div className='mt-2 mb-2' style={{ height: "fit-content" }}>
                        <NewsItem news={n} />
                    </div>
                ))
            }
            
        </div>
    )
}