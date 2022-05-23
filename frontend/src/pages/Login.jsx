import { Input, Button, Typography } from 'antd';
import { useState, useCallback } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useGoogle } from '../contexts/GoogleContext';
import { GoogleLogin } from 'react-google-login';


const { Meta } = Card;;

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { user, signIn, signOut } = useGoogle()


    const handleSubmit = useCallback(
        () => {
            event.preventDefault()
            console.log(username, password);
        },
        [username, password],
    )



    return (
        <div className="container my-3" >
            {/* <div className='row'>
                <h1 className="text-center mt-5">เข้าสู่ระบบ</h1>
                <form onSubmit={handleSubmit} className='w-100'>
                    <div className='row mt-2 justify-content-center'>
                        <div className='col-12 col-md-6'>
                            <div>ชื่อผู้ใช้ : </div>
                            <Input className="mt-2" size="large" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className='row mt-2 justify-content-center'>
                        <div className='col-12 col-md-6'>
                            <div>รหัสผ่าน : </div>
                            <Input className="mt-2" size="large" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='mt-3 text-center'>
                        <Button type='primary' htmlType="submit">เข้าสู่ระบบ</Button>
                    </div>
                </form> */}
            <div className='row justify-content-center'>
                <Card
                    hoverable
                    style={{
                        width: 500,
                        // height: 600,
                    }}
                // cover={
                //     <img
                //         alt="example"
                //         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                //     />
                // }

                >
                    <h3 className="text-center">เข้าสู่ระบบ</h3>
                    <form onSubmit={handleSubmit} className='w-100'>
                        <div className='mx-3 my-3'>
                            <div className='row mb-2'>
                                {/* <div>ชื่อผู้ใช้ : </div> */}
                                <Input className="mt-2" size="large"  placeholder="ชื่อผู้ใช้" prefix={<UserOutlined />} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='row mb-2'>
                                {/* <div>รหัสผ่าน : </div> */}
                                <Input className="mt-2" size="large" type="password"  placeholder="รหัสผ่าน" prefix={<LockOutlined />}  onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='row mt-3 text-center'>
                                <Button type='primary' htmlType="submit" block size='large'>เข้าสู่ระบบ</Button>
                            </div>
                            <div className='row mt-3 text-center'>
                                
                                    <Button icon={<GoogleOutlined />} htmlType="submit" block size='large' onClick={signIn}>
                                    <span > Login with Google</span>
                                    </Button>   
                                
                            </div>
                        </div>
                    </form>
                </Card>
            </div>


        </div>
        // </div>
    )
}