import React from 'react';
import {Avatar, Button, Col, Empty, Row, Typography, Tag, Comment, Menu, Pagination, Spin} from "antd";
import {PlayCircleOutlined, EnvironmentOutlined, DislikeOutlined, LikeOutlined} from '@ant-design/icons'

const PlayList = ({play, setMusicUrl, comment, margin}) => {

    const play1 = async (id) => {
        const res = await fetch(`http://localhost:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicUrl(data.data[0].url);
    }

    return (
        <div style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
            marginLeft: margin,
            marginRight: margin,
            padding: "20px"
        }}>
            <div style={{float: "left", width: "100%", display: "flex"}}>
                {!play.tracks && <Spin />}
                {play.tracks && <img src={play.coverImgUrl} alt="null"
                                     style={{
                                         width: "208px",
                                         height: "208px",
                                         border: "2px solid red",
                                         float: "left"
                                     }}/>}
                <Typography style={{float: "left", marginLeft: "20px"}}>
                    <Typography.Title level={3} style={{fontFamily: "title", float: "left"}}>
                        {play.name}
                    </Typography.Title>
                    <div style={{float: "left", width: "100%"}}>
                        {!play.tracks && <Spin/>}
                        {play.tracks && <Avatar src={play.creator.avatarUrl}
                                                style={{float: "left"}}/>}
                        {!play.tracks && <Spin/>}
                        {play.tracks && <Typography.Text
                            style={{
                                float: "left",
                                marginTop: "5px",
                                marginLeft: "10px"
                            }}>{play.creator.nickname + "于" + " " + "2020年8月1日创建"}</Typography.Text>}
                    </div>
                    <div style={{float: "left", width: "100%", marginTop: "10px"}}>
                        {!play.tracks && <Spin/>}
                        {play.tracks && play.tags.map((item, index) => {
                            return (
                                <Tag color="#f50" key={index} style={{float: "left"}}>{item}</Tag>
                            )
                        })}
                    </div>
                    <Typography.Paragraph ellipsis={{rows: 4, expandable: true, symbol: 'more'}}
                                          style={{
                                              width: "700px",
                                              float: "left",
                                              textAlign: "left",
                                              marginTop: "10px",
                                          }}>
                        {play.description}
                    </Typography.Paragraph>
                </Typography>
            </div>
            <Row style={{
                borderBottom: "2px solid red",
                fontSize: "20px",
                fontFamily: "text",
                borderRadius: "5px",
            }} className="row">
                <Col span={1}/>
                <Col span={6}>歌名</Col>
                <Col span={5}>作者</Col>
                <Col span={10}>歌曲信息</Col>
                <Col span={2}>时长</Col>
            </Row>
            {!play.tracks && <Empty style={{marginTop: "400px", height: "600px"}}/>}
            {play.tracks && play.tracks.map((item, index) => {
                return (
                    <Row key={index} style={{
                        marginTop: "10px", borderBottom: "2px solid #F9F9F9", float: "left",
                        width: "100%"
                    }} className="songs">
                        <Col span={1}><Button icon={<PlayCircleOutlined/>} type="primary" shape="circle" size='small'
                                              onClick={() => {
                                                  play1(item.id)
                                              }}/></Col>
                        <Col span={6}>{item.name}</Col>
                        <Col span={5}>{item.ar.map((item, index) => {
                            return <span key={index}>{item.name + " "}</span>
                        })}</Col>
                        <Col span={10}>{item.alia.length ? item.alia.map((item, index) => {
                            return <span key={index}>{item}</span>
                        }) : <span>无此歌曲信息</span>}</Col>
                        <Col span={2}>time</Col>
                    </Row>
                )
            })}
            {play.tracks && <Pagination total={play.tracks.length} pageSize={10}/>}
            <Menu mode="horizontal"
                  style={{borderBottom: "2px solid #C10D0C", float: "left", width: "100%", marginTop: "30px"}}>
                <Menu.Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                    style={{fontSize: "20px", color: "black", marginTop: "20px"}}>评论</span></Menu.Item>
            </Menu>
            <Comment style={{width: "100%", float: "left"}}
                     content={
                         <div>
                             <div style={{
                                 marginTop: "20px",
                                 width: "100%",
                                 height: "80px",
                                 border: "1px solid #DCDCDC",
                                 borderRadius: "5px"
                             }}/>
                             <Button htmlType="submit" type="primary" style={{float: "right", marginTop: "10px"}}>
                                 发表评论
                             </Button>
                         </div>
                     }
                     avatar={
                         <Avatar
                             src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                             alt="Han Solo"
                         />
                     }
            />
            {comment.hotComments && comment.hotComments.length &&
            <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C", float: "left", width: "100%"}}>
                <Menu.Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                    style={{fontSize: "20px", color: "black", marginTop: "20px"}}>最热评论</span></Menu.Item>
            </Menu>}
            {comment.hotComments && comment.hotComments.map((item, index) => {
                return <Comment content={item.content} author={item.user.nickname}
                                datetime={new Date(item.time).toLocaleString()}
                                avatar={<Avatar src={item.user.avatarUrl} style={{width: "36px", height: "36px"}}/>}
                                key={index} style={{
                    float: "left",
                    width: "100%",
                    textAlign: "left",
                    borderBottom: "1px solid #DCDCDC",
                }}>
                    <div style={{marginBottom: "10px", marginLeft: "5px", marginTop: "0px", top: "-10px"}}>
                        <LikeOutlined/>
                        <span>{item.likedCount}</span>
                        <DislikeOutlined style={{marginLeft: "20px"}}/>
                    </div>
                    {item.beReplied.map((item, index) => {
                        return (
                            <Comment content={item.content} author={item.user.nickname}
                                     avatar={<Avatar src={item.user.avatarUrl}
                                                     style={{width: "36px", height: "36px"}}/>}
                                     key={index} style={{
                                float: "left",
                                width: "100%",
                                textAlign: "left",
                                background: "#DCDCDC",
                                borderRadius: "10px",
                                marginBottom: "10px",
                                paddingLeft: "10px"
                            }}/>
                        )
                    })}
                </Comment>
            })}
            {comment.comments && comment.comments.length &&
            <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C", float: "left", width: "100%"}}>
                <Menu.Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                    style={{fontSize: "20px", color: "black", marginTop: "20px"}}>最新评论</span></Menu.Item>
            </Menu>}
            {comment.comments && comment.comments.map((item, index) => {
                return <Comment content={item.content} author={item.user.nickname}
                                datetime={new Date(item.time).toLocaleString()}
                                avatar={<Avatar src={item.user.avatarUrl} style={{width: "36px", height: "36px"}}/>}
                                key={index} style={{
                    float: "left",
                    width: "100%",
                    textAlign: "left",
                    borderBottom: "1px solid #DCDCDC",
                }}>
                    <div style={{marginBottom: "10px", marginLeft: "5px", marginTop: "0px", top: "-10px"}}>
                        <LikeOutlined/>
                        <span>{item.likedCount}</span>
                        <DislikeOutlined style={{marginLeft: "20px"}}/>
                    </div>
                    {item.beReplied.map((item, index) => {
                        return (
                            <Comment content={item.content} author={item.user.nickname}
                                     avatar={<Avatar src={item.user.avatarUrl}
                                                     style={{width: "36px", height: "36px"}}/>}
                                     key={index} style={{
                                float: "left",
                                width: "100%",
                                textAlign: "left",
                                background: "#DCDCDC",
                                borderRadius: "10px",
                                marginBottom: "10px",
                                paddingLeft: "10px"
                            }}/>
                        )
                    })}
                </Comment>
            })}
            <Pagination defaultCurrent={1} total={20} pageSizeOptions={10} style={{marginTop: "20px"}}/>
        </div>
    );
};

export default PlayList;
