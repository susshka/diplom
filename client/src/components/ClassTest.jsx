import React, { Component } from 'react';
const eng="Hello World!";
const ru="Привет мир!";
class ClassTest extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            text: ru
        }
        this.ClickBtn = this.ClickBtn.bind(this);
    }
    ClickBtn(){
        if(this.state.text===ru) this.setState(eng);
        else this.setState(ru);
        console.log(this.state.text)
    }
    render() {
        return (
            <div className="Text">
                <h1>{this.state.text}</h1>
                <button onClick={this.ClickBtn}>Жмак</button>
            </div>
        );
    }
}

export default ClassTest;