import React from 'react';
import {Button, Col, Empty, Row} from "antd";
import {PlayCircleOutlined} from '@ant-design/icons'

const Search = ({songData, setMusicSrc, cookie}) => {

    const play = async (id) => {
        const res = await fetch(`http://localhost:3000/song/url?id=${id}&cookie=${cookie}`);
        const data = await res.json();
        setMusicSrc(data.data[0].url);
    }

    return (
        <div style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
            marginLeft: "250px",
            marginRight: "250px"
        }}>
            <Row style={{borderBottom: "2px solid red", fontSize: "20px", fontFamily: "title2", borderRadius: "5px",marginTop:"0px"}}
                 className="row">
                <Col span={1}/>
                <Col span={6}>歌名</Col>
                <Col span={5}>作者</Col>
                <Col span={10}>歌曲信息</Col>
                <Col span={2}>时长</Col>
            </Row>
            {songData.length === 0 && <Empty style={{marginTop: "200px", height: "600px"}}/>}
            {songData.map((item, index) => {
                return (
                    <Row key={index} style={{
                        marginTop: "10px", borderBottom: "2px solid #F9F9F9", float: "left",
                        width: "100%"
                    }}>
                        <Col span={1}><Button icon={<PlayCircleOutlined/>} type="primary" shape="circle" size='small'
                                              onClick={() => {
                                                  play(item.id)
                                              }}/></Col>
                        <Col span={6}>{item.name}</Col>
                        <Col span={5}>{item.artists.map((item, index) => {
                            return <span key={index}>{item.name + " "}</span>
                        })}</Col>
                        <Col span={10}>{item.alias.length ? item.alias.map((item = "null", index) => {
                            return <span key={index}>{item}</span>
                        }) : <span>无此歌曲信息</span>}</Col>
                        <Col span={2}>time</Col>
                    </Row>
                )
            })}
        </div>
    );
};

export default Search;
