import React, {Component} from 'react';
import '../../styles/common.css';
import './style.css';
import {
    MapContainer, TileLayer, Marker, Popup, useMapEvents 
} from 'react-leaflet';
import L from 'leaflet';
import pin from '../../assets/icons/pin.png'
import { setPosition } from './Dynamiccontainer';

export default function Map() {
    function MarkerOnClick() {
        let marker;
        const map = useMapEvents({
            click: (e) => {
                const {lat, lng} = e.latlng;
                setPosition(lat, lng)
                if (marker == undefined) {
                    marker = L.marker([lat, lng], {pin}).addTo(map);
                }
                else {
                    marker.setLatLng([lat,lng])
                }
                
            }
        });
        return null;
    }

    return (

        <MapContainer center={[51.505, -0.09]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerOnClick />
        </MapContainer>
    );
}









/**
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentClick : null
        };
        this.MarkerOnClick = this.MarkerOnClick.bind(this);
    }



    MarkerOnClick = (e) => {
        console.log("hey")
        console.log(e.latLng)
        this.setState({currentClick: e.latLng})
    }



    render(){

        if (this.state.currentClick != null) {
            return (
                <MapContainer center={[51.505, -0.09]} zoom={13} onClick={this.MarkerOnClick}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    <Marker position={this.state.currentClick}></Marker>
                    
                </MapContainer>
            )
        }
        else {
        return (
                <MapContainer center={[51.505, -0.09]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            )
        }
    }
}
*/