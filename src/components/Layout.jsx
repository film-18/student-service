import { NotificationFilled } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';


const { memo } = require("react");



const Layouts = memo(() => {
    
    const [ Header, Content, Footer] = Layout;

    return <>
        <Layout>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item>Home</Menu.Item>
                    <Menu.Item>Service</Menu.Item>
                    <Menu.Item>
                        <NotificationFilled />
                    </Menu.Item>
                    <Menu.Item>
                        {/* <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                </svg>
            </span> */}
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>

        <div className="h-12"></div>

        <Outlet />
    </>
})

export default Layouts;
