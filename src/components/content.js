import React from 'react';
import {Button, Layout} from "antd"
import "./content.css"

const Content = ({banner}) => {

    const {Content} = Layout;

    return (
        <Content className="content">
            {console.log(banner)}
        </Content>
    );
};

export default Content;
