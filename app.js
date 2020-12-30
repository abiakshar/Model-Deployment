function getGenderValue() {
  var uiGender = document.getElementsByName("uiGender");
  for (var i in uiGender) {
    if (uiGender[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getMarriedValue() {
  var uiMarried = document.getElementsByName("uiMarried");
  for (var i in uiMarried) {
    if (uiMarried[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getDependentsValue() {
  var uiDependents = document.getElementsByName("uiDependents");
  for (var i in uiDependents) {
    if (uiDependents[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getEducationValue() {
  var uiEducation = document.getElementsByName("uiEducation");
  for (var i in uiEducation) {
    if (uiEducation[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getSelf_EmployedValue() {
  var uiSelf_Employed = document.getElementsByName("uiSelf_Employed");
  for (var i in uiSelf_Employed) {
    if (uiSelf_Employed[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getCredit_HistoryValue() {
  var uiCredit_History = document.getElementsByName("uiCredit_History");
  for (var i in uiCredit_History) {
    if (uiCredit_History[i].checked) {
      return parseFloat(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function onClickedLoanApproval() {
  console.log("Loan Approval Status button clicked");
  var gender = getGenderValue();
  var married = getMarriedValue();
  var dependents = getDependentsValue();
  var education = getEducationValue();
  var self_employed = getSelf_EmployedValue();
  var applicantincome = document.getElementById("uiApplicant_Income");
  var coapplicantincome = document.getElementById("uiCoapplicant_Income");
  var loanamount = document.getElementById("uiLoan_Amount");
  var loan_amount_term = document.getElementById("uiLoan_Amount_Term");
  var credit_history = getCredit_HistoryValue();
  var property_area = document.getElementById("uiProperty_Area");
  var loan_approval_status = document.getElementById("uiLoanApprovalStatus");

  var url = "http://127.0.0.1:5000/predict_loan_approval";

  $.post(
    url,
    {
      gender: gender,
      married: married.value,
      dependents: dependents,
      education: education,
      self_employed: self_employed,
      applicantincome: applicantincome,
      coapplicantincome: parseFloat(coapplicantincome.value),
      loanamount: parseFloat(loanamount.value)
      loan_amount_term: parseFloat(loan_amount_term.value),
      credit_history: parseFloat(credit_history.value)
      property_area: property_area.value
    },

    function (data, status) {
      console.log(data.loan_approval);
      loan_approval_status.innerHTML = "<h2>" + data.loan_approval</h2>";
      console.log(status);
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  var url = "/get_property_area";
  $.get(url, function (data, status) {
    console.log("got response for get_property_area request");
    if (data) {
      var property_area = data.property_area;
      var uiProperty_Area = document.getElementById("uiProperty_Area");
      $("#uiProperty_Area").empty();
      for (var i in property_area) {
        var opt = new Option(property_area[i]);
        $("#uiProperty_Area").append(opt);
      }
    }
  });
}

window.onload = onPageLoad;