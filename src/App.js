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

    useEffect(() => {
        const send = async () => {
            const res = await fetch("http://localhost:3000/banner");
            const data = await res.json();
            setBanner(data.banners);
        }
        const gedan = async () => {
            const res = await fetch("http://localhost:3000/top/playlist?limit=12");
            const data = await res.json();
            // console.log(data.playlists);
            setPlaylist(data.playlists)
        }
        const recommend = async () => {
            const res = await fetch("http://localhost:3000/recommend/resource");
            const data = await res.json();
            console.log(data);
        }
        send();
        gedan();
        recommend();
    }, [])

    return (
        <div className="App">
            <Layout>
                <Header visible={visible} setVisible={setVisible}/>
                <div style={{display: "flex"}}>
                    <div className="div" style={{width: "500px", height: "394px"}}><LeftOutlined
                        style={{fontSize: "51px", float: "right", marginRight: "20px"}} className="icon"
                        onClick={() => {
                            img.current.prev()
                        }}/></div>
                    <Content banner={banner} playlist={playlist} img={img} visible={visible} setVisible={setVisible}/>
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
