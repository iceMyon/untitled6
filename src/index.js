import React from "react";
import ReactDom from 'react-dom'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";


import App from "./App";

//读取local中保存的user，保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDom.render(<App />,document.getElementById('root'))
