import React, {Component} from 'react';
import '../../styles/common.css';




export default class Loading extends Component {
   
    /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * A message is passed to the loading screen as a prop and this is outputted.
    * 
    * A message is passed to this prop, usually regarding why the user has to wait for something to load. This is then returned.
    * 
    *
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */
    render(){
        
        return (
            <div id="loading" className="container"> 
                <h1>{this.props.message}</h1>
            </div>
        );
    }
}
