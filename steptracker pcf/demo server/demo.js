var base64 = require('base-64');
var utf8 = require('utf8');

authid="ACf1195bb5fc38a60b0dd30f0f15cf054c";
authtoken="dd8483c80df015d44249edf9a68e0972";

const myHeaders = new Headers();
//  myHeaders.append("Authorization", "Basic QUNmMTE5NWJiNWZjMzhhNjBiMGRkMzBmMGYxNWNmMDU0YzpkZDg0ODNjODBkZjAxNWQ0NDI0OWVkZjlhNjhlMDk3Mg==");
myHeaders.append("Authorization", `Basic ${base64.encode(utf8.encode(authid+":"+authtoken))}`);
// console.log(base64.encode(utf8.encode(authid+":"+authtoken)))
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.twilio.com/2010-04-01/Accounts/ACf1195bb5fc38a60b0dd30f0f15cf054c/Messages/MMadccea06de89b5916f9608c3cbf7dce5/Media/ME13d8d427d081e3090330b5878a2faf77", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    var bytes = utf8.encode(result);
    var encoded = base64.encode(bytes);
    // console.log("byte"+encoded)
console.log(result);
    })
  .catch((error) => console.error("error"+error));



