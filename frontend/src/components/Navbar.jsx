import { NotificationFilled, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import { Avatar, Badge, Image, Button, Dropdown, Space, Row, Input } from 'antd';


import { memo, useEffect, useState } from "react";
import { useGoogleLogin } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login'
import { useGoogle } from '../contexts/GoogleContext';



// const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;


const Navbar = memo(() => {

    const { user, signIn, signOut } = useGoogle()
    const [ profile, setProfile ] = useState(null)

    // const [user, setUser] = useState(null);

    // const responseGoogle = (response) => {
    //     // document.getElementById("emailLogin").innerText = response.profileObj.email;
    //     setUser(response.profileObj)
    //     console.log(response);

    // }

    // const onFailure = (res) => {
    //     console.log(res);
    // }

    // const responseSignOut = () => {
    //     setUser(null)
    // }


    // const { signIn } = useGoogleLogin({
    //     clientId,
    //     onSuccess: responseGoogle,
    //     onFailure,
    //     isSignedIn: true,
    //     cookiePolicy: 'single_host_origin',
    // })

    // const { signOut } = useGoogleLogout({
    //     clientId,
    //     onFailure,
    //     onLogoutSuccess: responseSignOut
    // })

    // if (!user) {
    //     return <></>
    // }

    useEffect(
        () => {
            setProfile(user)
            // alert(user)
        },
        [user , setProfile]
     ) 


    const { Header, Content, Footer } = Layout;
    const { Search } = Input;

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
        <div className="container">
            <div className="row mt-3">
                <div className="col-12 col-md-4 mt-2">
                        <Typography.Title level={1} className='mb-1'>
                            Student Service
                            {/* <ExclamationCircleFilled /> */}
                        </Typography.Title>
                        <h6>Faculty of Information Technology | KMITL </h6>
                </div>
                <div className='col-12 col-md-8'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>

                        </div>
                        <div className='col-12 col-md-6'>
                            <Search placeholder="input search loading with enterButton" enterButton />
                        </div>
                    </div>
                    <div className='row py-3'>
                        <Menu mode="horizontal" style={{ justifyContent: "flex-end", backgroundColor: "rgb(235, 245, 255)" }} >

                            <Menu.Item>
                                <Link to="/" >
                                    หน้าหลัก
                                </Link>
                            </Menu.Item>

                            <Menu.Item>
                                <Link to="/login" >เข้าสู่ระบบ</Link>
                            </Menu.Item>

                            <Menu.Item>
                                <Link to="/news" >ข่าวสาร</Link>
                            </Menu.Item>

                            <Menu.Item>
                                <Link to="/service" >งานเอกสาร</Link>
                            </Menu.Item>

                            <Menu.SubMenu key="SubMenu" title={profile ?  profile.email : "บัญชี"}>
                                <Menu.ItemGroup style={{ textAlign: "center", paddingBottom: "10px" }} title={profile ? `${profile?.givenName} ${profile?.familyName}` : 'บัญชี'}>
                                    {
                                        profile ?
                                            <>
                                                <Menu.Item key="setting:1">
                                                    <Link to={`/profile`} >
                                                        โปรไฟล์
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item key="setting:2">
                                                    <div onClick={signOut}>
                                                        ออกจากระบบ
                                                    </div>
                                                </Menu.Item>
                                            </>
                                            : <Menu.Item key="setting:1">
                                                <Link to="/login">
                                                    เข้าสู่ระบบ
                                                </Link>
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
                </div>
            </div>
        </div>

        
    

    {/* <Layout>
            <Header style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/" >
                    <div style={{ color: 'white', fontSize: '30px' }}>Student Service</div>
                </Link>
                <div style={{ minWidth: "550px" }}>
                    <Menu mode="horizontal" style={{ justifyContent: "flex-end" }}>

                        <Menu.Item>
                            <Link to="/" >
                                หน้าหลัก
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/login" >เข้าสู่ระบบ</Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/news" >ข่าวสาร</Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/service" >งานเอกสาร</Link>
                        </Menu.Item>

                        <Menu.SubMenu key="SubMenu" title={profile ? user.email : "บัญชี"}>
                            <Menu.ItemGroup style={{ textAlign: "center", paddingBottom: "10px" }} title={user ? `${user?.givenName} ${user?.familyName}` : 'บัญชี'}>
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
                                                    ออกจากระบบ
                                                </div>
                                            </Menu.Item>
                                        </>
                                        : <Menu.Item key="setting:1">
                                            <div onClick={signIn}>
                                                เข้าสู่ระบบ
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
        </Layout> */}

        <div className="h-12"></div>

        <Outlet />

        <Footer style={{ backgroundColor: "#112B3C" }} className="my-5">
            <div className='container' >
                <div className='row'>
                    <div className='col-8'>
                        Faculty of Information Technology <br></br>
                        King Mongkut's Institute of Technology Ladkrabang <br></br>
                        1, Chalong Krung 1, Ladkrabang, Bangkok 10520
                    </div>
                    <div className='col-4'>
                        Social Media
                    </div>

                </div>

            </div>


        </Footer>
    </>
})

export default Navbar;
