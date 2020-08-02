import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Layout} from 'antd'
import Header from "./components/header";
import Content from "./components/content";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

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
            const res = await fetch("http://localhost:3000/login/status", {credentials: "include", mode: "cors"});
            const data = await res.json();
            setLoginState(data)
        }
        const newAlbum = async () => {
            const res = await fetch("http://localhost:3000/top/album?limit=30", {mode: "cors"});
            const data = await res.json();
            setWeekData(data.weekData);
        }
        const like = async () => {
            const res1 = await fetch("http://localhost:3000/recommend/resource", {
                credentials: "include",
                mode: "cors",
            });
            const data1 = await res1.json();
            setUserLike(data1.recommend);
        }
        const send = async () => {
            const res = await fetch("http://localhost:3000/banner", {mode: "cors"});
            const data = await res.json();
            setBanner(data.banners);
        }
        const gedan = async () => {
            const res = await fetch("http://localhost:3000/top/playlist?limit=12", {mode: "cors"});
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
            <Router>
                <Layout>
                    <Link to='/search'>
                        <Header visible={visible} setVisible={setVisible} setUserLike={setUserLike} userLike={userLike}
                                loginStatus={loginState}/>
                    </Link>
                    <Route exact path="/">
                        <Content banner={banner} playlist={playlist} img={img} visible={visible} setVisible={setVisible}
                                 loginState={loginState} userLike={userLike} weekData={weekData}/>
                    </Route>
                    <Route path='/search'>search</Route>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
