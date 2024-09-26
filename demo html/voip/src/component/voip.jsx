/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Device } from "@twilio/voice-sdk";

const VoiceCall = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const callingToken = useRef(null);
  const device = useRef(null);
  const activeCall = useRef(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          "https://voice-javascript-sdk-quickstart-node-kq07.onrender.com/token"
        );
        callingToken.current = response.data.token;
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (callingToken.current) {
      device.current = new Device(callingToken.current, {
        codecPreferences: ["opus", "pcmu"],
      });
      
      device.current.on("incoming", (incomingConnection) => {
        console.log("Incoming call from:", incomingConnection.parameters.From);
        setIncomingCall(incomingConnection);
      });

      device.current.register();
    }

    return () => {
      if (device.current) {
        device.current.unregister();
      }
    };
  }, [callingToken.current]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const validKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "#"];
      if (validKeys.includes(event.key) && !isCalling) {
        setPhoneNumber((prev) => prev + event.key);
      } else if (event.key === "Backspace" && !isCalling) {
        handleDelete();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isCalling]);

  const handleCall = async () => {
    try {
      if (!device.current) {
        throw new Error("Device not initialized");
      }
      const params = {
        To: `+91${phoneNumber}`,
        callerId: +18304838189,
      };
      setIsCalling(true);
      const callInstance = await device.current.connect({ params });
      activeCall.current = callInstance;

      callInstance.on("accept", () => {
        console.log("Call accepted");
      });
      callInstance.on("ringing", () => {
        console.log("Ringing");
      });
      callInstance.on("answered", () => {
        console.log("Call answered");
      });
      callInstance.on("connected", () => {
        console.log("Call connected");
      });
      callInstance.on("disconnect", () => {
        console.log("Call disconnected");
        setIsCalling(false);
        activeCall.current = null;
      });
      callInstance.on("cancel", () => {
        console.log("Call canceled");
        setIsCalling(false);
        activeCall.current = null;
      });
    } catch (error) {
      console.error("Error making call:", error);
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

  const handleHangup = () => {
    if (activeCall.current) {
      activeCall.current.disconnect();
      setIsCalling(false);
    }
  };

  const handleAnswerCall = () => {
    if (incomingCall) {
      incomingCall.accept();
      setIncomingCall(null);
      setIsCalling(true);
    }
  };

  const handleRejectCall = () => {
    if (incomingCall) {
      incomingCall.reject();
      setIncomingCall(null);
    }
  };

  const toggleNotebook = () => {
    setIsNotebookOpen((prev) => !prev); 
  };

  return (
    <div className="dialer">
      <h1>Make a Voice Call</h1>
      <div className="dialer">
        <input className="display" type="text" value={isCalling ? `Calling... ${phoneNumber}` : phoneNumber || "Dial a number..."} readOnly/>
          
        {/* </input> */}
       
        <div className="keypad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
            (digit) => (
              <button
                key={digit}
                onClick={() => handleDial(digit)}
                disabled={isCalling}
              >
                {digit}
              </button>
            )
          )}
        </div>
        <button className="call" onClick={handleCall} disabled={isCalling}>
          Call
        </button>
        {/* <button className="erase" onClick={handleDelete} disabled={isCalling}>
          Delete
        </button> */}
        <button className="erase" onClick={handleHangup} disabled={!isCalling}>
          Hang Up
        </button>
      </div>

      {incomingCall && (
        <div className="incoming-call">
          <h2>Incoming call from: {incomingCall.parameters.From}</h2>
          <button onClick={handleAnswerCall}>Answer</button>
          <button onClick={handleRejectCall}>Reject</button>
        </div>
      )}

      {isNotebookOpen && (
        <div className="notebook">
          <h2>Notebook</h2>
          <textarea
            placeholder="Write your notes here..."
            rows="10"
            cols="30"
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default VoiceCall;
