import { Button, Input, DatePicker, Modal } from "antd"
import { useState } from "react"
import { RequestInput } from "../components/Services/RequestInput"
import moment from 'moment'
import TextArea from "antd/lib/input/TextArea"
import { gql, useMutation } from "@apollo/client"
import { useApp } from "../contexts/AccountContext"
import { useNavigate } from "react-router-dom"

const CREATE_NEWS_MUTATION = gql`
mutation ($record: CreateOneNewsInput!) {
    createNews (record: $record) {
      recordId
    }
  }
`

export const CreateNews = () => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [shortDes, setShortDes] = useState("")
    const [body, setBody] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const {user2: user} = useApp()
    const navigate = useNavigate()
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
        
    const [createNewsMutation] = useMutation(CREATE_NEWS_MUTATION)

    const handleCreateNews = async () => {

        const record = {
            title,
            shortDes,
            body,
            image,
            startDate,
            endDate,
            staffID: user._id
        }

        try {  
            await createNewsMutation({
                variables: {
                    record
                }
            })
            const modal = Modal.success({
                content: 'โพสต์เสร็จสิ้น',
            });
            setTimeout(() => {
                navigate("/news")
                modal.destroy()
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1 className="text-center">สร้างโพสต์</h1>
            <div className="mt-5">
                <div className="mb-1 mt-2">หัวข้อ :</div>
                <Input className="input-request" onChange={(e) => setTitle(e.target.value)} size="large" placeholder="" />
                <div className="mb-1 mt-2">ลิงก์รูปภาพ :</div>
                <Input className="input-request" onChange={(e) => setImage(e.target.value)} size="large" placeholder="" />
                <div className="w-100 text-center mt-3">
                    <div className="mb-3">ตัวอย่างรูปภาพ</div>
                    <img src={image} alt="" width="70%" />
                </div>
                <div className="mb-1 mt-2">รายละเอียดสั้น ๆ :</div>
                <Input className="input-request" onChange={(e) => setShortDes(e.target.value)} size="large" placeholder="" />
                <div className="mb-1 mt-2">รายละเอียดทั้งหมด :</div>
                <TextArea className="input-request" onChange={(e) => setBody(e.target.value)} size="large" rows="4" />
                <div className="row">
                    <div className="col">
                        <div className="mb-1 mt-2">ตั้งแต่วันที่ :</div>
                        <DatePicker size="large" className="w-100 input-reqest" format="YYYY/MM/DD" onChange={(date, dateString) => setStartDate(dateString)} />
                    </div>
                    <div className="col">
                        <div className="mb-1 mt-2">ถึงวันที่ :</div>
                        <DatePicker size="large" className="w-100 input-reqest" format="YYYY/MM/DD" onChange={(date, dateString) => setEndDate(dateString)} />
                    </div>
                </div>
                
                <div className="text-end">
                    <Button className="mt-3" type="primary" onClick={showModal}>สร้างโพสต์</Button>
                </div>
            </div>

            <Modal title="ยืนยันโพสต์" visible={isModalVisible} onOk={handleCreateNews} onCancel={handleCancel} okText="โพสต์">
                <div className="w-100 text-center">
                    <img src={image} alt="" width="80%" />
                </div>
                <div>เรื่อง : {title}</div>
                <div>รายละเอียดสั้น ๆ : {shortDes}</div>
                <div>รายละเอียดทั้งหมด : {body}</div>
                <div>ตั้งแต่วันที่ {startDate} ถึงวันที่ {endDate}</div>
            </Modal>
        </div>
    )
}