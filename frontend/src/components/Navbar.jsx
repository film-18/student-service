import {
  NotificationFilled,
  SettingOutlined,
  UserOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  SearchOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import {
  Avatar,
  Badge,
  Image,
  Button,
  Dropdown,
  Space,
  Row,
  Col,
  Input,
} from "antd";

import { memo, useEffect, useState } from "react";
// import { useGoogleLogin } from 'react-google-login';
// import { useGoogleLogout } from 'react-google-login'
// import { useGoogle } from '../contexts/GoogleContext';
import { useApp } from "../contexts/AccountContext";
import { useLazyQuery } from "@apollo/client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;

const searchNews = gql`
  query ($keyword: String!) {
    searchNews(keyword: $keyword) {
      title
      shortDes
      body
      image
      startDate
      endDate
      _id
      password
    }
  }
`;

const Navbar = memo(() => {
  // const { user, signIn, signOut } = useGoogle()
  const { user2, data, logout } = useApp();
  const [profile, setProfile] = useState(null);
  const [getPost, { data: dataSearch }] = useLazyQuery(searchNews);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProfile(user2);
    // alert(user)
  }, [user2, setProfile]);

  useEffect(() => {
    console.log(user2, data);
  }, []);

  const { Header, Content, Footer } = Layout;
  const { Search } = Input;

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-md-4 mt-2">
            <Link to="/">
              <Typography.Title level={1} className="mb-1">
                Student Service
                {/* <ExclamationCircleFilled /> */}
              </Typography.Title>
              <h6>Faculty of Information Technology | KMITL </h6>
            </Link>
          </div>
          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-12 col-md-6"></div>
              <div className="col-12 col-md-6">
                <Row>
                  <Col span={18}>
                    <Input
                      size="large"
                      className="input-request"
                      value={keyword}
                      placeholder="ค้นหาข่าวสารสำหรับคุณ"
                      onChange={(e) => setKeyword(e.target.value)}
                    ></Input>
                  </Col>
                  <Col span={6}>
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => {
                        getPost({ variables: { keyword: keyword } });
                        navigate("/news", {
                          state: { keyword: keyword, dataSearch: dataSearch },
                        });
                      }}
                    >
                      <SearchOutlined />
                      ค้นหา
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="row py-3">
              <Menu
                mode="horizontal"
                style={{
                  justifyContent: "flex-end",
                  backgroundColor: "rgb(235, 245, 255)",
                }}
              >
                <Menu.Item>
                  <Link to="/">หน้าหลัก</Link>
                </Menu.Item>
                {/* 
                            <Menu.Item>
                                <Link to="/login" >เข้าสู่ระบบ</Link>
                            </Menu.Item> */}

                <Menu.Item>
                  <Link to="/news">ข่าวสาร</Link>
                </Menu.Item>

                <Menu.Item>
                  <Link to="/service">งานเอกสาร</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/staff">บุคลากร</Link>
                  {/* <h1>{profile.username}</h1> */}
                </Menu.Item>

                <Menu.SubMenu
                  key="SubMenu"
                  title={
                    profile ? (
                      <>
                        <Avatar
                          size={25}
                          src={
                            profile?.imageUri
                              ? profile?.imageUri
                              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                          }
                          style={{ marginRight: 5 }}
                        />
                        {profile?.firstname}
                      </>
                    ) : (
                      "บัญชี"
                    )
                  }
                >
                  <Menu.ItemGroup
                    style={{ textAlign: "center", paddingBottom: "10px" }}
                    title={profile ? `${profile?.role}` : "บัญชี"}
                  >
                    {profile ? (
                      <>
                        <Menu.Item key="setting:1">
                          <Link to={`/profile`}>โปรไฟล์</Link>
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                          <div onClick={logout}>ออกจากระบบ</div>
                        </Menu.Item>
                      </>
                    ) : (
                      <Menu.Item key="setting:1">
                        <Link to="/login">เข้าสู่ระบบ</Link>
                      </Menu.Item>
                    )}
                  </Menu.ItemGroup>
                </Menu.SubMenu>

                <Menu.Item>
                  <Link to="/notification">
                    <Badge size="large" dot={true} offset={[0,-1]}>
                      <MailOutlined />
                    </Badge>
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12"></div>

      <Outlet />

      <Footer style={{ backgroundColor: "#112B3C" }} className="my-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8" style={{ color: "white" }}>
              คณะเทคโนโลยีสารสนเทศ
              <br />
              สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง เลขที่ 1<br />
              ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520 <br />
              +66 (0)2723 4900 +66 (0) 2723 4910
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
});

export default Navbar;
