"use client";

import "./App.css";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {APIProvider, Map, Marker, InfoWindow, useApiIsLoaded} from "@vis.gl/react-google-maps";
import {renderSchoolInfo} from "./components/SchoolInfo";
import {useLoadScript} from "@react-google-maps/api";
import purposeIcon from "./assets/purpose.webp";
import filterIcon from "./assets/filter.png";
import Purpose from "./components/Purpose.js"
const libraries = ["places"];

//location of API Key
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

//List of CUNY Schools calculate distance between coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers

    return d;
}

function NavBar({onFiltersChange, onPurposeChange}) {
    const [checkedCunyWide,
        setCheckedCunyWide] = React.useState(false);
    const [checkedBorough,
        setCheckedBorough] = React.useState(false);
    const [checkedWalkIn,
        setCheckedWalkIn] = React.useState(false);
    const [filters,
        setFilters] = React.useState({CunyWide: checkedCunyWide, Borough: checkedBorough, WalkIn: checkedWalkIn});
    onFiltersChange(filters)

    const handleChangeCunyWide = () => {
        setCheckedCunyWide(!checkedCunyWide);
        setFilters({
            CunyWide: !checkedCunyWide,
            Borough: checkedBorough,
            WalkIn: checkedWalkIn
        });

    };
    const handleChangeBorough = () => {
        setCheckedBorough(!checkedBorough);
        setFilters({
            CunyWide: checkedCunyWide,
            Borough: !checkedBorough,
            WalkIn: checkedWalkIn
        });

    };
    const handleChangeWalkIn = () => {
        setCheckedWalkIn(!checkedWalkIn);
        setFilters({
            CunyWide: checkedCunyWide,
            Borough: checkedBorough,
            WalkIn: !checkedWalkIn
        });

    };

    const Checkbox = ({label, value, onChange}) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange}/> {label}
            </label>
        );
    };

    //   Cuny-wide , borough, walk in
    return (
        <nav className="navBar">
            <div className="nav-text" onClick={() => onPurposeChange(false)}>CUNY Pantry Finder
            </div>
            <div className="navBar-link">
                <a className="nav-icon" onClick={() => onPurposeChange(true)}>
                    <img src={purposeIcon} alt="Purpose Icon" className="nav-icon"/>
                    Purpose
                </a>
                <a className="nav-icon" href="#Filter">
                    <img src={filterIcon} alt="Filter Icon" className="nav-icon"/>
                    Filter
                </a>
                <div>
                    <Checkbox
                        label="Cuny-Wide"
                        value={checkedCunyWide}
                        onChange={handleChangeCunyWide}/>
                    <Checkbox
                        label="Borough"
                        value={checkedBorough}
                        onChange={handleChangeBorough}/>
                    <Checkbox label="WalkIn" value={checkedWalkIn} onChange={handleChangeWalkIn}/>
                </div>
            </div>
        </nav>
    );
}

