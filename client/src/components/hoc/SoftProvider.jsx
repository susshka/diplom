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
                        soft_name: result.data[i].gen_c.soft_name, err_code: result.data[i].er.err_code, 
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
    const addNewSoft = (data) => {
        axios.get("/general/check/"+data.soft_code)
        .then(
            (result) => {
                console.log(result.data.message)
            },
            (error) => {
                console.log(error)
            }
        )
    }


    const value ={soft, error, msg, setSoftList, getSoftInfo, setDefaultTime, addNewSoft}

    return <SoftContext.Provider value={value}>
        {children}
    </SoftContext.Provider>
}