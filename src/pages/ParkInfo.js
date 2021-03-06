import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../App.css';
import 'leaflet/dist/leaflet.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import L, { circle } from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function ParkInfo(props){

    const [imageSlider, setImageSlider] = useState([]);
    const [parkInfo, setParkInfo] = useState(null);
    const [bandeau,setBandeau] = useState(null);

    useEffect(()=>{
        fetch("https://developer.nps.gov/api/v1/parks?api_key=rZhcCrv2n16zgelgmIc2adI61HkaEArFIMeHhH6E&id="+props.id)
            .then((resp)=>resp.json())
            .then((data)=> setParkInfo(data));
        fetch('https://developer.nps.gov/api/v1/parks?api_key=rZhcCrv2n16zgelgmIc2adI61HkaEArFIMeHhH6E&id='+props.id)
            .then((resp)=>resp.json())
            .then((data)=>setImageSlider(data.data[0].images));
        fetch('https://developer.nps.gov/api/v1/alerts?api_key=rZhcCrv2n16zgelgmIc2adI61HkaEArFIMeHhH6E&limit=2&id='+props.id)
            .then((resp)=>resp.json())
            .then((data)=>console.log(data));      
    }, []);

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    

    return(
        <div>
            {
                parkInfo != null &&
                    parkInfo.data.map((park)=>{
                        return(
                            <div className="infoDiv">
                            {
                                bandeau !=null &&
                                bandeau.data.map((p)=>{
                                    return <p>{p.title}</p>
                                })
                            }
                                <h2>{park.fullName}</h2>
                                <div className='divContainer'>
                                <Slider className='slider' {...settings}>
                                    {
                                        imageSlider != null &&
                                        imageSlider.map((image)=>{
                                        return <div key={image.title}>
                                            <img src={image.url} alt={image.altText} className='imageSlider'/>
                                            <p>{image.caption}</p>
                                            </div>
                                        })
                                    }
                                </Slider>
                                </div>
                                  <div className="mapAndDirection">
                                    <MapContainer className="card" center={[parseFloat(park.latitude), parseFloat(park.longitude)]} zoom={13} scrollWheelZoom={false}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[parseFloat(park.latitude), parseFloat(park.longitude)]}>
                                        <Popup>
                                            {park.fullName}
                                        </Popup>
                                        </Marker>
                                    </MapContainer>
                                    <div className="textDirection">
                                        <h3>How to go there?</h3>
                                        <p>{park.directionsInfo}</p>
                                    </div>  
                                  </div>
                            </div>                        
                        );
                    })
            }
        </div>
    )
}

export default ParkInfo;