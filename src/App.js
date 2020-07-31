import React, {useEffect, useState} from 'react';
import './App.css';
import {Layout} from 'antd'
import Header from "./components/header";
import Content from "./components/content";

function App() {

    const [banner,setBanner] = useState([]);

    useEffect(()=>{
        const send = async () => {
            const res = await fetch("http://localhost:3000/banner");
            const data = await res.json();
            console.log(data);
            setBanner(data.banners);
        }
        send();
    },[])

    return (
        <div className="App">
            <Layout>
                <Header />
                {console.log(banner)}
                <Content banner={banner}/>
            </Layout>
        </div>
    );
}

export default App;
