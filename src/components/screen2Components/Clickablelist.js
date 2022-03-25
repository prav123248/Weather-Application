import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import $ from 'jquery';
import { readData } from '../readData';

export default class Clickablelist extends Component {
    constructor(props) {
        super(props);

    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Uses JQuery to give elements of class type trailName a function to execute when clicked. In this case, the text of the clicked trailName element is passed to prop method.
    * 
    * Elements of class name trailName are given click functions where the variables text is obtained and passed into a method called trailChanger. trailChanger takes the text provided
    * and changes a state variable of its own component. This change will create dynamic changes on the page, specifically rendering the screen for trail selection.
    * It must be stated however, that this trailSelection method only assigns the click function to perform to elements of the targetted type.
    * 
    * @param  ()  
    * @return ()
    */
    trailSelection = () => {
        const self = this;
        $('.trailName').on('click', function () {
            var el = $(this).text();
            self.props.trailChanger(el);
        });        
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Once the first render is complete, the traiLSelection method is called to assign click functions to a specific type of element.
    * 
    * The trailSelection method needs to be run after the specified elements have appeared in the DOM. If it runs earlier, it will not have an effect since it will not
    * find the targetted type of elements to assign a click function to. For this reason, it is executed after the component has mounted.
    * 
    * 
    * @param  ()  
    * @return ()
    */

    componentDidMount() {
        this.trailSelection();
    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The render method reads all the stored trails and renders different HTML, responsible for the upper container, depending on whether items have been stored yet.
    * 
    * The render method obtains a list of all the trails stored. It checks the length to see if there are any trails stored in the list.
    * If there are no trails, the trail list will appear with a message stating there are no trails to display. If there are trails, a map is used to iterate through the
    * trail list and display the name. This is contained within a scrollable table to account for overflow. 
    * 
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */


    render(){
        var trailList = readData();

        if (trailList.length <= 0) {
            return (
                <div class="upperScrollContainer">
    
                <div class="titleSection">
                    <h2>Trail List</h2>
                </div>
                
                
                <div class="scrollableTable" id="trailListContainer">
                    <p class="nonCapital">No trails to display. Add some using the button below</p>

    
                    </div>
                </div>      
            );            
        }
        else {
            return (
                <div class="upperScrollContainer">
    
                <div class="titleSection">
                    <h2>Trail List</h2>
                </div>
                
                
                <div class="scrollableTable" id="trailListContainer">
                    {trailList.map((trail) => (
                        <p class="trailName">{trail[0]}</p>
                    ))}
    
                    </div>
                </div>                
            );
        }

    }
}
