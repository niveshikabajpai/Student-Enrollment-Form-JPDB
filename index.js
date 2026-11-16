// ==========================================
// JPDB Configuration Constants
// ==========================================
const jpdbBaseURL = "https://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const dbName = "SCHOOL-DB";
const relName = "STUDENT-TABLE";
// REPLACE WITH YOUR OWN CONNECTION TOKEN
const connToken = "90934865|-31949263487312345|90955845";

// Initialize form on page load
$(document).ready(function () {
    resetForm();
});

// Helper: Convert Roll No into JSON format for JPDB GET_BY_KEY
function getRollNoAsJsonObj() {
    var rollNo = $("#rollNo").val().trim();
    var jsonStr = {
        "Roll-No": rollNo
    };
    return JSON.stringify(jsonStr);
}

// Helper: Save record number in localStorage for UPDATE operations
function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

// Populate form fields if Primary Key already exists in DB
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#fullName").val(record["Full-Name"]);
    $("#studentClass").val(record["Class"]);
    $("#birthDate").val(record["Birth-Date"]);
    $("#address").val(record["Address"]);
    $("#enrollmentDate").val(record["Enrollment-Date"]);
}

// Enable or disable all non-PK input fields
function setFieldsDisabled(status) {
    $("#fullName").prop("disabled", status);
    $("#studentClass").prop("disabled", status);
    $("#birthDate").prop("disabled", status);
    $("#address").prop("disabled", status);
    $("#enrollmentDate").prop("disabled", status);
}

// Check Primary Key in database when user enters Roll No
function getStudent() {
    var rollNoJsonObj = getRollNoAsJsonObj();
    if ($("#rollNo").val().trim() === "") {
        resetForm();
        return;
    }

    var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, rollNoJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {
        // Primary Key does NOT exist -> Enable Save & Reset
        setFieldsDisabled(false);
        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#fullName").focus();

    } else if (resJsonObj.status === 200) {
        // Primary Key EXISTS -> Populate data, disable PK, enable Update & Reset
        $("#rollNo").prop("disabled", true);
        fillData(resJsonObj);
        setFieldsDisabled(false);

        $("#saveBtn").prop("disabled", true);
        $("#updateBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#fullName").focus();
    }
}

// Validate all fields are non-empty and return JSON string
function validateData() {
    var rollNo = $("#rollNo").val().trim();
    var fullName = $("#fullName").val().trim();
    var studentClass = $("#studentClass").val().trim();
    var birthDate = $("#birthDate").val().trim();
    var address = $("#address").val().trim();
    var enrollmentDate = $("#enrollmentDate").val().trim();

    if (rollNo === "") {
        alert("Roll No is missing!");
        $("#rollNo").focus();
        return "";
    }
    if (fullName === "") {
        alert("Full Name is missing!");
        $("#fullName").focus();
        return "";
    }
    if (studentClass === "") {
        alert("Class is missing!");
        $("#studentClass").focus();
        return "";
    }
    if (birthDate === "") {
        alert("Birth Date is missing!");
        $("#birthDate").focus();
        return "";
    }
    if (address === "") {
        alert("Address is missing!");
        $("#address").focus();
        return "";
    }
    if (enrollmentDate === "") {
        alert("Enrollment Date is missing!");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        "Roll-No": rollNo,
        "Full-Name": fullName,
        "Class": studentClass,
        "Birth-Date": birthDate,
        "Address": address,
        "Enrollment-Date": enrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}

// ==========================================
// 1. RESET FUNCTION
// ==========================================
function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#studentClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");

    $("#rollNo").prop("disabled", false);
    setFieldsDisabled(true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);

    $("#rollNo").focus();
}

// ==========================================
// 2. SAVE FUNCTION
// ==========================================
function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }

    var putRequest = createPUTRequest(connToken, jsonStrObj, dbName, relName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 200) {
        alert("Student record saved successfully!\n\nSaved Data:\n" + jsonStrObj);
    } else {
        alert("Error saving record: " + resJsonObj.message);
    }
    resetForm();
}

// ==========================================
// 3. UPDATE FUNCTION
// ==========================================
function updateData() {
    $("#updateBtn").prop("disabled", true);
    var jsonChg = validateData();
    if (jsonChg === "") {
        $("#updateBtn").prop("disabled", false);
        return;
    }

    var recNo = localStorage.getItem("recno");
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, dbName, relName, recNo);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 200) {
        alert("Student record updated successfully!\n\nUpdated Data:\n" + jsonChg);
    } else {
        alert("Error updating record: " + resJsonObj.message);
    }
    resetForm();
}