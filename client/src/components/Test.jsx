import React, {useState} from 'react';

const Test = function () {
    const eng="Hello World!";
    const ru="Привет мир!";
    const [text, setText]=useState(eng);
  
    function ClickBtn(){
      if(text===ru) setText(eng);
      else setText(ru);
      console.log(text)
    }
  
    return (
      <div className="Text">
      <h1>{text}</h1>
      <button onClick={ClickBtn}>Жмак</button>
      </div>
    );
};

export default Test;