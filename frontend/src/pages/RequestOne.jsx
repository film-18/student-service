import { memo, useEffect, useState } from "react";
import { Steps } from 'antd';

const { Step } = Steps;

export const RequestOne = memo(() => {

    return <>
        <div style={{ backgroundColor: '#d6e4ff' , padding: '60px' }}>
            <Steps current={0}>
                <Step title="กรอกรายละเอียด" description="This is a description." />
                <Step title="เลือกอาจารย์" subTitle="Left 00:00:08" description="This is a description." />
                <Step title="ตรวจสอบ" description="This is a description." />
                <Step title="สถานะ" description="This is a description." />
            </Steps>
            
        </div>
    </>

});