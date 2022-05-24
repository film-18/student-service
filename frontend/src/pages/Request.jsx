import { gql, useMutation, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { Descriptions } from 'antd';



export default function Request({ req }) {



    return <>
        {/* <Link to={`/news/${post._id}`} className="text-decoration-none text-black"> */}

        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">

                </div>
                <div className="col-12 col-md-8">
                    <div>
                        <Descriptions
                            title="Responsive Descriptions"
                            bordered
                            column={{
                                xxl: 4,
                                xl: 3,
                                lg: 3,
                                md: 3,
                                sm: 2,
                                xs: 1,
                            }}
                        >
                            <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Config Info">
                                Data disk type: MongoDB
                                <br />
                                Database version: 3.4
                                <br />
                                Package: dds.mongo.mid
                                <br />
                                Storage space: 10 GB
                                <br />
                                Replication factor: 3
                                <br />
                                Region: East China 1
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            </div>

        </div>
        {/* </Link> */}
        {/* <Link to={`/news/${post._id}`} className="text-decoration-none text-black">
            <div className="card" style={{ width: "100%" }}>
                <img src="https://avatars.githubusercontent.com/u/56312158?v=4" className="card-img-top" alt="..." />
                <div className="card-body text-start">
                    <h4 className="card-title">{post.title}</h4>
                    <p className="py-2 my-0">{post.content} </p>
                    <div className="d-inline text-secondary">By {post.author.fullname} ,</div>
                    <div className="d-inline text-secondary"> 2 days ago</div>
                </div>
            </div>
        </Link> */}
    </>
}