function displayName(executionContext) {
    var formContext = executionContext.getFormContext();
    var bussiness = formContext.getAttribute("nw_businessid").getValue();
    var taxid = formContext.getAttribute("nw_taxid").getValue();
    // alert("bussiness" + bussiness);
}
function checkvalidity(executionContext) {
    var formContext = executionContext.getFormContext();
    var business = formContext.getAttribute("nw_name").getValue();

    if (business && business.length <= 6) {
        formContext.getControl("nw_name").setNotification("Valid!", "INFO", "validNotification");
    } else {
        formContext.getControl("nw_name").setNotification("Not valid!", "ERROR", "invalidNotification");
    }

    // Clear notification after a few seconds (optional)
    setTimeout(function () {
        formContext.getControl("nw_name").clearNotification("validNotification");
        formContext.getControl("nw_name").clearNotification("invalidNotification");
    }, 1000); // 5000 milliseconds = 5 seconds
    if (business && business.length <= 6) { 
        formContext.ui.setFormNotification("Valid!", "INFO", "validNotificationtop");

    } else {
        formContext.ui.setFormNotification("Not valid!", "ERROR", "invalidNotificationtop");
    }

    // Clear notification after a few seconds (optional)
    setTimeout(function () {
        formContext.ui.clearFormNotification("validNotificationtop");
        formContext.ui.clearFormNotification("invalidNotificationtop");
    }, 5000);
}

function changevalue(executionContext) {
    var formContext = executionContext.getFormContext();
    var bussiness = formContext.getAttribute("nw_businessid").getValue();
    // var taxid = formContext.getAttribute("nw_taxid").getValue();

    setTimeout(function () {
        formContext.getAttribute("nw_taxid").setValue(bussiness);
    }, 1000);
}

function genderModel(executionContext) {
    var formContext = executionContext.getFormContext();
    var genderval = formContext.getAttribute("nw_gender").getText();

    // Check if genderval is not null or undefined
    if (genderval) {
        var alertStrings = {
            confirmButtonLabel: "OK",
            text: "Selected gender: " + genderval
        };
        var alertOptions = {
            height: 200,
            width: 450
        };

        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
            function success(result) {
                console.log("Alert dialog closed");
            },
            function error() {
                console.log("Error opening alert dialog");
            }
        );
    } else {
        console.log("Gender value is null or undefined.");
    }


}

function hideSection(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the tab that contains the section
    var tab = formContext.ui.tabs.get("General");

    if (tab) {
        // Get the section within the tab
        var section = tab.sections.get("General_section_3");

        if (section) {
            // Hide the section
            section.setVisible(false);
        } else {
            console.log("Section not found: General_section_3");
        }
    } else {
        console.log("Tab not found: General");
    }
}

function toggleSectionBasedOnGender(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the value of the gender field
    var genderval = formContext.getAttribute("nw_gender").getText();

    // Get the tab that contains the section
    var tab = formContext.ui.tabs.get("General");

    if (tab) {
        // Get the section within the tab
        var section = tab.sections.get("General_section_3");

        if (section) {
            // Check if genderval is not null or undefined
            if (genderval) {
                // Unhide the section if gender value is available
                section.setVisible(true);
            } else {
                // Hide the section if gender value is not available
                section.setVisible(false);
            }
        } else {
            console.log("Section not found: General_section_3");
        }
    } else {
        console.log("Tab not found: General");
    }
}

function hideTab(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the tab
    var tab = formContext.ui.tabs.get("tab_2");

    if (tab) {
        // Hide the tab
        tab.setVisible(false);
    } else {
        console.log("Tab not found: tab_2");
    }
}


function toggleTabBasedOnName(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the value of the name field
    var name = formContext.getAttribute("nw_name").getValue();

    // Get the tab
    var tab = formContext.ui.tabs.get("tab_2");

    if (tab) {
        // Check if name is not null or undefined
        if (name.length <= 6) {
            // Show the tab if name value is available
            tab.setVisible(true);
        } else {
            // Hide the tab if name value is not available
            tab.setVisible(false);
        }
    } else {
        console.log("Tab not found: tab_2");
    }
}
function toggleWebResourceBasedOnTaxId(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the value of the tax ID field
    var taxid = formContext.getAttribute("nw_taxid").getValue();

    // Get the web resource control
    var webResourceControl = formContext.getControl("WebResource_CustomChart");

    if (webResourceControl) {
        // Check if tax ID is not null or undefined
        if (taxid) {
            // Show the web resource if tax ID has a value
            webResourceControl.setVisible(true);
        } else {
            // Hide the web resource if tax ID is empty or undefined
            webResourceControl.setVisible(false);
        }
    } else {
        console.log("Web Resource control not found: WebResource_CustomChart");
    }
}

function hideWebResourceOnLoad(executionContext) {
    // Get the form context
    var formContext = executionContext.getFormContext();

    // Get the web resource control
    var webResourceControl = formContext.getControl("WebResource_CustomChart");

    if (webResourceControl) {
        // Hide the web resource on form load
        webResourceControl.setVisible(false);
    } else {
        console.log("Web Resource control not found: WebResource_CustomChart");
    }
}


function addrecord() {
    var data =
    {
        "nw_name": "Sample Account",
    };
    alert("data");
    // create account record
    Xrm.WebApi.createRecord("nw_user", data).then(
        function success(result) {
            console.log("Account created with ID: " + result.id);
            // perform operations on record creation
        },
        function (error) {
            alert(error.message);
            // handle error conditions
        }
    );
}


function onNwStudentChange(executionContext) {
    var formContext = executionContext.getFormContext(); // Get the form context
    var nwStudentField = formContext.getAttribute("nw_student"); // Get the nwStudent field

    if (nwStudentField) {
        var nwStudentValue = nwStudentField.getValue(); // Get the value of the nwStudent field
       
        // Get the quick view control
        var quickViewControl = formContext.ui.quickForms.get("QuickviewControl1721822357272"); // Replace with your quick view control name
       
        if (quickViewControl) {
            // Use a setTimeout to repeatedly check if the quick view form is loaded
            var checkQuickViewLoaded = setInterval(function() {
                if (quickViewControl.isLoaded()) {
                    clearInterval(checkQuickViewLoaded); // Stop the interval once the quick view form is loaded
                    alert("nwStudentValue"+nwStudentValue);
                   // Get the quick view form context
                    var emailField = quickViewControl.getControl("nw_email"); // Get the nw_email field
                   var emailFieldValue=quickViewControl.getAttribute("nw_email").getValue();
                   alert("email value"+emailFieldValue);
                    if (emailField) {
                        if (emailFieldValue === null || emailFieldValue === undefined) {
                            // Hide the email field if nwStudent value is null or undefined
                            emailField.setVisible(false);
                        } else {
                            // Show the email field if nwStudent value is not null or undefined
                            emailField.setVisible(true);
                        }
                    }
                }
            }, 500); // Check every 500ms
        }
    }
}



