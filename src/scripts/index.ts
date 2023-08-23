interface IBaseValues {
  [key: string]: IAge;
}

interface IAge {
  [key: string]: number;
}

const baseValues: IBaseValues = {
  shepherdDog: {
    lessOne: 600,
    oneToFive: 800,
    moreFive: 700,
  },
  labrador: {
    lessOne: 500,
    oneToFive: 700,
    moreFive: 400,
  },
};

window.addEventListener("DOMContentLoaded", () => {
  calculator();
});

const calculator = () => {
  const formEl: HTMLFormElement = document.querySelector(".calculator__form"),
    breedSelect: HTMLSelectElement = formEl.querySelector('[name="breed"]'),
    ageSelect: HTMLSelectElement = formEl.querySelector('[name="age"]'),
    activityRadioBtns: NodeListOf<HTMLInputElement> =
      formEl.querySelectorAll('[name="activity"]'),
    weightInp: HTMLInputElement = formEl.querySelector('[name="weight"]'),
    resultText = document.querySelector(".calculator__result span");

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const breed = breedSelect.value,
      age = ageSelect.value,
      weight = weightInp.value;
    let activity = "";

    activityRadioBtns.forEach((radioBtn) => {
      if (radioBtn.checked) {
        activity = radioBtn.value;
      }
    });

    resultText.textContent = getResult(breed, age, activity, +weight);
    createResetBtn();
  });

  const resetForm = () => {
    breedSelect.value = "";
    ageSelect.value = "";
    weightInp.value = "";
    activityRadioBtns.forEach((radioBtn) => {
      radioBtn.checked = false;
    });
    resultText.textContent = "0";
  };

  const createResetBtn = () => {
    if (formEl.parentElement.querySelector(".calculator__button--reset")) {
      return;
    }
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("calculator__button", "calculator__button--reset");
    resetBtn.textContent = "Сбросить";
    resetBtn.addEventListener("click", () => {
      resetForm();
      resetBtn.remove();
    });
    formEl.parentElement.insertAdjacentElement("beforeend", resetBtn);
  };
};

const getResult = (
  breed: string,
  age: string,
  activity: string,
  weight: number
) => {
  let result: number = baseValues[breed][age];

  if (weight > 5 && weight <= 10) {
    result *= 1.2;
  } else if (weight > 10 && weight <= 20) {
    result *= 1.3;
  } else if (weight > 20 && weight <= 30) {
    result *= 1.4;
  }

  if (activity == "active") {
    result *= 1.3;
  }

  return Math.round(result).toString();
};
