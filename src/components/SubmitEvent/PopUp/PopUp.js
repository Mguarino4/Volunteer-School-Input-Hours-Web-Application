import React from 'react';  
import './style.css';  
import QRCode from 'qrcode.react'

class Popup extends React.Component {  
  render() {  
return (  
        <div className='popup'>  
            <h1>Congrats! You have successfully created an event. A referal code has been sent out to 
                the list of emails. You can use this QR code for additional students to join the event via our mobile application</h1> 
            <div className='popup\_inner'>
                <div className="box">
                <QRCode value={this.props.text}></QRCode>
                    </div>  
            
            <button onClick={this.props.closePopup}>close me</button>  
            </div>  
        </div>  
);  
}  
}  

export default Popup;