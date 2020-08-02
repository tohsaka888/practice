import React from 'react';
import {Carousel, Col, Layout, Menu, Row, Tabs} from "antd"
import {EnvironmentOutlined,LeftOutlined,RightOutlined} from "@ant-design/icons"
import "./content.css"

const Content = ({banner, playlist, img, userLike, weekData}) => {

    const {TabPane} = Tabs;
    const {Item} = Menu;
    const {Content} = Layout;

    return (
        <div style={{display: "flex"}}>
            <div className="div" style={{width: "500px", height: "394px"}}><LeftOutlined
                style={{fontSize: "51px", float: "right", marginRight: "20px"}} className="icon"
                onClick={() => {
                    img.current.prev()
                }}/></div>
            <Content className="content" style={{background: "white"}}>
                <div className="banner">
                    <div style={{width: "100%"}}>
                        <Carousel autoplay ref={img}>
                            {banner.map((item, index) => {
                                return <img src={item.imageUrl} key={index} alt={index}/>
                            })}
                        </Carousel>
                    </div>
                </div>
                <Menu mode="horizontal" style={{marginTop: "400px", borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>热门推荐</span></Item>
                </Menu>
                <Row style={{marginTop: "20px"}}>
                    {playlist.map((item, index) => {
                        if (index < 6) {
                            return (
                                <Col span={4} key={index}>
                                    <img src={item.coverImgUrl} style={{
                                        width: "140px",
                                        height: "140px",
                                        borderRadius: "50%",
                                        boxShadow: "10px 10px 5px #888888"
                                    }} alt={index}/>
                                    <div style={{
                                        textAlign: "left",
                                        width: "140px",
                                        marginLeft: "20px",
                                        marginTop: "10px"
                                    }}>{item.name}</div>
                                </Col>
                            )
                        }
                    })}
                </Row>
                <Row>
                    {playlist.map((item, index) => {
                        if (index >= 6) {
                            return (
                                <Col span={4} key={index} style={{marginTop: "20px"}}>
                                    <img src={item.coverImgUrl} style={{
                                        width: "140px",
                                        height: "140px",
                                        borderRadius: "50%",
                                        boxShadow: "10px 10px 5px #888888"
                                    }} alt={index}/>
                                    <div style={{
                                        textAlign: "left",
                                        width: "140px",
                                        marginLeft: "20px",
                                        marginTop: "10px"
                                    }}>{item.name}</div>
                                </Col>
                            )
                        }
                    })}
                </Row>
                {userLike &&
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>为你推荐</span></Item>
                </Menu>}
                {userLike &&
                <Row>
                    {userLike.map((item, index) => {
                        if (index < 6) {
                            return (
                                <Col span={4} key={index} style={{marginTop: "20px"}}>
                                    <img src={item.picUrl} style={{
                                        width: "140px",
                                        height: "140px",
                                        borderRadius: "15px",
                                        boxShadow: "10px 10px 5px #888888"
                                    }} alt={index}/>
                                    <div style={{
                                        textAlign: "left",
                                        width: "140px",
                                        marginLeft: "20px",
                                        marginTop: "10px"
                                    }}>{item.name}</div>
                                </Col>
                            )
                        }
                    })}
                </Row>
                }
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>新碟上架</span></Item>
                </Menu>
                <Tabs style={{
                    width: "83%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    background: "#f5f4f4",
                    marginTop: "20px"
                }} tabBarStyle={{background: "#FFFAFA", paddingLeft: "30px"}} tabBarGutter={40} animated>
                    <TabPane tab="1" key={1}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index < 5) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index}/>
                                            <div style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="2" key={2}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index >= 5 && index < 10) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index}/>
                                            <div style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                    {console.log(weekData)}
                    <TabPane tab="3" key={3}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index >= 10 && index < 15) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index}/>
                                            <div style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="4" key={4}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index >= 15 && index < 20) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index}/>
                                            <div style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="5" key={5}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index >= 20 && index < 25) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index}/>
                                            <div style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="6" key={6}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index >= 25 && index < 30) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index}/>
                                            <div style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                </Tabs>
                <div style={{height: "30px"}}></div>
            </Content>
            <div className="div" style={{width: "500px", height: "394px"}}><RightOutlined
                style={{fontSize: "51px", float: "left", marginLeft: "20px"}} className="icon" onClick={() => {
                img.current.next()
            }}/></div>
        </div>
    );
};

export default Content;
