let inputCount = 1;

function addInputField() {
  inputCount++;
  const inputFields = document.getElementById("inputFields");

  const inputRow = document.createElement("div");
  inputRow.classList.add("input-row");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.classList.add("input-text");
  nameInput.placeholder = "Enter a name";

  const label = document.createElement("label");
  label.textContent = "Damage:";
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("input-number");
  input.placeholder = "Enter the damage";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    removeInputField(this);
  });

  inputRow.appendChild(nameLabel);
  inputRow.appendChild(nameInput);
  inputRow.appendChild(label);
  inputRow.appendChild(input);
  inputRow.appendChild(removeBtn);

  inputFields.appendChild(inputRow);
}

function removeInputField(button) {
  const inputFields = document.getElementById("inputFields");
  inputFields.removeChild(button.parentNode);
}

function getInputs() {
  const inputRows = document.querySelectorAll(".input-row");
  const inputs = [];
  inputRows.forEach(row => {
    const nameInput = row.querySelector(".input-text");
    const damageInput = row.querySelector(".input-number");
    const name = nameInput.value.trim();
    const damage = parseInt(damageInput.value);
    if (name !== '' && !isNaN(damage)) {
      inputs.push({ name, damage });
    }
  });
  return inputs;
}

function calculate() {
  const targetNumber = parseInt(document.getElementById("targetNumber").value);
  const data = getInputs();

  if (data.length === 0 || !data.every(item => Number.isInteger(item.damage))) {
    alert("Please enter valid data in all input fields.");
    return;
  }

  const result = findCombination(targetNumber, data);

  document.getElementById("result").innerText = `The most efficient combination to reach ${targetNumber} with the least amount of overage is:\n${result}`;
}

function findCombination(target, data) {
  data.sort((a, b) => b.damage - a.damage);
  const combination = [];
  let currentSum = 0;
  let totalOverage = 0;
  for (const item of data) {
    if (currentSum + item.damage <= target) {
      combination.push(`${item.name} (${item.damage})`);
      currentSum += item.damage;
    } else {
      totalOverage += currentSum + item.damage - target;
    }
  }
  const result = combination.join(", ");
  return `${result}\nTotal Damage Overage: ${totalOverage}`;
}

function switchTab(event, tabId) {
  const tabs = document.getElementsByClassName("tab");
  const tabContents = document.getElementsByClassName("tab-content");

  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].id === tabId) {
      tabs[i].classList.add("active");
      tabContents[i].classList.add("active");
    } else {
      tabs[i].classList.remove("active");
      tabContents[i].classList.remove("active");
    }
  }
}

document.getElementById("addBtn").addEventListener("mousedown", function(event) {
  event.preventDefault();
  addInputField();
});

document.getElementById("inputFields").addEventListener("click", function(event) {
  const target = event.target;
  if (target.classList.contains("remove-btn")) {
    event.stopPropagation();
    removeInputField(target);
  }
});

document.getElementById("calculateBtn").addEventListener("click", function() {
  calculate();
});

// Set the default active tab
switchTab(null, "tab1");
