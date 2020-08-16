import React, {useRef, useState} from 'react';
import {Avatar, Button, Form, Input, Layout, Menu, Modal, Popover} from 'antd'
import './header.css'
import {TaobaoCircleFilled, MessageOutlined, SettingOutlined, ImportOutlined, HomeOutlined} from "@ant-design/icons"
import {Link, useHistory} from 'react-router-dom'

const Header = ({visible, setVisible, setUserLike, loginStatus, setSongData, setLoginStatus, setMymusic, setCookie, setPlay, setComment}) => {

    const history = useHistory();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const {Search} = Input
    const {Header} = Layout;
    const {Item} = Menu;

    const value1 = useRef("");

    const login = async () => {
        const res = await fetch(`http://localhost:3000/login/cellphone?phone=${phone}&password=${password}`, {
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({"phone": phone, "password": password}),
            mode: "cors",
            credentials : "include"
        });
        const data = await res.json();
        setVisible(false);
        setLoginStatus(data);
        const res2 = await fetch("http://localhost:3000/login/refresh",{credentials:"include",mode:"cors"});
        const data2 = await res2.json();
        console.log(data);
        const res1 = await fetch("http://localhost:3000/login/status", {credentials: "include", mode: "cors"});
        const data1= await res1.json();
        console.log(data1);
    }

    const search = async (value) => {
        const res = await fetch(`http://localhost:3000/search?keywords=${value}`);
        const data = await res.json();
        setSongData(data.result.songs);
    }

    const logout = async () => {
        const res = await fetch("http://localhost:3000/logout");
        const data = await res.json();
        const res1 = await fetch("http://localhost:3000/login/refresh",{credentials:"include",mode:"cors"});
        const data1 = await res1.json();
        console.log(data1);
    }

    const mymusic = async () => {
        const res = await fetch(`http://localhost:3000/user/playlist?uid=${loginStatus.profile.userId}`);
        const data = await res.json();
        setMymusic(data);
        const res2 = await fetch(`http://localhost:3000/playlist/detail?id=${data.playlist[0].id}`, {
            credentials: "include",
            mode: "cors"
        });
        const data2 = await res2.json();
        setPlay(data2.playlist);
        const res1 = await fetch(`http://localhost:3000/comment/playlist?id=${data.playlist[0].id}`);
        const data1 = await res1.json();
        setComment(data1);
    }

    const content = (
        <div>
            <Button size="small" icon={<HomeOutlined/>} style={{border: "none", fontSize: '12px'}}>我的主页</Button><br/>
            <Button size="small" icon={<SettingOutlined/>}
                    style={{border: "none", marginTop: "10px", fontSize: '12px'}}>我的设置</Button><br/>
            <Button size="small" icon={<MessageOutlined/>}
                    style={{border: "none", marginTop: "10px", fontSize: '12px'}}>我的消息</Button><br/>
            <Button size="small" icon={<ImportOutlined/>} style={{border: "none", marginTop: "10px", fontSize: '12px'}}
                    onClick={logout}>退出登录</Button>
        </div>
    )

    return (
        <div style={{marginBottom:"68px"}}>
            <Header style={{height: "74px", display: "flex",position:"fixed",width:"100%",zIndex:"100",alignItems:"center",borderBottom:"5px solid #C20C0C" }}>
                <Menu mode="horizontal" theme='dark' className="menu" defaultSelectedKeys={["find"]} style={{height:"68px"}}>
                    <Item disabled icon={<TaobaoCircleFilled
                        style={{
                            fontSize: "30px",
                            color: "#f83d3d",
                            marginLeft: "11vw",
                            verticalAlign:"middle"
                        }}/>}><span
                        style={{fontFamily: "title", fontSize: "18px", color: "white"}}>网易云音乐</span></Item>
                    <Item key="find"><Link to='/'><span>发现音乐</span></Link></Item>
                    <Item key="my" onClick={mymusic}><Link to='/mymusic'><span>我的音乐</span></Link></Item>
                    <Item key="friend"><span>朋友</span></Item>
                    <Item key="shop"><span>商城</span></Item>
                    <Item key="musician"><span>音乐人</span></Item>
                </Menu>
                <div style={{marginLeft: "20px"}}>
                    <Search placeholder="音乐/视频/电台/用户 "
                            onSearch={(value) => {
                                search(value);
                                history.push(`/search?keywords=${value}`);
                            }}
                            enterButton style={{width: "250px",verticalAlign:"middle",display:"block"}}></Search>
                </div>
                <Button shape="round" style={{
                    marginLeft: "20px",
                    background: "black",
                    color: "#D3D3D3"
                }}>创作者中心</Button>
                {loginStatus.code !== 200 && loginStatus &&
                <Button shape="round" style={{marginLeft: "20px", fontWeight: "900"}}
                        type="primary" onClick={() => {
                    setVisible(true)
                }}>登录</Button>}
                {loginStatus.code === 200 && loginStatus &&
                <Popover content={content}><Avatar src={loginStatus.profile.avatarUrl}
                                                   style={{marginLeft: "20px"}}/></Popover>}
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
        </div>
    );
};

export default Header;
