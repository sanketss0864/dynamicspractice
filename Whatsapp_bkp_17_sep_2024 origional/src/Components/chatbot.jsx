/* eslint-disable no-unused-vars */

import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Chat.css";
import { useLocation, useNavigate } from "react-router-dom";


const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionid = location.state?.sessionid;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);
  const [chatstatus, setChatStatus] = useState(false);
  const [authconfig, setAuthconfig] = useState({});
  const [media, setMedia] = useState(null); 
  const [mediaName, setMediaName] = useState(""); 
const [mediaType,setMediaType]=useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      let base64String = reader.result;


      base64String = base64String.replace(/^data:.+;base64,/, "");

      setMedia(base64String); 
    };

    reader.readAsDataURL(file); 
    setMediaName(file?.name || ""); 
   setMediaType(`.${file.type.split("/")[1]}`)
  };




  useEffect(() => {
    if (sessionid) {
      localStorage.setItem("sessionid", sessionid);
    }
  }, [sessionid]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleSend = () => {
    if (input.trim() && !isSending) {
      setIsSending(true);
      const userMessage = { text: input, type: "user" ,hasMedia: media?true:false,
        mediaUrl: media?media:"",filetype:media?mediaType:""};
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
setMedia("")
      setTimeout(() => {
        handleAgentChat(userMessage.text);
        setIsSending(false);
      }, 1000);
    }
  };
  const assignSessionToUser = (sessionid) => {
    return new Promise((resolve, reject) => {
      const context = window.Xrm.Utility.getGlobalContext();
      var record = {};
      record["ownerid@odata.bind"] = `/systemusers(${context.userSettings.userId
        .replace("{", "")
        .replace("}", "")})`;
        record["statuscode"]=121300001;
      parent.Xrm.WebApi.updateRecord("bt_session", sessionid, record).then(
        function success(result) {
          var userId = result.id;
          console.log(userId);
          resolve(userId);
        },
        function (error) {
          console.log(error.message);
          reject(error);
        }
      );
    });
  };


  const postMessage = (sessionid, message) => {


    const context = window.Xrm.Utility.getGlobalContext();
 
    var serverURL = context.getClientUrl();

  
    var actionName = "bt_WhatsappChatbotActionv1"; 
 
    const data = {
      sessionid: sessionid,
      message: message,
      media: media ? media : "",
      mediaName: mediaName ? mediaName : "",
    };

    var req = new XMLHttpRequest();
    req.open("POST", serverURL + "/api/data/v9.2/" + actionName, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
      if (this.readyState == 4 ) {
        req.onreadystatechange = null;

        if (this.status == 200 || this.status == 204) {

          const result = JSON.parse(this.response);
          fetchMessages(sessionid);
          setIsSending(false);
          setChatStatus(true);
       
        } else {
          var error = JSON.parse(this.response).error;
        
        }
      }
    };
    req.send(window.JSON.stringify(data));
  };

  const fetchMessages = (sessionid) => {

    window.Xrm.WebApi.retrieveMultipleRecords(
      "bt_chat",
      "?$select=bt_chatid,bt_message,bt_fileurl,bt_filetype&$filter=(statuscode eq 121300001 and _bt_session_value eq " +
        sessionid +
        " and bt_direction eq 1)&$orderby=createdon asc"
    ).then(
      function success(results) {
        console.log(results);
        const newMessages = results.entities.map((msg) => ({
          text: msg.bt_message,
          type: "bot",
          chatid: msg.bt_chatid,
          hasMedia: false,
          mediaUrl: "",
          filetype: msg.bt_filetype,
        }));
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);

        results.entities.forEach((result) => {
          setReadStatus(sessionid, result["bt_chatid"]);
          fetchMedia(result["bt_chatid"], result["bt_message"]);
        });
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  const fetchAllMessages = (sessionid) => {
    window.Xrm.WebApi.retrieveMultipleRecords(
      "bt_chat",
      "?$select=bt_direction,bt_chatid,bt_message,bt_fileurl,bt_filetype&$filter=_bt_session_value eq " +
        sessionid
    ).then(
      function success(results) {
        const newMessages = results.entities.map((msg) => ({
          text: msg.bt_message,
          type: msg.bt_direction === 2 ? "user" : "chat-query",
          chatid: msg.bt_chatid,
          hasMedia: false,
          mediaUrl: "",
          filetype: msg.bt_filetype,
        }));

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);

        results.entities.forEach((msg) => {
          setReadStatus(sessionid, msg["bt_chatid"]);
          fetchMedia(msg["bt_chatid"], msg["bt_message"]);
        });
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  const setReadStatus = (sessionid, chatid) => {
    var record = {};
    record.statuscode = 1; 

    window.Xrm.WebApi.updateRecord("bt_chat", chatid, record).then(
      function success(result) {
        var updatedId = result.id;

      },
      function (error) {
        console.log(error.message);
      }
    );

  };
  const fetchMedia = (chatid, messageText) => {
    window.Xrm.WebApi.retrieveMultipleRecords(
      "annotation",
      "?$filter=_objectid_value eq " + chatid
    ).then(
      function success(results) {
        console.log(results.entities[0].documentbody, "fffffffffffffffffff");
        if (results.entities.length > 0) {
     
          const mediaUrl = results.entities[0].documentbody;
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.chatid === chatid
                ? { ...msg, hasMedia: true, mediaUrl } 
                : msg
            )
          );
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  };
  const handleAgentChat = (message) => {

    setIsSending(true);
    if (!chatstatus) {
 
      assignSessionToUser(sessionid).then(() => {
      });
    }
    postMessage(sessionid, message);
  };
  const handleCloseSession = () => {
    fetch(
      "https://prod-22.centralindia.logic.azure.com:443/workflows/888a929ffb4041c1b67585dd768ebfb5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=q4AWJZg7aw86AKHdUJuijbDYFHJ9Xi3tnZvujnaSLO4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Session closed successfully.");
          localStorage.removeItem("sessionid");
          navigate("/");
        } else {
          console.error("Failed to close the session.");
        }
      })
      .catch((error) => {
        console.error("Error closing the session:", error);
      });
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    let intervalId;
    if (sessionid) {
      intervalId = setInterval(() => {
        fetchMessages(sessionid);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [sessionid]);


  const goToSessionList = () => {
    navigate("/");
  };
  return (
    <>
      <div className={`chat active`}>
        <div className="chat-cont">
          <div className="chat-top">
            <img src="" alt="" />
            <button className="alert" onClick={handleCloseSession}>
              Close Session
            </button>
            <button
              className="alert2"
              onClick={() => fetchAllMessages(sessionid)}
            >
              Retrieve chats
            </button>
            <button
              className="alert2"
              onClick={() => goToSessionList(sessionid)}
            >
              Back to Sessions
            </button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg?.type === "user" ? "chat-query" : "chat-response"
                }`}
              >
                <div
                  className={`chat-text ${
                    msg?.type === "user"
                      ? "chat-query-text"
                      : "chat-response-text"
                  }`}
                >
                  {msg?.text}
                  {msg.mediaUrl && (
                    <div className="chat-media-response">
                      <div className="chat-media">
                        {/* Dynamically render different media types based on file type */}
                        {msg.filetype.includes("jpeg") && (
                          <img
                            className="media_section"
                            src={`data:image/${msg.filetype.replace(
                              ".",
                              ""
                            )};base64,${msg.mediaUrl}`}
                            alt="Media"
                          />
                        )}
                        {msg.filetype.includes("mp4") && (
                          <video className="media_section" controls>
                            <source
                              src={`data:video/${msg.filetype.replace(
                                ".",
                                ""
                              )};base64,${msg.mediaUrl}`}
                              type={`video/${msg.filetype.replace(".", "")}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {msg.filetype.includes("ogg") && (
                          <audio className="media_section" controls>
                            <source
                              src={`data:audio/${msg.filetype.replace(
                                ".",
                                ""
                              )};base64,${msg.mediaUrl}`}
                              type={`audio/${msg.filetype.replace(".", "")}`}
                            />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                        {!msg.filetype.includes("image") &&
                          !msg.filetype.includes("video") &&
                          !msg.filetype.includes("audio") && (
                            <a
                              href={`data:${msg.filetype};base64,${msg.mediaUrl}`}
                              download={`file.${msg.filetype}`}
                            >
                              Download File{msg.filetype}
                            </a>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* <div
         
                className="chat-response"
              >
                <div
                  className="chat-response-text"
                >
                <img className="media_section" src={messages.mediaUrl} alt="static img" />
                </div>
              </div> */}

            <div ref={chatEndRef} />
            {messages.some(
              (msg) => msg?.text === "Would you like to chat with a live agent?"
            ) && (
              <div className="chat-live-agent-button" onClick={handleAgentChat}>
                Chat with Live Agent
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Type a message..."
              disabled={isSending}
            />
        
<div className="image-upload">
    <label htmlFor="file-input">
    <i className="ti ti-paperclip"></i>
    </label>
    <input
    id="file-input"
            type="file"
            accept="image/*,video/*,audio/*"
            onChange={handleFileChange} // Handle media file change
          />

</div>
            <button onClick={handleSend} disabled={isSending}>
              Send
              <i className="ti ti-send-2"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Chat.propTypes = {
  sessionid: PropTypes.string.isRequired,
};

export default Chat;
