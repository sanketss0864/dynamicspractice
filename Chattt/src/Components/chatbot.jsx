import { useState, useRef, useEffect } from 'react';
import './Chat.css';
// import responsesData from './responsesData';

const Chat = () => {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);
const [chatstatus,setchatstatus]=useState(false);
  const toggleChat = () => {
    setActive(!active);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim() && !isSending) {
      setIsSending(true);

      setMessages([...messages, { text: input, type: 'user' }]);

      setInput('');

      setTimeout(() => {
        // const keyword = extractKeyword(input);
        // const response = getRandomResponse(keyword);

        // if (response === 'Sorry, I didn\'t understand that.') {
        //   setMessages(prevMessages => [
        //     ...prevMessages,
        //     { text: response, type: 'bot' },
        //     { text: 'Would you like to chat with a live agent?', type: 'bot' }
        //   ]);
        // } else {
        //   setMessages(prevMessages => [...prevMessages, { text: response, type: 'bot' }]);
        // }
        handleAgentChat()
        setIsSending(false);
      }, 1000);
    }
  };
  const fetchMessages = () => {
    fetch('http://localhost:3001/get-messages')
      .then(response => response.json())
      .then(data => {
        setMessages(prevMessages => [...prevMessages, ...data.messages]);
      })
      .catch(error => console.error('Error fetching messages:', error));
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);
  // const extractKeyword = (input) => {
  //   const words = input.toLowerCase().split(' ');
  //   for (let word of words) {
  //     for (let key in responsesData.keywords) {
  //       if (responsesData.keywords[key].includes(word)) {
  //         return key;
  //       }
  //     }
  //   }
  //   return null;
  // };

  // const getRandomResponse = (keyword) => {
  //   if (keyword && responsesData.responses[keyword]) {
  //     const responses = responsesData.responses[keyword];
  //     return responses[Math.floor(Math.random() * responses.length)];
  //   }
  //   return "Sorry, I didn't understand that.";
  // };

  const handleAgentChat = () => {
    setIsSending(true);
    if(chatstatus==false){
    fetch('http://localhost:3001/send-whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Hi Sachin User requested to chat with a live agent.' })
    })
      .then(response => {
        if (response.ok) {
          setMessages(prevMessages => [...prevMessages, { text: 'Connecting you to a live agent...', type: 'bot' }]);
          setchatstatus(true)
        } else {
          setMessages(prevMessages => [...prevMessages, { text: 'Failed to connect to a liveeeee agent.', type: 'bot' }]);
        }
        setIsSending(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Failed to connect to a live agent.', type: 'bot' }]);
        setIsSending(false);
      });
    }
    else{
      console.log("current message",messages)
      fetch('http://localhost:3001/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message:  messages[messages.length-1].text})
      })
      .then(response=>{
        if(response){
          setIsSending(false);  
        }
      })
    }
  
  };
  

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
       <div className={`chat ${active ? 'active' : ''}`}>
        <div className="chat-cont">
          <div className="chat-top">Chatbot</div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type === 'user' ? 'chat-query' : 'chat-response'}`}>
                <div className={`chat-text ${msg.type === 'user' ? 'chat-query-text' : ''}`}>{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
            {messages.some(msg => msg.text === 'Would you like to chat with a live agent?') && (
              <div className="agent-chat-btn" onClick={handleAgentChat}>
                Chat with Agent
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Input your text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isSending}
            />
            <div
              className="send-btn"
              onClick={handleSend}
              style={{ cursor: isSending ? 'not-allowed' : 'pointer' }}
            >
              <i className="ti ti-send"></i>
            </div>
          
          </div>
        </div>
      </div>

      <div className="chat-open-btn" onClick={toggleChat}>
        <i className="ti ti-brand-hipchat"></i>
      </div>
    </>
  );
};

export default Chat;
