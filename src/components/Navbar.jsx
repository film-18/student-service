import { NotificationFilled, UserOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { Avatar, Badge, Image } from 'antd';


import { memo, useEffect, useState } from "react";



const Navbar = memo(() => {

    const { Header, Content, Footer } = Layout;

    return <>

        <Layout>
            <Header >

                <Menu theme="dark" mode="horizontal" >
                    
                    <Link to="/" >
                        <Menu.Item>Home</Menu.Item>
                    </Link>

                    <Link to="/service" >
                        <Menu.Item>Service</Menu.Item>
                    </Link>

                    <Link to="/notification" >
                        <Menu.Item>
                            <Badge size="large" count={10} style={{ margin: '5px' }}>
                                <Avatar icon={<NotificationFilled />} />
                            </Badge>
                        </Menu.Item>
                    </Link>

                    <Menu.Item>
                        Sign In
                        <span style={{ padding: '10px' }}>
                            <Avatar icon={<UserOutlined />} />
                        </span>
                    </Menu.Item>
                </Menu>
            </Header>
            {/* <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>

        <div className="h-12"></div>

        <Outlet />
    </>
})

export default Navbar;
