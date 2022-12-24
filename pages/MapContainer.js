import React,{useState} from 'react';
import { GoogleMap, LoadScript,Marker,InfoWindow } from '@react-google-maps/api';
​
const MapContainer = (props) => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
};
  
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }
  
  return (
     <LoadScript
       googleMapsApiKey='YOUR_API_KEY_HERE'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
          {
            ...props.users.map(item => {
              return (
              <Marker key={item.id} position={item.geo} onClick={() => onSelect(item)}/>
              )
            })
         }

         {
            ...selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
            )
         }
        />
     </LoadScript>
  )
}
​
export default MapContainer;