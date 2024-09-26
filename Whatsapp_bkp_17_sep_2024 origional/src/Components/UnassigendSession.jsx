import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

const UnassignedSession = ({ onAccept }) => {
  const [sessions, setSessions] = useState([]);
  const [openSession, setOpenSession] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      const context = window.Xrm.Utility.getGlobalContext();
      window.Xrm.WebApi.retrieveMultipleRecords("bt_session","?$select=bt_sessionid&$expand=bt_conversationid($select=bt_name)&$filter=statuscode eq 1")
      .then(
        function success(result) {
          const sessionData = result.entities.map(entity => ({
            sessionid: entity.bt_sessionid,
            name: entity.bt_conversationid.bt_name
          }));
          console.log(JSON.stringify(context.userSettings.userId));
          setSessions(sessionData);
        },
        function (error) {
          console.log(error.message);
          // handle error conditions
        }
      );
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchOpenSessions = async () => {
      const context = window.Xrm.Utility.getGlobalContext();
      window.Xrm.WebApi.retrieveMultipleRecords("bt_session","?$select=bt_sessionid&$expand=bt_conversationid($select=bt_name)&$filter=statuscode eq 121300001")
      .then(
        function success(result) {
          const openSessionData = result.entities.map(entity => ({
            sessionid: entity.bt_sessionid,
            name: entity.bt_conversationid.bt_name
          }));
          console.log(JSON.stringify(context.userSettings.userId));
          setOpenSession(openSessionData);
        },
        function (error) {
          console.log(error.message);
          // handle error conditions
        }
      );
    };

    fetchOpenSessions();
  }, []);

  const handleAccept = (session) => {
    onAccept(session);
    navigate("/chat", { state: { sessionid: session.sessionid } }); 
  };

  const handleSkip = (sessionid) => {
    setSessions(sessions.filter((session) => session.sessionid !== sessionid));
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter sessions based on search query
  const filteredSessions = sessions.filter(session =>
    session.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOpenSessions = openSession.filter(session =>
    session.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    sessions.length === 0 && openSession.length === 0 ? (
      <p className="no_session">🎉 You're all caught up! No open sessions at the moment. Take a breather, or start something</p>
    ) : (
      <div className="session_div">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search_input"
        />
        <div>
          <h3 className="title">Unassigned Sessions</h3>
          <ul>
            {filteredSessions.map((session) => (
              <li key={session.sessionid} className="session-item">
                <span>{session.name}</span>
                <span className="call_to_action">
                  <button className="success" onClick={() => handleAccept(session)}>Accept</button>
                  <button className="alert" onClick={() => handleSkip(session.sessionid)}>Skip</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="title">Open Sessions</h3>
          <ul>
            {filteredOpenSessions.map((session) => (
              <li key={session.sessionid} className="session-item">
                <span>{session.name}</span>
                <span className="call_to_action">
                  <button className="success" onClick={() => handleAccept(session)}>Accept</button>
                  <button className="alert" onClick={() => handleSkip(session.sessionid)}>Close</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

UnassignedSession.propTypes = {
  onAccept: PropTypes.func.isRequired,
};

export default UnassignedSession;
