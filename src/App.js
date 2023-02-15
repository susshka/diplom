import React, {useState} from "react";
import {Routes, Route} from 'react-router-dom';
import Workspace from "./components/Castom_components/Workspase_component/Workspace";
import "./styles/App.css";
import Layout from "./components/UI/layout/Layout";


function App() {
  var Dates = new Array(4);
  var date = new Date(2018, 1, 15, 11, 33, 30, 0);
  for(var p = 0; p < 4; p++) {
      date.setDate(date.getDate() + 1);
      Dates[p] = new Date(date);   
      //document.write("<br>"+d);// тут работает
  }

  const usersData = [{login:"Aboba", password:"1234"},
                      {login:"Lola", password:"12345"},
                      {login:"Pop", password:"1111fg"}]

  /*здесь в posts по-сути должны лежать значения из запроса к базе, который происходит перед созданием самого массива posts и отображает всё ПО*/
   const [posts, setPosts]=useState([{id: Date.now()+1, title:'ARM NSI', date: Dates[0].toLocaleString(), status:"Ok", errorID:"23R345",errorDIS:"щукапмущшкомщушкомшщуком"},
                                  {id: Date.now()+2, title:'SiteLine', date: Dates[1].toLocaleString(), status:"Ok",errorID:"23R33345",errorDIS:"цйумуцйщшмщшцйрмцрйм"},
                                  {id: Date.now()+3, title:'Kontur', date: Dates[2].toLocaleString(), status:"Ok",errorID:"23R3rqd45",errorDIS:"цуйщшрмцйррррзршмцймсцвсй"},
                                  {id: Date.now()+4, title:'Polearm', date: Dates[3].toLocaleString(), status:"Ok",errorID:"23Rr32345",errorDIS:"цйумщшгмцййршщвтсцймщшгм"},
                                  ]); 
const [userData, setUserData] = useState({login:"", password:""});
const saveUserData = (data) => {
    if (usersData.find(ud => ud.login===data.login && ud.password===data.password)){  
        setUserData({login:data.login, password:data.password});
        /*userData.login=data.login;
        userData.password=data.password;*/
        console.log(userData)
        return true;
    }
    else{
        /*userData.login="";
        userData.password="";*/
        setUserData({login:"",password:""});
        console.log(userData)
        return false;
    }
}

const [logging, setLogging] = useState("Войти");
const [modal, setModal] = useState(false);
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Layout modal={modal} setModal={setModal} saveUserData={saveUserData} logging={logging} setLogging={setLogging} userData={userData} setUserData={setUserData}/>}>
          <Route path="soft_info" element={<Workspace posts={posts} setPosts={setPosts} usersData={usersData} saveUserData={saveUserData}/>}/>
          <Route path="logs_list" element={<Workspace/>}/>
        </Route>  
      </Routes>
     {/*<Workspace/>*/}

    </div>
    );
}

export default App;
