import { memo, useEffect, useState } from "react";
import { Avatar, List } from 'antd';


const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

export const Notification = memo(() => {



    return <>
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    {/* <Select
                        mode="multiple"
                        showArrow
                        tagRender={tagRender}
                        defaultValue={['gold', 'cyan']}
                        style={{
                            width: '100%',
                        }}
                        options={options}
                    /> */}
                </div>
            </div>
            <div className="row">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </div>

        </div>
    </>

});