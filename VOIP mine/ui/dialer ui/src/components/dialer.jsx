import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Device } from '@twilio/voice-sdk';
import "./dialer.css"
const Dialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const callingToken = useRef(null);
  const device = useRef(null);
  useEffect(() => {
    const fetchToken = async () => {
      

      try {
   
        const response = await axios.get('https://voice-javascript-sdk-quickstart-node-kq07.onrender.com/token');
       console.log(response.data.token)
    
        callingToken.current = response.data.token;
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);
  const handleCall = async () => {
    try {
      device.current = new Device(callingToken.current, {
        codecPreferences: ['opus', 'pcmu'],
      });
      await device.current.register();
      
      const params = {
        To: `+91${phoneNumber}`,
        callerId: +18304838189,
      };
      if (device.current) {
   
        setIsCalling(true);
        const callInstance = await device.current.connect({ params });
        
        callInstance.on('accept', () => {
          console.log({ callInstance });
        });
        callInstance.on('ringing', () => {
          console.log('Ringing');
        });
        callInstance.on('answered', () => {
          console.log('Call answered');
        });
        callInstance.on('connected', () => {
          console.log('Call connected');
        });
        callInstance.on('disconnect', () => {
          console.log('Call disconnected');
          setIsCalling(false); 
        });
        callInstance.on('cancel', () => {
          console.log('Call canceled');
          setIsCalling(false);
        });
      } else {
        throw new Error('Unable to make call');
      }
    } catch (error) {
      console.error('Error making call:', error);
      setIsCalling(false);
    }
  };
  const handleDial = (digit) => {
    if (!isCalling) {
      setPhoneNumber((prev) => prev + digit);
    }
  };
  const handleDelete = () => {
    if (!isCalling) {
      setPhoneNumber((prev) => prev.slice(0, -1));
    }
  };
  const toggleNotebook = () => {
    setIsNotebookOpen((prev) => !prev);
  };
  return (
    <div>
      <h1>Make a Voice Call</h1>
      <div className="dialer">
        <div className="display">
          {isCalling ? `Calling... ${phoneNumber}` : `${phoneNumber}`}
        </div>
        <div className="keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
            <button 
              key={digit} 
              onClick={() => handleDial(digit)} 
              disabled={isCalling}
            >
              {digit}
            </button>
          ))}
          <div className='call_to_action'>
            <button className='call' onClick={handleCall} disabled={isCalling}>Call</button>
            <button className='erase' onClick={handleDelete} disabled={isCalling}>Delete</button>
            <button className='notebook' onClick={toggleNotebook}>
              {isNotebookOpen ? 'Close Notebook' : 'Open Notebook'}
            </button>
          </div>
        </div>
      </div>
      {isNotebookOpen && (
        <div className="notebook">
          <h2>Notebook</h2>
          <textarea placeholder="Write your notes here..." rows="10" cols="30"></textarea>
        </div>
      )}
    </div>
  );
};

export default Dialer;
