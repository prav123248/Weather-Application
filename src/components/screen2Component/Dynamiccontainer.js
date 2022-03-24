import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import Clickablelist from './Clickablelist';
import Scheduler from './Scheduler';
import Map from './Map'
import { saveTrail } from './saveData';
import { readData } from './readData';

export var trailSelect;
export var position;

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

    changeSelectedTrail = (val) => {
        this.setState({
            selectedTrail: val
        });
    } 


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
                        <p>{description}</p>
                    </div>
                    

                    <button class="trailButton" onClick={() => this.changeSelectedTrail("")} id="back" type="button">Back</button>
                    <button class="trailButton" id="removal" type="button">Remove trail</button>

                </div>
                <Scheduler />
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

                    <script>
                        src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAc_ODYTZaPzgOdp1FYaqnfmHv9aJ1sP7kcallback=initMap' async
                    </script>
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
