import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Screen1 from './components/screen1Component/Screen1';
import Screen2 from './components/screen2Component/Screen2';
import Screen3 from './components/screen3Component/Screen3';
import './styles/common.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedScreen : 1
        };
    }

    screenSwitch(val) {
        this.setState({
            selectedScreen : val
        });
        this.render()
    };


    
    render(){
        if (this.state.selectedScreen === 3) {
            return (<Screen3 instance={this} />)
        }
        else if (this.state.selectedScreen === 2) {
            return (<Screen2 instance={this} />)
            }
        else {
            return (<Screen1 instance={this} />)
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));