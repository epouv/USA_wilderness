import React, {useEffect, useState} from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../App.css';
import 'leaflet/dist/leaflet.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import L from 'leaflet';

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

    useEffect(()=>{
        fetch("https://developer.nps.gov/api/v1/parks?api_key=HtGeKfGroTqfT3YbR94d31DmbprYmSpMqBmo6jer&id="+props.match.params.id)
            .then((resp)=>resp.json())
            .then((data)=> setParkInfo(data))
    }, []);

    useEffect(()=>{
        fetch('https://developer.nps.gov/api/v1/parks?api_key=1zZ6Jzg2ZXCy0Lr9fwlHdv9GIxcxGv4IWgePmqe2&id='+props.match.params.id)
          .then((resp)=>resp.json())
          .then((data)=>setImageSlider(data.data[0].images));
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
            <Menu/>
            {
                parkInfo != null &&
                    parkInfo.data.map((park)=>{
                        return(
                            <div className="infoDiv">
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
            <Footer/>
        </div>
    )
}

export default ParkInfo;