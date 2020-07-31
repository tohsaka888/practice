import React from 'react';
import {Carousel, Col, Layout, Menu, Row} from "antd"
import {EnvironmentOutlined} from "@ant-design/icons"
import "./content.css"

const Content = ({banner, playlist, img, visible, setVisible}) => {

    const {Item} = Menu;
    const {Content} = Layout;

    return (
        <Content className="content" style={{background: "white"}}>
            {/*{console.log(playlist)}*/}
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
                <Item icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                    style={{fontSize: "20px", color: "black"}}>热门推荐</span></Item>
            </Menu>
            <Row style={{marginTop: "20px"}}>
                {playlist.map((item, index) => {
                    if (index < 6) {
                        return (
                            <Col span={4} key={index}>
                                <img src={item.coverImgUrl} style={{width: "140px", height: "140px"}} alt={index}/>
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
                                <img src={item.coverImgUrl} style={{width: "140px", height: "140px"}} alt={index}/>
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
        </Content>
    );
};

export default Content;
