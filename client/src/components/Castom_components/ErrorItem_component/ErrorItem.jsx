import React from 'react';
import classes from './ErrorItem.module.css'

const ErrorItem = (props) => {
  var err_code = '-----';
  var err_descr = '-----';
  var err_date_qry = '-----';
  var err_status = '-----';
  if(props.err.err_code) err_code=props.err.err_code;
  if(props.err.err_descr) err_descr=props.err.err_descr;
  if(props.err.err_status) err_status=props.err.err_status;
  if(props.err.err_date_qry) err_date_qry=props.err.err_date_qry;
    return (
        <div className={classes.ErrorItem}>
            <strong className={classes.title_code}>{props.err.id_er}</strong>
            <strong className={classes.title_code_err}>{err_code}</strong>
            <strong className={classes.title_code}>{props.err.sf_code}</strong>
            <div className={classes.title_error_d}>
              <p className={classes.title_error_dscr}>{err_descr}</p>
            </div>
            <div className={classes.title_field}>
              <p>{err_date_qry}</p>
            </div>
            <strong className={classes.title}>{err_status}</strong>
            <div className={classes.title_coef}>
              <p>{props.err.coef_status}</p>
            </div>  
        </div>
    );
};

export default ErrorItem;