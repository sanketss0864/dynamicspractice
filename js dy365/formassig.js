function lockEmailIfNameEmpty(executionContext) {
    var formContext = executionContext.getFormContext();
    var nwName = formContext.getAttribute("nw_name").getValue();
    var nwEmailControl = formContext.getControl("nw_email");
    if (nwName == null || nwName.trim() === "") {
        nwEmailControl.setDisabled(true);
    } else {
        nwEmailControl.setDisabled(false);
    }
}

function autofillFeeAndLock(executionContext) {
    var formContext = executionContext.getFormContext();
    var nwFee = formContext.getAttribute("nw_fee");
    // Set the value to 20000 if it's not already set
    if (nwFee.getValue() === null) {
        nwFee.setValue(20000);
    }
    // Set the field to read-only
    var nwFeeControl = formContext.getControl("nw_fee");
    nwFeeControl.setDisabled(true);
}
