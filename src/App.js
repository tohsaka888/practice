import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Affix, Layout, BackTop} from 'antd'
import Header from "./components/header";
import Content from "./components/content";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Search from "./components/Search";
import PlayList from "./components/playlist";
import My from "./components/My";

function App() {

    const [play, setPlay] = useState({})
    const [songData, setSongData] = useState([]);
    const [musicSrc, setMusicSrc] = useState("");
    const [visible, setVisible] = useState(false);
    const [banner, setBanner] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const img = useRef(null);
    const [loginState, setLoginState] = useState({});
    const [userLike, setUserLike] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [comment, setComment] = useState({});
    const [artist, setArtist] = useState([]);
    const [artist1, setArtist1] = useState([]);
    const [artist2, setArtist2] = useState([]);
    const [artist3, setArtist3] = useState([]);
    const [mymusic, setMymusic] = useState({});

    const login = async () => {
        await fetch("http://localhost:3000/login/refresh", {credentials: "include", mode: "cors"});
        const res = await fetch("http://localhost:3000/login/status", {credentials: "include", mode: "cors"});
        const data = await res.json();
        await fetch("http://localhost:3000/login/refresh", {credentials: "include", mode: "cors"});
        setLoginState(data);
    }
    const newAlbum = async () => {
        const res = await fetch("http://localhost:3000/top/album?limit=30", {mode: "cors"});
        const data = await res.json();
        setWeekData(data.weekData);
    }
    const like = async () => {
        const res = await fetch("http://localhost:3000/recommend/resource", {
            credentials: "include",
            mode: "cors",
        });
        const data = await res.json();
        setUserLike(data.recommend);
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

    const toplist = async () => {
        const res = await fetch("http://localhost:3000/toplist/artist?type=1", {mode: "cors"});
        const data = await res.json();
        setArtist(data.list.artists);
        const res1 = await fetch("http://localhost:3000/toplist/artist?type=2", {mode: "cors"});
        const data1 = await res1.json();
        setArtist1(data1.list.artists);
        const res2 = await fetch("http://localhost:3000/toplist/artist?type=3", {mode: "cors"});
        const data2 = await res2.json();
        setArtist2(data2.list.artists);
        const res3 = await fetch("http://localhost:3000/toplist/artist?type=4", {mode: "cors"});
        const data3 = await res3.json();
        setArtist3(data3.list.artists);
    }

    useEffect(() => {
        like();
        login();
        newAlbum();
        send();
        gedan();
        toplist();
    }, [])

    return (
        <div className="App">
            {console.log(musicSrc)}
            <Router>
                <Layout>
                    <BackTop visibilityHeight={100}/>
                    <Header visible={visible} setVisible={setVisible} setUserLike={setUserLike} userLike={userLike}
                            loginStatus={loginState} songData={songData} setSongData={setSongData} setPlay={setPlay}
                            setLoginStatus={setLoginState} setMymusic={setMymusic} setComment={setComment}/>
                    <Switch>
                        <Route exact path="/">
                            <Content banner={banner} playlist={playlist} img={img} visible={visible}
                                     setVisible={setVisible} setPlay={setPlay} setComment={setComment}
                                     loginStatus={loginState} userLike={userLike} weekData={weekData}
                                     artist={artist} artist1={artist1} artist3={artist3} artist2={artist2}
                            />
                        </Route>
                        <Route path={`/mymusic`}><My mymusic={mymusic} comment={comment} setMusicUrl={setMusicSrc}
                                                     play={play} setComment={setComment} setPlay={setPlay}/></Route>
                        <Route path={`/search`}><Search songData={songData} setMusicSrc={setMusicSrc}/></Route>
                        <Route path={`/playlist`}><PlayList play={play} setMusicUrl={setMusicSrc}
                                                            comment={comment} margin="250px"/></Route>
                    </Switch>
                    <div style={{height: "20px"}}/>
                    <Affix offsetBottom={0} className="audio" style={{zIndex: "100"}}>
                        <div style={{
                            background: "black",
                            height: "70px",
                            padding: "8px",
                            borderRadius: "50px",
                            zIndex: "100"
                        }}>
                            <audio
                                src={musicSrc} autoPlay
                                controls style={{
                                width: "70vw",
                                marginLeft: "auto",
                                marginRight: "auto",
                                background: "black",
                                border: "none"
                            }}/>
                        </div>
                    </Affix>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
