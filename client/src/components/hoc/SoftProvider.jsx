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
                console.log(result.data)
                setMsg(result.statusText)
                setError(null)
                for(var i=0; i<result.data.length; i++){
                    setSoft([{id:result.data[i].id, soft_code: result.data[i].gen_c.soft_code, 
                        soft_name: result.data[i].gen_c.soft_name, err_code: result.data[i].er.err_code, 
                        last_upd: result.data[i].last_upd_date, last_log_hash: result.data[i].last_log_hash, 
                        last_log_id: result.data[i].last_log_id}])
                }
                console.log(soft);
            },
            (error) => {
                console.log(error)
                setMsg(error.statusText)
                setError(true)
            }
        )
    }


    const value ={soft, error, msg, setSoftList}

    return <SoftContext.Provider value={value}>
        {children}
    </SoftContext.Provider>
}