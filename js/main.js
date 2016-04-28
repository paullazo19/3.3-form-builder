(function() {
  // All code NOT referencing DOM elements can go here
  var formDataXHR = new XMLHttpRequest();

  document.addEventListener("DOMContentLoaded", function(e){
    // ALL DOM RELATED QUERYING GOES HERE

    formDataXHR.addEventListener("load", function(e){
      var formDataArray = JSON.parse(e.target.responseText);
      var formElement = document.querySelector("[data-js='form--data']");

      formDataArray.forEach(function(formField){
        console.log(formDataArray);
        if(formField.type === "select"){
          var selectHTML = "";
          selectHTML += "<select class= 'input__select' >";
          selectHTML += "<option value = ''>Select language...</option>"
          formField.options.forEach(function(option){
            selectHTML += `
              <option value="${option.value}">${option.label}</option>
            `;
          }) //for each loop
          selectHTML += "</select>"
          formElement.innerHTML += selectHTML;

        }else{
            formElement.innerHTML += `
              <span class= "input__field">
                <i class= "fa ${formField.icon}"></i>
                <label class= "input__label">${formField.label}
                  <input type="${formField.type}" value="" id="${formField.id}">
                </label>
              </span>
            `;

        }
      })

    }); //inputData event listener

  }); // DOMContentLoaded

  formDataXHR.open("GET", "http://json-data.herokuapp.com/forms");
  formDataXHR.send();

}()); // IIFE
