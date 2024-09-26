import "./App.css";
import Chat from "./Components/chatbot";
import UnassignedSession from "./Components/UnassigendSession";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <UnassignedSession onAccept={(session) => console.log(session)} />
          }
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
