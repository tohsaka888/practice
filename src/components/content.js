import React from 'react';
import {Carousel, Col, Layout, Menu, Row, Tabs, Collapse} from "antd"
import {EnvironmentOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons"
import {useHistory} from 'react-router-dom'
import "./content.css"

const Content = ({banner, playlist, img, userLike, weekData, loginStatus, setPlay, setComment, artist, artist1, artist2, artist3}) => {

    const {TabPane} = Tabs;
    const {Item} = Menu;
    const {Content} = Layout;
    const history = useHistory();

    const playlistDetail = async (id) => {
        const res = await fetch(`http://localhost:3000/playlist/detail?id=${id}`, {
            credentials: "include",
            mode: "cors"
        });
        const data = await res.json();
        setPlay(data.playlist);
        const res1 = await fetch(`http://localhost:3000/comment/playlist?id=${id}`);
        const data1 = await res1.json();
        setComment(data1);
        history.push(`/playlist/?id=${id}`);
    }

    return (
        <div>
            <div style={{display:"inline-flex",height:"52.2vh",overflow:"hidden"}} className="lunbo">
                <div className="div" style={{width: "15vw", height: "52.2vh"}}>
                    <LeftOutlined style={{fontSize: "51px", float: "right", marginRight: "20px"}} className="icon"
                                  onClick={() => {
                                      img.current.prev()
                                  }}/>
                </div>
                <Carousel autoplay ref={img} style={{width:"70vw"}}>
                    {banner.map((item, index) => {
                        return <img src={item.imageUrl} key={index} alt={index} style={{width:"70vw",height:"52vh"}}/>
                    })}
                </Carousel>
                <div className="div" style={{width: "15vw", height: "52.2vh"}}><RightOutlined
                    style={{fontSize: "51px", float: "left", marginLeft: "20px"}} className="icon" onClick={() => {
                    img.current.next()
                }}/></div>
            </div>
            <Content className="content" style={{background: "white"}}>
                <Menu mode="horizontal" style={{ borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>热门推荐</span></Item>
                </Menu>
                <Row style={{marginTop: "20px"}}>
                    {playlist.map((item, index) => {
                        if (index < 6) {
                            return (
                                <Col span={4} key={index}>
                                    <img className="playlist" src={item.coverImgUrl} style={{
                                        width: "140px",
                                        height: "140px",
                                        borderRadius: "50%",
                                        boxShadow: "10px 10px 5px #888888"
                                    }} alt={index} onClick={() => {
                                        playlistDetail(item.id)
                                    }}/>
                                    <div className="playlist" style={{
                                        textAlign: "left",
                                        width: "140px",
                                        marginLeft: "20px",
                                        marginTop: "10px"
                                    }} onClick={() => {
                                        playlistDetail(item.id)
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
                                    <img className="playlist" src={item.coverImgUrl} style={{
                                        width: "140px",
                                        height: "140px",
                                        borderRadius: "50%",
                                        boxShadow: "10px 10px 5px #888888"
                                    }} alt={index} onClick={() => {
                                        playlistDetail(item.id)
                                    }}/>
                                    <div className="playlist" style={{
                                        textAlign: "left",
                                        width: "140px",
                                        marginLeft: "20px",
                                        marginTop: "10px"
                                    }} onClick={() => {
                                        playlistDetail(item.id)
                                    }}>{item.name}</div>
                                </Col>
                            )
                        }
                    })}
                </Row>
                {loginStatus.code === 200 && loginStatus && userLike &&
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>为你推荐</span></Item>
                </Menu>}
                {loginStatus.code === 200 && loginStatus && userLike &&
                <Row>
                    {userLike.map((item, index) => {
                        if (index < 6) {
                            return (
                                <Col span={4} key={index} style={{marginTop: "20px"}}>
                                    <img className="playlist" src={item.picUrl} style={{
                                        width: "140px",
                                        height: "140px",
                                        borderRadius: "15px",
                                        boxShadow: "10px 10px 5px #888888"
                                    }} alt={index} onClick={() => {
                                        playlistDetail(item.id)
                                    }}/>
                                    <div className="playlist" style={{
                                        textAlign: "left",
                                        width: "140px",
                                        marginLeft: "20px",
                                        marginTop: "10px"
                                    }} onClick={() => {
                                        playlistDetail(item.id)
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
                <Tabs tabPosition="bottom" style={{
                    width: "83%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "60px"
                }} tabBarStyle={{marginLeft: "auto", marginRight: "auto"}} tabBarGutter={40} animated>
                    <TabPane tab="1" key={1}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index < 5) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img className="playlist" src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index} onClick={() => {
                                                playlistDetail(item.id)
                                            }}/>
                                            <div className="playlist" style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
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
                                            <img className="playlist" src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index} onClick={() => {
                                                playlistDetail(item.id)
                                            }}/>
                                            <div className="playlist" style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="3" key={3}>
                        <div style={{display: "flex"}}>
                            {weekData.map((item, index) => {
                                if (index >= 10 && index < 15) {
                                    return (
                                        <div style={{marginLeft: "30px"}} key={index}>
                                            <img className="playlist" src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
                                            }} alt={index}/>
                                            <div className="playlist" style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
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
                                            <img className="playlist" src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} alt={index} onClick={() => {
                                                playlistDetail(item.id)
                                            }}/>
                                            <div className="playlist" style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
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
                                            <img className="playlist" src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
                                            }} alt={index}/>
                                            <div className="playlist" style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
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
                                            <img className="playlist" src={item.picUrl} style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                boxShadow: "10px 10px 5px #888888"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
                                            }} alt={index}/>
                                            <div className="playlist" style={{
                                                marginTop: "20px",
                                                fontFamily: "text",
                                                fontSize: "18px"
                                            }} onClick={() => {
                                                playlistDetail(item.id)
                                            }}>{item.artist.name}</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPane>
                </Tabs>
                <div style={{height: "40px"}}/>
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>人气歌手</span></Item>
                </Menu>
                <Collapse defaultActiveKey={1} accordion style={{marginTop: "20px", fontFamily: "title"}}>
                    <Collapse.Panel key={1} header="中国最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist.map((item, index) => {
                            if (index < 10) {
                                return (
                                    <Row key={index} style={{
                                        display: "flex",
                                        marginBottom: "20px",
                                        borderBottom: "1px solid #DCDCDC"
                                    }}>
                                        <Col span={3}><img src={item.img1v1Url}
                                                           style={{
                                                               width: "56px",
                                                               height: "56px",
                                                               borderRadius: "50%",
                                                               float: "left",
                                                               display: "block"
                                                           }}/></Col>
                                        <Col span={6}>
                                            <div style={{
                                                float: "left",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "text",
                                                marginLeft: "50px"
                                            }}>{item.name}</div>
                                        </Col>
                                        <Col span={8}>
                                            <div style={{
                                                marginLeft: "30px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"Top" + (index + 1)}</div>
                                        </Col>
                                        <Col>
                                            <div style={{
                                                marginLeft: "50px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"人气指数：" + item.score}</div>
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                    </Collapse.Panel>
                    <Collapse.Panel key={2} header="欧美最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist1.map((item, index) => {
                            if (index < 10) {
                                return (
                                    <Row key={index} style={{
                                        display: "flex",
                                        marginBottom: "20px",
                                        borderBottom: "1px solid #DCDCDC"
                                    }}>
                                        <Col span={3}><img src={item.img1v1Url}
                                                           style={{
                                                               width: "56px",
                                                               height: "56px",
                                                               borderRadius: "50%",
                                                               float: "left",
                                                               display: "block"
                                                           }}/></Col>
                                        <Col span={6}>
                                            <div style={{
                                                float: "left",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "text",
                                                marginLeft: "50px"
                                            }}>{item.name}</div>
                                        </Col>
                                        <Col span={8}>
                                            <div style={{
                                                marginLeft: "30px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"Top" + (index + 1)}</div>
                                        </Col>
                                        <Col>
                                            <div style={{
                                                marginLeft: "50px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"人气指数：" + item.score}</div>
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                    </Collapse.Panel>
                    <Collapse.Panel key={3} header="韩国最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist2.map((item, index) => {
                            if (index < 10) {
                                return (
                                    <Row key={index} style={{
                                        display: "flex",
                                        marginBottom: "20px",
                                        borderBottom: "1px solid #DCDCDC"
                                    }}>
                                        <Col span={3}><img src={item.img1v1Url}
                                                           style={{
                                                               width: "56px",
                                                               height: "56px",
                                                               borderRadius: "50%",
                                                               float: "left",
                                                               display: "block"
                                                           }}/></Col>
                                        <Col span={6}>
                                            <div style={{
                                                float: "left",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "text",
                                                marginLeft: "50px"
                                            }}>{item.name}</div>
                                        </Col>
                                        <Col span={8}>
                                            <div style={{
                                                marginLeft: "30px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"Top" + (index + 1)}</div>
                                        </Col>
                                        <Col>
                                            <div style={{
                                                marginLeft: "50px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"人气指数：" + item.score}</div>
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                    </Collapse.Panel>
                    <Collapse.Panel key={4} header="日本最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist3.map((item, index) => {
                            if (index < 10) {
                                return (
                                    <Row key={index} style={{
                                        display: "flex",
                                        marginBottom: "20px",
                                        borderBottom: "1px solid #DCDCDC"
                                    }}>
                                        <Col span={3}><img src={item.img1v1Url}
                                                           style={{
                                                               width: "56px",
                                                               height: "56px",
                                                               borderRadius: "50%",
                                                               float: "left",
                                                               display: "block"
                                                           }}/></Col>
                                        <Col span={6}>
                                            <div style={{
                                                float: "left",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "text",
                                                marginLeft: "50px"
                                            }}>{item.name}</div>
                                        </Col>
                                        <Col span={8}>
                                            <div style={{
                                                marginLeft: "30px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"Top" + (index + 1)}</div>
                                        </Col>
                                        <Col>
                                            <div style={{
                                                marginLeft: "50px",
                                                marginTop: "10px",
                                                fontSize: "20px",
                                                fontFamily: "title2"
                                            }}>{"人气指数：" + item.score}</div>
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                    </Collapse.Panel>
                </Collapse>
            </Content>
        </div>
    );
};

export default Content;
