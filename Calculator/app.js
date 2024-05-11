const display = document.querySelector("#display");
const OperatorBtn = document.querySelector(".operator-btn");

function clearDisplay() {
    display.value = '';
}

function appendToDisplay(input) {
    display.value += input;
}

function calculate(){
    if(display.value == ""){
        alert("Please Enter Something to Calculate!");
    }
    else{
        try{
            display.value = eval(display.value);
        }
        catch(error){
            display.value = "Error";
        }
    }
};