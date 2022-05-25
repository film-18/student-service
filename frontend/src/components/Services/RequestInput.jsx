import { Input, DatePicker } from "antd"
const { TextArea } = Input;
import moment from 'moment';

export const RequestInput = ({text, value, id, type, option, placeholder, disabled=false}) => {

    if (type === "text-area"){
        return (
            <div className="request-input">
                {
                    text ? 
                    <div className="request-input-text">{text} :</div> :
                    <div className="mt-2"></div>
                }
                <TextArea className="input-request" rows={5} placeholder="" value={value} readOnly={disabled} />
            </div>
        )
    }
    else if (type === "date"){
        console.log(value);
        return (
            <div className="request-input">
                {
                    text ? 
                    <div className="request-input-text">{text} :</div> : ""
                }
                <DatePicker size="large" className="w-100 input-request" defaultValue={moment()} readOnly={disabled} format="YYYY/MM/DD" />
            </div>
        )
    }
    else{
        return (
            <div className="request-input">
                {
                    text ? 
                    <div className="request-input-text">{text} :</div> : ""
                }
                <Input className="input-request" size="large" placeholder="" value={value} readOnly={disabled} />
            </div>
        )
    }
}