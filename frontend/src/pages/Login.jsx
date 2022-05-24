import { Input, Button, Typography } from 'antd';
import { useState, useCallback, useEffect } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useGoogle } from '../contexts/GoogleContext';
import { GoogleLogin } from 'react-google-login';
import { gql, useQuery, useMutation } from "@apollo/client"
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useApp } from '../contexts/AccountContext';


const { Meta } = Card;;

const queryUser = gql`
query{
    me{
      _id
      username
      firstname
      lastname
    }
  }`


const AUTH_TOKEN = 'filmballpetenewbeer-token';




export const Login = () => {
    const { data: guu, refetch } = useQuery(queryUser);
    const {login} = useApp();
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { user, signIn, signOut } = useGoogle()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('111', guu)
    }, [])


    const handleSubmit = useCallback(
         () => {
            event.preventDefault()
            login(username, password)
        },
    )

    return (
        <div className="container my-3" >
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
                    <h3 className="text-center">เข้าสู่ระบบ </h3>
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