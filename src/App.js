import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Layout} from 'antd'
import Header from "./components/header";
import Content from "./components/content";
import {LeftOutlined, RightOutlined} from "@ant-design/icons"

function App() {

    const [visible, setVisible] = useState(false);
    const [banner, setBanner] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const img = useRef(null);
    const [loginState, setLoginState] = useState({});
    const [userLike, setUserLike] = useState([]);
    const [weekData, setWeekData] = useState([]);

    useEffect(() => {
        const login = async () => {
            const res = await fetch("http://localhost:3000/login/status", {credentials: "include",mode:"cors"});
            const data = await res.json();
            setLoginState(data)
        }
        const newAlbum = async () => {
            const res = await fetch("http://localhost:3000/top/album?limit=30");
            const data = await res.json();
            setWeekData(data.weekData);
        }
        const like = async () => {
            const res1 = await fetch("http://localhost:3000/recommend/resource", {
                credentials: "include",
            });
            const data1 = await res1.json();
            setUserLike(data1.recommend);
        }
        const send = async () => {
            const res = await fetch("http://localhost:3000/banner");
            const data = await res.json();
            setBanner(data.banners);
        }
        const gedan = async () => {
            const res = await fetch("http://localhost:3000/top/playlist?limit=12");
            const data = await res.json();
            setPlaylist(data.playlists);
        }
        send();
        gedan();
        like();
        newAlbum();
        login();
    }, [])

    return (
        <div className="App">
            <Layout>
                <Header visible={visible} setVisible={setVisible} setUserLike={setUserLike} userLike={userLike}
                        loginStatus={loginState}/>
                <div style={{display: "flex"}}>
                    <div className="div" style={{width: "500px", height: "394px"}}><LeftOutlined
                        style={{fontSize: "51px", float: "right", marginRight: "20px"}} className="icon"
                        onClick={() => {
                            img.current.prev()
                        }}/></div>
                    <Content banner={banner} playlist={playlist} img={img} visible={visible} setVisible={setVisible}
                             loginState={loginState} userLike={userLike} weekData={weekData}/>
                    <div className="div" style={{width: "500px", height: "394px"}}><RightOutlined
                        style={{fontSize: "51px", float: "left", marginLeft: "20px"}} className="icon" onClick={() => {
                        img.current.next()
                    }}/></div>
                </div>
            </Layout>
        </div>
    );
}

export default App;
