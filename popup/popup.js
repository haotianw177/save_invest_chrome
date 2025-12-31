import { costInHours } from "../core/time.js";
import { futureValue } from "../core/finance.js";
import { getUserData, setUserData } from "../core/storage.js";

const app = document.getElementById("app");

async function init() {
  const data = await getUserData();

  if (!data.salary || !data.hoursPerWeek || !data.saveInvestTimeline) {
    renderOnboarding();
  } else {
    renderCalculator(data);
  }
}

function renderOnboarding() {
  app.innerHTML = `
    <input id="salary" placeholder="Annual salary" />
    <input id="hours" placeholder="Hours per week" />
    <input id="saveInvestTimeline" placeholder="Save and invest timeline(in years)" />
    <button id="save">Save</button>
  `;

  document.getElementById("save").onclick = () => {
    setUserData({
      salary: +salary.value,
      hoursPerWeek: +hours.value,
      saveInvestTimeline: +saveInvestTimeline.value
    });
    init();
  };
}

function renderCalculator({ salary, hoursPerWeek, saveInvestTimeline }) {
    
  const hourly = salary / (hoursPerWeek * 52);
  saveInvestTimeline = Number(saveInvestTimeline);

  app.innerHTML = `
    <input id="price" placeholder="Item price" />
    <button id="calc">Calculate</button>
    <div id="result"></div>
  `;

    document.getElementById("calc").onclick = () => {
    const priceInput = document.getElementById("price");
    const resultDiv = document.getElementById("result");

    const priceValue = Number(priceInput.value);

    // ====== GUARDS START HERE ======
    if (!priceValue || priceValue <= 0) {
      resultDiv.textContent = "Please enter a valid item price.";
      return;
    }

    if (!saveInvestTimeline || saveInvestTimeline <= 0) {
      resultDiv.textContent = "Please enter a valid investment timeline.";
      return;
    }

    const hours = costInHours(priceValue, hourly);
    const future = futureValue(priceValue, saveInvestTimeline);

    resultDiv.innerHTML = `
        <p>🕒 ${hours.toFixed(1)} work hours</p>
        <p>📈 $${future.toFixed(2)} in ${saveInvestTimeline} years (VOO)</p>
    `;
    };
}

init();
