import { NotificationFilled, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { Avatar, Badge, Image, Button, Dropdown, Space, Row } from 'antd';


import { memo, useEffect, useState } from "react";
import { useGoogleLogin } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login'



const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;






const Navbar = memo(() => {

    const [user, setUser] = useState(null);

    const responseGoogle = (response) => {
        // document.getElementById("emailLogin").innerText = response.profileObj.email;
        setUser(response.profileObj)
        console.log(response);

    }

    const onFailure = (res) => {
        console.log(res);
    }

    const responseSignOut = () => {
        setUser(null)
    }


    const { signIn } = useGoogleLogin({
        clientId,
        onSuccess: responseGoogle,
        onFailure,
        isSignedIn: true,
        cookiePolicy: 'single_host_origin',
    })

    const { signOut } = useGoogleLogout({
        clientId,
        onFailure,
        onLogoutSuccess: responseSignOut
    })

    if (!user) {
        return <></>
    }


    const { Header, Content, Footer } = Layout;

    return <>

        {/* <Layout style={{ padding: "5px"}}>
            <div style={{ paddingLeft: "10px"}}>
                <Image
                    width={200}
                    height={50}
                    src="error"
                    fallback="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/nav-eng.svg"
                />
            </div>
        </Layout> */}
        <Layout>
            <Header style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/" >
                    <div style={{ color: 'white', fontSize: '30px' }}>Student Service</div>
                </Link>
                <div style={{ minWidth: "550px" }}>
                    <Menu theme="dark" mode="horizontal" style={{ justifyContent: "flex-end" }}>

                        <Menu.Item>
                            <Link to="/" >
                                Home
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/service" >Service</Link>
                        </Menu.Item>

                        <Menu.SubMenu key="SubMenu" title={user ? user.email : "Guest"}>
                            <Menu.ItemGroup style={{ textAlign: "center", paddingBottom: "10px" }} title={`${user.givenName} ${user.familyName}`}>
                                {
                                    user ?
                                        <>
                                            <Menu.Item key="setting:1">
                                                <Link to={`/profile`} >
                                                    โปรไฟล์
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item key="setting:2">
                                                <div onClick={signOut}>
                                                    Sign Out
                                                </div>
                                            </Menu.Item>
                                        </>
                                        : <Menu.Item key="setting:1">
                                            <div onClick={signIn}>
                                                Sign In
                                            </div>
                                        </Menu.Item>
                                }
                            </Menu.ItemGroup>
                        </Menu.SubMenu>

                        <Menu.Item>
                            <Link to="/notification" >
                                <Badge size="large" count={10} style={{ margin: '5px' }}>
                                    <Avatar icon={<NotificationFilled />} />
                                </Badge>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
        </Layout>

        <div className="h-12"></div>

        <Outlet />
    </>
})

export default Navbar;
