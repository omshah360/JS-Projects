const display = document.querySelector("#display");

function clearDisplay() {
    display.value = '';
}

function appendToDisplay(input) {
    display.value += input;
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}