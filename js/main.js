(function() {
  // All code NOT referencing DOM elements can go here
  var formDataXHR = new XMLHttpRequest();

  document.addEventListener("DOMContentLoaded", function(e){
    // ALL DOM RELATED QUERYING GOES HERE

    formDataXHR.addEventListener("load", function(e){
      console.log(e.target);
      var formDataArray = JSON.parse(e.target.responseText);
      var formElement = document.querySelector("[data-js='form--data']");

      formDataArray.forEach(function(formField){

        if(formField.type === "select"){
          var selectHTML = "<select>";
          formField.options.forEach(function(option){
            selectHTML += `
              <option value="${option.value}">${option.label}</option>
            `;
          }) //for each loop
          selectHTML += "</select>"
          formElement.innerHTML += selectHTML;

        }else{
            formElement.innerHTML += `
              <input type="${formField.type}" placeholder="${formField.label}" value="" id="${formField.id}" class="${formField.icon}">
            `;

        }
      })

    }); //inputData event listener

  }); // DOMContentLoaded

  formDataXHR.open("GET", "http://json-data.herokuapp.com/forms");
  formDataXHR.send();

}()); // IIFE
