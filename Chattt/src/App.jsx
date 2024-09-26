
import './App.css'
import Chat from './Components/chatbot'

function App() {
  parent.Xrm.WebApi.retrieveMultipleRecords("bt_conversation", "?$select=name&$top=3").then(
    function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
            console.log(result.entities[i]);
        }                    
        // perform additional operations on retrieved records
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

  return (
    <>
<Chat></Chat>
    </>
  )
}

export default App
