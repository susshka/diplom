import { createContext, useState } from "react";
import axios from "axios";

export const SoftContext = createContext(null);

export const SoftProvider = ({children}) => {

    const [soft, setSoft] = useState([]);
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState("")

    const setSoftList = () => {
        axios.get("/show_table")
        .then(
            (result) => {
                setSoft([])
                setMsg(result.statusText)
                setError(null)
               /* console.log(result.data)*/
                var Items = new Array(result.data.length);
                for(var i=0; i<result.data.length; i++){
                    var item = {id:result.data[i].id_sf, soft_code: result.data[i].gen_c.soft_code, 
                        soft_name: result.data[i].gen_c.soft_name, err_code: result.data[i].err_cd, 
                        last_upd: result.data[i].last_upd_date, last_log_hash: result.data[i].last_log_hash, 
                        last_log_id: result.data[i].last_log_id}
                    Items[i] = item
                }
                setSoft(Items)
            },
            (error) => {
                console.log(error)
                setMsg(error.statusText)
                setError(true)
            }
        )
    }

    const getSoftInfo = (sf_code, state, ind) => {
        axios.get("/general/"+sf_code)
        .then(
            (result) => {
                /*console.log(result.data[0])*/
                state(result.data[0])
            },
            (error) => {
                console.log(error)
            }
        )
    }
    const getSoftErrorsInfo = (sf_code, state, ind) => {
        axios.get("/errors/"+sf_code)
        .then(
            (result) => {
                console.log(result)
                state(result.data)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const setDefaultTime = (sf_code) => {
        axios.put("/general/"+sf_code)
        .then(
            (result) => {
                /*console.log(result)*/
            },
            (error) => {
                console.log(error)
            }
        )
    }
    const addNewSoft = (data, cb) => {
        var msg = ''
        axios.get("/general/check/"+data.soft_code)
        .then(
            (result) => {
                console.log(result.data.message)
                if(result.data.message==="No soft with this code"){
                    if(data.save_type_logs==="database"){
                        var db = {soft_name: data.soft_name, soft_code: data.soft_code, 
                                save_type_logs: data.save_type_logs, 
                                server_name: data.server_name, databs_name: data.databs_name, 
                                table_name: data.table_name, user_name: data.user_name, 
                                pwd: data.pwd, watching: data.watching, 
                                default_time_watching: data.default_time_watching, 
                                active_time_watching: data.active_time_watching};
                        axios.post("/general", db)
                        .then(
                            (result) => {
                                console.log(result)
                                var db_sh = {id_sf_gen:result.data.id,
                                    sf_name: result.data.soft_name, 
                                    sf_code: result.data.soft_code, 
                                    }

                                axios.post("/show_table",db_sh)
                                .then(
                                    (result) => {
                                        console.log(result)
                                        cb("ПО добавлено в general и show_table", false)
                                    },
                                    (error) => {
                                        console.log(error)
                                        msg=error.response.data.message
                                        cb(msg, false)
                                    }
                                )
                            },
                            (error) => {
                                console.log(error)
                                msg=error.response.data.message
                                cb(msg, false)
                            }
                        )
                    }
                    else{
                        var nd = {soft_name: data.soft_name, soft_code: data.soft_code, 
                            save_type_logs: data.save_type_logs, path_dir: data.path_dir, 
                            watching: data.watching, 
                            default_time_watching: data.default_time_watching, 
                            active_time_watching: data.active_time_watching};
                        axios.post("/general", nd)
                        .then(
                            (result) => {
                                console.log(result)
                                var nd_sh = {id_sf_gen:result.data.id,
                                    sf_name: result.data.soft_name, 
                                    sf_code: result.data.soft_code, 
                                    }

                                axios.post("/show_table",nd_sh)
                                .then(
                                    (result) => {
                                        console.log(result)
                                        cb("ПО добавлено в general и show_table", false)
                                    },
                                    (error) => {
                                        console.log(error)
                                        msg=error.response.data.message
                                        cb(msg, false)
                                    }
                                )
                            },
                            (error) => {
                                msg=error.response.data.message
                                console.log(error)
                                cb(msg, false)
                            }
                        )
                    }
                }
                else{
                    cb("Программное обеспечение с таким кодом уже существует", false)
                }
            },
            (error) => {
                console.log(error)
                msg=error.response.data.message
                cb(msg, false)
            }
        )
    }


    const value ={soft, error, msg, setSoftList, getSoftInfo, setDefaultTime, addNewSoft, getSoftErrorsInfo}

    return <SoftContext.Provider value={value}>
        {children}
    </SoftContext.Provider>
}