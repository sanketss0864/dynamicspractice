function retrievevalue(){
    Xrm.WebApi.retrieveRecord("nw_student", "f8af7832-8e49-ef11-acce-6045bda56ea9", "?$select=nw_name").then(
        function success(result) {
            console.log("Retrieved values: Name: " + JSON.stringify(result));
        },
        function (error) {
            console.log(error.message);
           
        }
    );
}