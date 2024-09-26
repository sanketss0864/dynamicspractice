async function openHtmlWebResource(PrimaryControl) {
    var formContext = PrimaryControl;
    console.log("PrimaryControl:", PrimaryControl);
    var pageInput = {
        pageType: "webresource",
        webresourceName: "nw_updatename" // The name of your HTML web resource
    }; 
    var navigationOptions = {
        target: 2, // 2 for opening in a dialog
        width: 600, // Width of the dialog
        height: 400, // Height of the dialog
        position: 1 // Centered
    };

    // Store the formContext globally so it can be accessed within the HTML web resource
    window.top.formContext = formContext;

    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
        function success() {
            console.log("Web resource opened successfully.");
        },
        function error() {
            console.error("Error opening web resource.");
        }
    );
}

