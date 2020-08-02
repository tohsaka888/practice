import React, {useState} from 'react';
import {Avatar, Button, Form, Input, Layout, Menu, Modal} from 'antd'
import './header.css'
import {TaobaoCircleFilled} from "@ant-design/icons"
import {BrowserRouter as Router, Link} from 'react-router-dom'

const Header = ({visible, setVisible, setUserLike, loginStatus}) => {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const {Search} = Input
    const {Header} = Layout;
    const {Item} = Menu;

    const login = async () => {
        const res = await fetch(`http://localhost:3000/login/cellphone?phone=${phone}&password=${password}`, {
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({"phone": phone, "password": password}),
            credentials: "include",
            mode: "cors",
        });
        const data = await res.json();
        setVisible(false);
        const res1 = await fetch("http://localhost:3000/recommend/resource", {
            credentials: "include",
            mode : "cors",
        });
        const data1 = await res1.json();
        console.log(data.cookie);
        document.cookie = data.cookie;
        setUserLike(data1.recommend);
    }

    // const search = async () => {
    //     const res = await fetch(`http://localhost:3000/search`);
    // }

    return (
        <Router>
            {console.log(loginStatus)}
            <Header style={{height: "68px", display: "flex", textAlign: "center"}}>
                <Menu mode="horizontal" theme='dark' className="menu" defaultSelectedKeys={["find"]}>
                    <Item disabled icon={<TaobaoCircleFilled
                        style={{
                            fontSize: "30px",
                            verticalAlign: "middle",
                            color: "#f83d3d",
                            marginLeft: "160px"
                        }}/>}><span
                        style={{fontFamily: "title", fontSize: "18px", color: "white"}}>网易云音乐</span></Item>
                    <Item key="find"><span>发现音乐</span></Item>
                    <Item key="my"><span>我的音乐</span></Item>
                    <Item key="friend"><span>朋友</span></Item>
                    <Item key="shop"><span>商城</span></Item>
                    <Item key="musician"><span>音乐人</span></Item>
                </Menu>
                <div style={{marginTop: "17px", marginLeft: "20px"}}>
                    <Link to='/search'>
                        <Search placeholder="音乐/视频/电台/用户 "
                                onSearch={value => console.log("未搜索")}
                                enterButton style={{width: "250px"}}/>
                    </Link>
                </div>
                <Button shape="round" style={{
                    marginTop: "17px",
                    marginLeft: "20px",
                    background: "black",
                    color: "#D3D3D3"
                }}>创作者中心</Button>
                {loginStatus.code !== 200 && loginStatus &&
                <Button shape="round" style={{marginTop: "17px", marginLeft: "20px", fontWeight: "900"}}
                        type="primary" onClick={() => {
                    setVisible(true)
                }}>登录</Button>}
                {loginStatus.code === 200 && loginStatus && <Avatar src={loginStatus.profile.avatarUrl} style={{marginTop:"20px",marginLeft:"20px"}}/>}
                {/*{console.log(loginStatus.profile.avatarUrl)}*/}
                <Modal visible={visible} onCancel={() => setVisible(false)} onOk={login} title="登录">
                    <Form>
                        <Form.Item label="手机号" labelCol={{span: 5}} wrapperCol={16} name="phone"><Input
                            style={{width: "300px"}} onChange={(event) => {
                            setPhone(event.target.value)
                        }}/></Form.Item>
                        <Form.Item label="密码" name="pass" labelCol={{span: 5}} wrapperCol={16}>
                            <Input style={{width: "300px"}} type="password" onChange={(event) => {
                                setPassword(event.target.value)
                            }}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Header>
        </Router>
    );
};

export default Header;
