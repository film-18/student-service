import { memo, useEffect, useState } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Outlet, Link } from "react-router-dom";
const { Meta } = Card;

export const Profile = memo(() => {

    return <>
        <div className="container my-5">
            <div className="row justify-content-center">
                <Card
                    hoverable
                    style={{
                        width: 600,
                        // height: 600,
                    }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}

                >

                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            </div>

        แบบ 2
        {/* <div className="container"> */}
            <div className="row justify-content-center text-center">
                <Avatar size={150}  className="my-3"/>
                <div className="my-2">
                    <h1 className="my-0">Name Surname</h1>
                    <h6>program | major</h6>
                </div>
                <EditOutlined key="edit" />
                
                <div className="my-3">
                    <p>ประวัติ</p>
                </div>

            </div>

        {/* </div> */}
        </div>
    </>

});