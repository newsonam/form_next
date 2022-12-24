import { useState, useEffect, use } from 'react';
import styles from '../styles/Home.module.css'

import dynamic from 'next/dynamic';

const Map = dynamic(
    () => import('./Map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
)
let dataLocation = [];
export default function FormControl(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [location, setLocation] = useState({
        latitude: 'null',
        longitude: 'null'
    });
    const [positionData, setPositionData] = useState([null]);
    const [selected, setSelected] = useState(props.users[0].value);

    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
    };

    const handleChangeLocation = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setLocation(prevValues => ({ ...prevValues, [id]: value }));
        dataLocation = Object.values(location);
        setPositionData(dataLocation);
        console.log("data is", dataLocation);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await saveFormData({ "title": title, "body": body });
        if (response.status === 201) {
            alert("form submitted successfully");

        } else {
            alert(response.status + " " + "http STATUS error!!");
        }

    }


    async function saveFormData(data) {
        return await fetch("https://jsonplaceholder.typicode.com/posts", {
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            method: "POST"
        })
    }


    console.log("location data", location);
    console.log("location data", positionData);

    return (
        <div className='mainwrapper'>
            <form className="form-container w-100 m-auto" onSubmit={handleSubmit} method="post">
                <h1 className='title'>FORM DATA</h1>
                <div className='centeralign w-50 row m-auto mb-3'>
                    <label htmlFor="name" className='col-sm-6' >UserName</label>
                    <select id="name" className='col-sm-6' onChange={handleChange} required>

                        {props.users.map((user) => (

                            <option key={user.id} value={user.id}>{user.name}</option>


                        ))}
                    </select><br />
                    <div className='centeralign w-50 row m-auto mb-3'>
                        <label htmlFor="location" className='col' >Location</label>
                        <div> <label>Latitude</label> <select id="latitude" name="latitude" className='col-sm-6' value={location.latitude} onChange={handleChangeLocation} required>

                            {props.users.map((user) => (

                                <option key={user.id} value={user.address.geo.lat}>{user.address.geo.lat}</option>


                            ))}
                        </select><br /></div>
                        <div> <label>Longitude</label>   <select id="longitude" name="longitude" className='col-sm-6' value={location.longitude} onChange={handleChangeLocation} required>

                            {props.users.map((user) => (

                                <option key={user.id} value={user.address.geo.lng}>{user.address.geo.lng}</option>


                            ))}
                        </select><br /></div>
                    </div>

                    <Map />

                </div>
                <div className='centeralign w-50 row m-auto mb-3'>
                    <label htmlFor="title" className='col-sm-6'>Title</label>
                    <input type="text" className='col-sm-6' id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
                </div>
                <div className='centeralign w-50 row m-auto mb-3'>
                    <label htmlFor="body" className='col-sm-6'>Body</label>
                    <input type="text" className='col-sm-6' id="body" value={body} onChange={(e) => setBody(e.target.value)} required /><br />
                </div>
                <div className='centeralign'> <button className="btn btn-primary mb-2 submitbtn" type="submit">SUBMIT</button></div>

            </form>
        </div>
    )
}


