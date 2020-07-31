import React from 'react';
import {Button, Input, Layout, Menu} from 'antd'
import './header.css'
import {TaobaoCircleFilled} from "@ant-design/icons"

const Header = () => {

    const {Search} = Input
    const {Header} = Layout;
    const {Item} = Menu;

    return (
        <div>
            <Header style={{height: "68px", display: "flex"}}>
                <Menu mode="horizontal" theme='dark' className="menu" defaultSelectedKeys={["find"]}>
                    <Item disabled icon={<TaobaoCircleFilled
                        style={{
                            fontSize: "30px",
                            verticalAlign: "middle",
                            color: "#f83d3d",
                            marginLeft: "128px"
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
                                                                             enterButton style={{width: "300px"}}/>
                </div>
                <Button shape="round" style={{
                    marginTop: "17px",
                    marginLeft: "20px",
                    background: "black",
                    color: "#D3D3D3"
                }}>创作者中心</Button>
                <Button shape="round" style={{marginTop: "17px", marginLeft: "20px", fontWeight: "900"}}
                        type="primary">登录</Button>
            </Header>
        </div>
    );
};

export default Header;
