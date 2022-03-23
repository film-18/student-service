import { NotificationFilled, UserOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { Avatar, Badge, Image, Button } from 'antd';


import { memo, useEffect, useState } from "react";
import { useGoogleLogin } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login'



const clientId = "282680443684-tv54qo2sgo37jnn2uqsnmpesr7cfvmc9.apps.googleusercontent.com";

const Navbar = memo(() => {

    const [emailUser, setemailUser] = useState("");
    
    const responseGoogle = (response) => {
        // document.getElementById("emailLogin").innerText = response.profileObj.email;
        console.log(response);
        setemailUser(response.profileObj.email)
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const responseSignOut = () => {
        setemailUser(null)
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
        onLogoutSuccess : responseSignOut
    })





    const { Header, Content, Footer } = Layout;

    return <>

        <Layout>
            <Header >

                <span style={{ color: 'white', fontSize: '30px' }}>Student Service</span>

                <Menu theme="dark" mode="horizontal" style={{ float: 'right' }} >


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


                    <Menu.Item id="emailLogin" >
                        {emailUser ? (<div> {emailUser} </div>) : (<Button type="primary" shape="round" size="large" onClick={signIn}>
                            Sign In
                            <span style={{ padding: '10px' }}>
                                <Avatar icon={<UserOutlined />} />
                            </span>
                        </Button>)}

                    </Menu.Item>



                    {/* <Menu.Item> */}
                    <Button type="primary" shape="round" size="large" style={{ marginTop: '30px', float: 'right' }}
                        onClick={signOut}>
                        sign out
                    </Button>
                    {/* </Menu.Item> */}
                </Menu>
            </Header>
        </Layout>

        <div className="h-12"></div>

        <Outlet />
    </>
})

export default Navbar;
