function validatePhoneNumber(executionContext) {
    var formContext = executionContext.getFormContext();
    var phoneNumberField = formContext.getAttribute("sh_phone");
    var phoneNumber = phoneNumberField.getValue();

    if (phoneNumber) {
        var phoneNumberPattern = /^\d{10}$/;
        var invalidPrefixes = ["12", "45", "56"];
        var validPrefixes = ["91", "98", "63"];
        
        if (!phoneNumberPattern.test(phoneNumber)) {
            formContext.getControl("sh_phone").setNotification("Phone number must be exactly 10 digits.");
            return;
        }

        for (var i = 0; i < invalidPrefixes.length; i++) {
            if (phoneNumber.startsWith(invalidPrefixes[i])) {
                formContext.getControl("sh_phone").setNotification("Phone number must not start with 12, 45, or 56.");
                return;
            }
        }

        var startsWithValidPrefix = validPrefixes.some(function(prefix) {
            return phoneNumber.startsWith(prefix);
        });

        if (!startsWithValidPrefix) {
            formContext.getControl("sh_phone").setNotification("Phone number must start with 91, 98, or 63.");
            return;
        }

        formContext.getControl("sh_phone").clearNotification();
    }
}
