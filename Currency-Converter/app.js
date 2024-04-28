const Base_URL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const selects = document.querySelectorAll(".select-container select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapImg = document.querySelector("#swap-img");

for(let select of selects){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    };
    select.addEventListener("input", (evt) => {
        updateFlag(evt.target);
    })
};

const swapCurrenciesAndFlags = () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlagOnSwap(countryList[fromCurr.value], "from-img");
    updateFlagOnSwap(countryList[toCurr.value], "to-img");
};

const updateFlag = (ele) =>{
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let img = ele.parentElement.querySelector("img");
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.src = newSrc;
};

const updateFlagOnSwap = (countryCode, imgId) => {
    let img = document.querySelector(`#${imgId}`);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.src = newSrc;
};

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    const finalVal = amtVal * exchangeRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

swapImg.addEventListener("click", () => {
    swapCurrenciesAndFlags();
});

