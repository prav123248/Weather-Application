import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import Clickablelist from './Clickablelist';
import Scheduler from './Scheduler';
import Map from './Map'
import { saveTrail } from '../saveData';
import { readData } from '../readData';
import { removeTrail } from '../removeData';
export var trailSelect;
export var position;

/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * The method below allows changes to be made to the global variables position which hold latitude and longitude coordinate values.
 * 
 * Position latitude and longitude are set by the Map component and accessed when saving data, when latitude and longitude are required.
 * The trail selected is also stored globally here so it seemed much easier to also stored the associated position in the same location.
 * 
 * @param  (type number lat, type number lng)  
 * @return ()
 */
export let setPosition = (lat,lng) => {
    if (lat === null) {
        position = undefined
        return
    }
    position = {lat, lng};

}

export default class Dynamiccontainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrail : "",
            addTrail : false
        };

    }

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method sets the state of a variable called selectedTrail to the value passed in the parameter, which is usually a string
    * 
    * The selectedTrail state usually stores the name of a trail that has been selected or "", meaning no trail has been selected.
    * The method is called from the clickableList component which passes the name of the trail that has been clicked into it.
    * Setting this variable to the name of a trail renders different HTML, ones specific to the selected trail such as its description.d type.
    * 
    * @param  (String val)  
    * @return ()
    */

    changeSelectedTrail = (val) => {
        this.setState({
            selectedTrail: val
        });
    } 

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * This method is used primarily by buttons and reverses the boolean state of the addTrail variable. 
    * 
    * The add trail state determines whether the user will be presented with the screen that allows them to add new trails to the system.
    * If the state is true, they will be on the add page and buttons such as cancel and back can use this method to move back to the original screen. The same call happens once a new trail has been saved.
    * If the state is false, the add button can use this method to cause the rendering of the add trail page. 
    * 
    * @param  ()  
    * @return ()
    */
    changeAddTrail = () => {
        if (this.state.addTrail === true) {
            this.setState({
                addTrail: false
            })
        }
        else {
            this.setState({
                addTrail: true
        })
    }
        
   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * Three different containers are dynamically rendered by using state variables to determine which screen must be shown. 
    * 
    * If a trail has been selected, the first if statement evaluates to true and the saved record for the trail selected is found. This data is then used in the display trail details and scheduling options.
    * If the add trail state is true, the HTML rendered is of the add trail page which features a map and several inputs.
    * In all other settings, the default screen will be a clickable list which allows the above state variables to be changed and result in different containers to be rendered here.
    * 
    * @param  ()  
    * @return (Object JSX HTML)
    */

    }

    render(){
        
        if (this.state.selectedTrail != "") {
            trailSelect = this.state.selectedTrail;
            var trailList = readData()
            var description = "No description exists for this trail"
            for (var i=0; i<trailList.length; i++) {
                if (trailList[i][0] === trailSelect) {
                    if (trailList[i][3] !== "") {
                        description = trailList[i][3]
                    }
                    break
                }
            }
            return (
                <div class="trailPage">
                <div class="upperScrollContainer">
                    <div class="titleSection">
                        <h2>Trail : {trailSelect}</h2>
                    </div>
                    <div class="trailDescription">
                        <p class="nonCapital">{description}</p>
                    </div>
                    

                    <button class="trailButton" onClick={() => this.changeSelectedTrail("")} id="back" type="button">Back</button>
                    <button class="trailButton" id="removal" onClick={() => { removeTrail(); this.changeSelectedTrail("") }} type="button">Remove trail</button>

                </div>
                <Scheduler changeTrail={this.changeSelectedTrail}/>
                </div>
            );
        }
        else if (this.state.addTrail === true) {
            return (
                <div class="addTrailPage">
                    <h3>Select the trail location</h3>
                    <div id="mapsContainer">
                        <Map setCoord={this.setCoords} />
                    </div>

                    <div class="addForm">
                        <input id="nameInput" minLength="1" maxLength="20" type="text" placeholder="Trail Name"></input>
                        <textarea id="descriptionInput" name="description" placeholder="Description"></textarea>
                    
                        <button class="addTrailButton" id="add" onClick={() => { saveTrail(); this.changeAddTrail()}} type="button">Add</button>
                        <button class="addTrailButton" id="cancel" onClick={this.changeAddTrail} type="button">Cancel</button>
                    </div>
                </div>                
            )
        }
        else {
            return (
                <div id="listManage">
                    <Clickablelist trailChanger={this.changeSelectedTrail} selectedTrail={this.state.selectedTrail} />
                    <div class="lowerMessageContainer">
                        <p class="basicMessage">Click on a trail above to schedule a hike or click the button below to add a new trail</p>
                    </div>
                    <div id="switchAddContainer">
                        <button onClick={this.changeAddTrail} id="switchAddPage" type="button">Add New Trail</button>
                    </div>
                </div>
            
            );
        }
    }
}
