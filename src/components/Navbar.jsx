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

                <span style={{color: 'white'}}>Student Service</span>

                <Menu theme="dark" mode="horizontal" style={{float:'right'}} >
                    
                
                    <Menu.Item>
                        <Link to="/" >
                            Home
                        </Link>
                    </Menu.Item>
                    

                    
                    <Menu.Item>
                        <Link to="/service" >Service</Link>
                    </Menu.Item>
                

                    
                    <Menu.Item>
                        <Link to="/notification" >
                            <Badge size="large" count={10} style={{ margin: '5px' }}>
                                <Avatar icon={<NotificationFilled />} />
                            </Badge>
                        </Link>

                    </Menu.Item>
                    
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
