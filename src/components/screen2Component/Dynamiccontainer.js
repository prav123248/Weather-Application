import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import Clickablelist from './Clickablelist';
import Scheduler from './Scheduler';
import {
    MapContainer, TileLayer, Marker, Popup 
} from 'react-leaflet';



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

    addTrailMode = () => {
        this.setState({
            addTrail: true
        })

    }

    leafletMap = () => {

        return (
            <MapContainer center={[51.505, -0.09]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        )}




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
                    <h2>Select the trail location</h2>
                    <div id="mapsContainer">
                        {this.leafletMap()}
                    </div>

                    <div class="addForm">
                        <input type="text" placeholder="Trail Name"></input>
                        <input type="text" placeholder="Description"></input>
                    
                        <button class="addButton" id="Add" type="button">Add</button>
                        <button class="addButton" id="cancel" type="button">Cancel</button>
                    </div>

                    <script>
                        src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAc_ODYTZaPzgOdp1FYaqnfmHv9aJ1sP7kcallback=initMap' async
                    </script>
                </div>                
            )
        }
        else {
            return (
                <Clickablelist trailChanger={this.changeSelectedTrail} selectedTrail={this.state.selectedTrail} addTrail={this.addTrailMode}/>
            );
        }
    }
}
