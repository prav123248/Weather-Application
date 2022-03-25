import React from 'react';
import '../../styles/common.css';
import './style.css';
import {
    MapContainer, TileLayer, useMapEvents 
} from 'react-leaflet';
import L from 'leaflet';
import pin from '../../assets/icons/pin.png'
import { setPosition } from './Dynamiccontainer';


/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * The Map function uses react leaflet to create a map with a single marker on click
 * 
 * The map function uses react leaflet to create a map. An additional function within is used
 * to set markers on the position clicked on the map as well as storing the map coordinates of the position clicked.
 * 
 * 
 * @param  ()  
 * @return (Object JSX HTML)
 */


export default function Map() {

   /* 
    * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
    *
    * The MarkerOnClick uses a hook where on click, the coordinates of the click event are obtained and saved. A marker with an imported image pin is placed on the map at the location of the click.
    * 
    * The method first sets an undefined marker variable. A hook is used to listen to click events and on a click, the latitude and longitude coordinates are obtained. The position is stored in a global 
    * variable stored in another javascript file. If the marker has not been set before, it is added to the screen and if it has been added before, where it currently marks is updated to the newly
    * clicked location. This is because only one marker should be present on the map for clicks.
    * 
    * @param  ()  
    * @return (null)
    */

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








