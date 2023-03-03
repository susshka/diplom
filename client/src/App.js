import React, {useState} from "react";
import {Routes, Route} from 'react-router-dom';
import WorkspaceInfo from "./components/Castom_components/Workspase_component/WorkspaceInfo";
import "./styles/App.css";
import Layout from "./components/UI/layout/Layout";
import WorkspaceLogs from "./components/Castom_components/Workspase_component/WorkspaceLogs";
import RequireAuth from './components/hoc/RequireAuth'
import { AuthProvider } from "./components/hoc/AuthProvider";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./components/hook/useAuth";
import {SoftProvider} from './components/hoc/SoftProvider'
import AddingSoftPage from "./pages/AddingSoftPage";
import WorkspaseErrors from "./components/Castom_components/Workspase_component/WorkspaseErrors";
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
        setUserData(data);  
        console.log(userData)
        return true;
    }
    else{
        
        setUserData({login:"",password:""});
        console.log(userData)
        return false;
    }
}


/*const [modal, setModal] = useState(true);*/
const [logging, setLogging] = useState("Войти");
const [userTitle, setUserTitle]=useState("Авторизуйтесь")
    


/*const EaE = (navigate,signout) => {
    if(userData.login==="" && userData.password===""&&logging==="Войти"){
        setModal(true)
    }
    else if (userData.login!=="" && userData.password!==""&&logging==="Выйти"){
        signout(() => navigate('/', {replace:true}))
        setLogging("Войти")
        setUserData({login:"",password:""});
        setUserTitle("Авторизуйтесь")
    }
}*/
  return (
    <div className="App">
    <AuthProvider users={usersData} setLogging={setLogging} setUserTitle={setUserTitle}>
      <SoftProvider>
        <Routes>
          <Route path="/" element={<Layout userTitle={userTitle} logging={logging}/>}>
            <Route index element={
              <RequireAuth>
                <HomePage/>
              </RequireAuth>
            }/>
            <Route path="soft_info" element={
              <RequireAuth>
                <WorkspaceInfo posts={posts}/>
              </RequireAuth>
            }/>
            <Route path="add_soft" element={
              <RequireAuth>
                <AddingSoftPage/>
              </RequireAuth>
            }/>
            <Route path="errors" element={
              <RequireAuth>
                <WorkspaseErrors/>
              </RequireAuth>
            }/>
            <Route path="logs_list" element={
              <RequireAuth>
                <WorkspaceLogs posts={posts}/>
              </RequireAuth>
            }/>
            {/*<Route path="auth" element={<ModalAuth modal={modal} setModal={setModal} saveUserData={saveUserData} setLogging={setLogging} setUserTitle={setUserTitle}/>}/>*/}
            <Route path='auth' element={<LoginPage/>}/>
            <Route path='register' element={<RegisterPage/>}/>
          </Route>  
        </Routes>
      </SoftProvider>
    </AuthProvider>
     {/*<Workspace/>*/}
    </div>
    );
}

export default App;
