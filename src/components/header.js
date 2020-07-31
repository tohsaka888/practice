import React, {useState} from 'react';
import {Button, Input, Layout, Menu, Modal} from 'antd'
import './header.css'
import {TaobaoCircleFilled} from "@ant-design/icons"

const Header = ({visible, setVisible}) => {

    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("")
    const {Search} = Input
    const {Header} = Layout;
    const {Item} = Menu;
    const login = async () => {
        const res = await fetch(`http://localhost:3000/login/cellphone?phone=${phone}&password=${password}`,{
            method:"POST",
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            body:JSON.stringify({"phone":phone,"password":password}),
            xhrFields: { withCredentials: true },
            mode : "cors",
        });
        const data = await res.json();
        console.log(data);
        setVisible(false);
        const res1 = await fetch("http://localhost:3000/recommend/resource");
        const data1 = await res1.json();
        console.log(data1);
    }

    return (
        <div>
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
                <div style={{marginTop: "17px", marginLeft: "20px"}}><Search placeholder="音乐/视频/电台/用户 "
                                                                             onSearch={value => console.log("未搜索")}
                                                                             enterButton style={{width: "250px"}}/>
                </div>
                <Button shape="round" style={{
                    marginTop: "17px",
                    marginLeft: "20px",
                    background: "black",
                    color: "#D3D3D3"
                }}>创作者中心</Button>
                <Button shape="round" style={{marginTop: "17px", marginLeft: "20px", fontWeight: "900"}}
                        type="primary" onClick={() => {
                    setVisible(true)
                }}>登录</Button>
                <Modal visible={visible} onCancel={()=>setVisible(false)} onOk={login}>
                    <Input onChange={(event)=>{setPhone(event.target.value)}}/>
                    <Input type="password" onChange={(event)=>{setPassword(event.target.value)}}/>
                </Modal>
            </Header>
        </div>
    );
};

export default Header;
