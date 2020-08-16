import React from 'react';
import {Layout, Menu} from 'antd'
import {BrowserRouter as Route, Switch, useHistory} from "react-router-dom"
import PlayList from "./playlist";

const My = ({mymusic, comment, setMusicUrl, play, setPlay, setComment}) => {

    const {Sider, Content} = Layout;
    const {SubMenu, Item} = Menu;
    const history = useHistory();

    const myList = async (id) => {
        const res = await fetch(`http://localhost:3000/playlist/detail?id=${id}`, {
            credentials: "include",
            mode: "cors"
        });
        const data = await res.json();
        setPlay(data.playlist);
        const res1 = await fetch(`http://localhost:3000/comment/playlist?id=${id}`);
        const data1 = await res1.json();
        setComment(data1);
    }

    return (
        <Layout style={{marginLeft: "15vw", marginRight: "15vw", height: "1000px"}}>
            <Sider theme={"light"} style={{overflow: "auto", position: "fixed", height: "1000px"}}>
                <Menu style={{height:"100%"}} mode={"inline"} onSelect={({key})=>{history.push(`/mymusic/${mymusic.playlist[key].id}`);myList(mymusic.playlist[key].id)}} defaultSelectedKeys={['0']} defaultOpenKeys={['0']}>
                    <SubMenu title={"创建的歌单"} style={{fontSize: "18px", fontFamily: "text"}} key={0}>
                        {mymusic.playlist && mymusic.playlist.map((item, index) => {
                            return (
                                <Item key={index} style={{fontFamily: "微软雅黑"}}>{item.name}</Item>
                            )
                        })}
                    </SubMenu>
                    <SubMenu title={"收藏的歌单"} style={{fontSize: "18px", fontFamily: "text"}}>

                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{width:"70%",paddingLeft:"13vw"}}>
                <Switch>
                    <Route path={`/mymusic`}>
                        {play && <PlayList comment={comment} setMusicUrl={setMusicUrl} play={play}/>}
                    </Route>
                    {mymusic.playlist && mymusic.playlist.map((item, index) => {
                        return (
                            <Route path={`/mymusic/${item.id}`} key={index}>
                                {play && <PlayList comment={comment} setMusicUrl={setMusicUrl} play={play}/>}
                            </Route>
                        )
                    })}
                </Switch>
            </Content>
        </Layout>
    );
};

export default My;