function MapComponent({onNearestSchoolsChange, onHoverMarkerChange, filters}) {
    console.log(filters);

    const [position,
        setPosition] = useState(null); // Store user's current location
    const [open,
        setOpen] = useState(false);
    const [nearestSchools,
        setNearestSchools] = useState([]);
    const [hoveredMarkerName,
        setHoveredMarkerName] = useState(null);

    const setHoveredMarker = (name) => {
        onHoverMarkerChange(name); // Call the prop function to update parent's state
    };

    const [resultArray,
        setResultArray] = useState([]);

    useEffect(() => {
        const getInfo = async() => {
            await axios
                .get('https://cuny-pantry-finder-db-47ba1c85de33.herokuapp.com/school-info')
                .then((response) => setResultArray(response.data));
        };
        getInfo();
    }, []);

    // Function to get user's location
    useEffect(() => {
        navigator
            .geolocation
            .getCurrentPosition((position) => {
                const userPosition = {
                    lat: position.coords.latitude, // Coordinates
                    lng: position.coords.longitude
                };
                setPosition(userPosition);

                const sortedSchools = resultArray.map((school) => ({
                    ...school,
                    distance: calculateDistance(userPosition.lat, userPosition.lng, school.lat, school.lng)
                })).sort((a, b) => a.distance - b.distance);

                setNearestSchools(sortedSchools);
                onNearestSchoolsChange(sortedSchools); // Runs setNearestSchool state for App component
            }, (error) => {
                // Error handling
                console.error("Error retrieving location", error);
            });
    }, [resultArray]);

    const {isLoaded, loadError} = useLoadScript({googleMapsApiKey: GOOGLE_MAPS_API_KEY, libraries});

    if (loadError) 
        return <div>Error loading maps</div>;
    
    if (!isLoaded) 
        return <div>Loading maps ...</div>;
    
    // Show the map once the user's position has been retrieved and API loaded
    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <div
                style={{
                height: "100vh",
                width: "100%"
            }}>
                {position && (
                    <Map defaultZoom={14} defaultCenter={position}>
                        <Marker position={position} onClick={() => setOpen(true)}/> {open && (
                            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                <div>
                                    <p>You are here!</p>
                                </div>
                            </InfoWindow>
                        )}

                        {/* Display nearest CUNY schools */}
                        {nearestSchools.map((school, index) => (
                            <Marker
                                key={index}
                                position={{
                                lat: school.lat,
                                lng: school.lng
                            }}// Change icon on hover 
                                icon={{
                                url: hoveredMarkerName === school.schoolName
                                    ? "food_hover.png"
                                    : "food.png", 
                                    scaledSize: new window.google.maps.Size(52, 52), }}
                                onMouseOver={() => {
                                setHoveredMarkerName(school.schoolName);
                                setHoveredMarker(school.schoolName);
                            }}
                                onMouseOut={() => {
                                setHoveredMarkerName(null);
                                setHoveredMarker(null);
                            }}>
                                <InfoWindow
                                    position={{
                                    lat: school.lat,
                                    lng: school.lng
                                }}>
                                    <div>
                                        <h3>{school.name}</h3>
                                        <p>Distance: {school
                                                .distance
                                                .toFixed(2)}
                                            km</p>
                                    </div>
                                </InfoWindow>
                            </Marker>
                        ))}
                    </Map>
                )}
            </div>
        </APIProvider>
    );
}

// } Web App Components
function App() {
    const [nearestSchools, setNearestSchools] = useState([]);
    const [hoveredMarkerName, setHoveredMarkerName] = useState(null);
    const [resultsPageNum, setresultsPageNum] = useState(0);
    const [filters, setFilters] = useState({});
    const [purpose, setPurpose] = useState(false);
    
    const resultsPerPage = 2;
    const maxPages = Math.ceil(nearestSchools.length / resultsPerPage); // Calculates how many pages of results can be displayed based on resultsPerPage

    return (
        <div className="App">
            <header className="App-header">
                <div className="image-header"></div>
                <NavBar onFiltersChange={setFilters} onPurposeChange={setPurpose}/>
                <h1 className="middle-text">Find your nearest CUNY Food Pantry</h1>
            </header>
            {!purpose ? (
            <div className="container">
             
                <MapComponent
                onNearestSchoolsChange={setNearestSchools}
                onHoverMarkerChange={setHoveredMarkerName}
                filters={filters}
            />
            <div className="School-info-section box">     
            <div>
                <div className="pageArrows">
                    <button onClick={() => setresultsPageNum(Math.max(resultsPageNum - 1, 0))}>
                        <div>&lt;</div>
                    </button>
                    {resultsPageNum}
                    <button onClick={() => setresultsPageNum(Math.min(resultsPageNum + 1, maxPages - 1))}>
                        <div>&gt;</div>
                    </button>
                </div>

                {renderSchoolInfo(
                    nearestSchools.slice(
                        resultsPageNum * resultsPerPage,
                        resultsPageNum * resultsPerPage + resultsPerPage
                    ),
                    hoveredMarkerName,
                    filters
                )}
            </div>
    </div>
             
                

                
                
            </div>
            ) : <Purpose /> }
        </div>
    );
}

export default App;