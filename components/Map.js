import React, { useState, useEffect } from "react";

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

import style from '../styles/Home.module.css';
import { Icon } from 'leaflet'
const myIcon = new Icon({
 iconUrl: 'https://cdn-icons-png.flaticon.com/128/149/149060.png',
 iconSize: [32,32]
})
const Map = ({positionData}) => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (map) {
       setInterval(function () {
          map.invalidateSize();
       }, 100);
    }
 }, [map]);
 useEffect(() => {
  window.navigator.geolocation.getCurrentPosition(
      (newPos) => setPosition(newPos),
      console.error
    );
}, []);

console.log(positionData);
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className={style.map} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map;
