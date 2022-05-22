import { Input, Button } from 'antd';
import { useState, useCallback } from 'react'

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = useCallback(
      () => {
        event.preventDefault()
        console.log(username, password);
      },
      [username, password],
    )
    

    return (
        <div className="container d-flex flex-column align-items-center">
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
                    <Button type='primary'  htmlType="submit">เข้าสู่ระบบ</Button>
                </div>
            </form>
        </div>
    )
}