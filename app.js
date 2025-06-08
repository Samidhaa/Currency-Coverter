const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

// to check the if the countryList is being accessible in this file
// for(code in countryList){
// console.log(countryList[code]);
// }
for (select of dropdowns) {
    for (let country in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if (select.name === "from" && country === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && country === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    });
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    // console.log(amtValue);
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";

    }
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(data);
    console.log(rate);
    console.log(amount);
    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
}
const updateFlag = (element) => {
    let country = element.value;
    let countryCode = countryList[country];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();

});

window.addEventListener("load", () => {
    updateExchangeRate();
});