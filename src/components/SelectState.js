import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import ParkInfo from '../pages/ParkInfo';


const SelectState = () =>{
    const[usImg, setUsImg]=useState(null);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    
    const [parkSelect, setParkSelect] = useState(null);

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '90%',
      },
    };

    function openModal(id) {
      setIsOpen(true);
      setParkSelect(id);
    }

    function closeModal() {
      setIsOpen(false);
    }

    const findState = (event)=>{
      let selection = event.target.value;
      fetch ("https://developer.nps.gov/api/v1/parks?api_key=rZhcCrv2n16zgelgmIc2adI61HkaEArFIMeHhH6E&stateCode="+selection)
        .then((resp)=>resp.json())
        .then((data)=>setUsImg(data))
    }
    
    return(
    <div id="stateUS">
    <select onChange={findState}>
      <option value="">Choose a State</option>
      <option value="AL">Alabama</option>
      <option value="AK">Alaska</option>
      <option value="AZ">Arizona</option>
      <option value="AR">Arkansas</option>
      <option value="CA">Californie</option>
      <option value="NC">Caroline du Nord</option>
      <option value="SC">Caroline du Sud</option>
      <option value="CO">Colorado</option>
      <option value="CT">Connecticut</option>
      <option value="ND">Dakota du Nord</option>
      <option value="SD">Dakota du Sud</option>
      <option value="DE">Delaware</option>
      <option value="FL">Floride</option>
      <option value="GA">Géorgie</option>
      <option value="HI">Hawaï</option>
      <option value="ID">Idaho</option>
      <option value="IL">Illinois</option>
      <option value="IN">Indiana</option>
      <option value="IA">Iowa</option>
      <option value="KS">Kansas</option>
      <option value="KY">Kentucky</option>
      <option value="LA">Louisiane</option>
      <option value="ME">Maine</option>
      <option value="MD">Maryland</option>
      <option value="MA">Massachussets</option>
      <option value="MI">Michigan</option>
      <option value="MN">Minnesota</option>
      <option value="MS">Mississippi</option>
      <option value="MO">Missouri</option>
      <option value="MT">Montana</option>
      <option value="NE">Nebraska</option>
      <option value="NV">Nevada</option>
      <option value="NH">New Hempshire</option>
      <option value="NJ">New Jersey</option>
      <option value="NM">Nouveau-Mexique</option>
      <option value="NY">New York</option>
      <option value="OH">Ohio</option>
      <option value="OK">Oklahoma</option>
      <option value="OR">Oregon</option>
      <option value="PA">Pennsylvanie</option>
      <option value="RI">Rhode Island</option>
      <option value="TN">Tennessee</option>
      <option value="TX">Texas</option>
      <option value="UT">Utah</option>
      <option value="VT">Vermont</option>
      <option value="VA">Virginie</option>
      <option value="WV">Virginie-Occidentale</option>
      <option value="WA">Washington</option>
      <option value="WI">Wisconsin</option>
      <option value="WY">Wyoming</option>
    </select>

    {
      usImg != null &&
      <div>
        {
          
          usImg.data.map((s)=>{
            return(
              <div className="parkByState">
                  <img id="imgPark" src={s.images[0].url} alt=""/>
                  <div className="textPark">
                    <h3>{s.fullName}</h3>
                    <p>{s.description}</p>
                    <button onClick={()=>openModal(s.id)}>More information</button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <ParkInfo id={parkSelect}/>
                      <button id='modalBtnClose' onClick={closeModal}>close</button>
                    </Modal>
                  </div>
                </div>
            )
          })
        } 

      </div>
    }
  </div>
    )        
}
    


export default SelectState;