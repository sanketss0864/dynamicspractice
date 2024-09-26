

function getQuickViewFieldValue(executionContext) {    
    var formContext = executionContext.getFormContext();
    var quickViewControl = formContext.ui.quickForms.get("QuickviewControl1721127601094");
    
    if (quickViewControl) {
        if (quickViewControl.isLoaded()) {
            var quickViewData = quickViewControl.getControl("test_email");
            if (quickViewData) {
                var dataValue = quickViewData.getAttribute().getValue();
                console.log("Field value: " + dataValue);

                if (dataValue === null || dataValue === "") {
                    quickViewData.setVisible(false);  
                } else {
                    quickViewData.setVisible(true);   
                }
            } else {
                console.log("Field not found in quick view control.");
            }
        } else {
            console.log("Quick view control is not loaded yet.");
        }
    } else {
        console.log("Quick view control not found.");
    }
}