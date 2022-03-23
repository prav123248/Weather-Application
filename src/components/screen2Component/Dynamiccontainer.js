import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import Clickablelist from './Clickablelist';
import Scheduler from './Scheduler';
import Map from './Map'

export default class Dynamiccontainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrail : "",
            addTrail : false,
            latitude: null,
            longitude: null
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

    setCoords = (lat,lng) => {
        this.setState({
            latitude: lat,
            longitude: lng
        })
    }

    render(){
        
        if (this.state.selectedTrail != "") {
            return (
                <div class="trailPage">
                <div class="upperScrollContainer">
                    <div class="titleSection">
                        <h2>Trail : {this.state.selectedTrail}</h2>
                    </div>
                    <div class="trailDescription">
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's                     hen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into e
                        lectronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages
                        , and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
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
                        <input id="nameInput" type="text" placeholder="Trail Name"></input>
                        <textarea id="descriptionInput" name="description" placeholder="Description"></textarea>
                    
                        <button class="addTrailButton" id="add" type="button">Add</button>
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
                <Clickablelist trailChanger={this.changeSelectedTrail} selectedTrail={this.state.selectedTrail} addTrail={this.changeAddTrail} />
            );
        }
    }
}
