type IBaseData = IBaseDataObject[];

interface IBaseDataObject {
  itemName: string;
  itemId: string;
  itemList?: IBaseDataObject[];
  itemLink?: string;
  itemNew?: boolean;
}

const baseData: IBaseData = [
  {
    itemName: "Подготовительные работы",
    itemId: "jobs",
    itemList: [
      {
        itemName: "Подготовительные работы 1",
        itemId: "jobs-1",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 2",
        itemId: "jobs-2",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 3",
        itemId: "jobs-3",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 4",
        itemId: "jobs-4",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 5",
        itemId: "jobs-5",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 6",
        itemId: "jobs-6",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 7",
        itemId: "jobs-7",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 8",
        itemId: "jobs-8",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 9",
        itemId: "jobs-9",
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
      {
        itemName: "Подготовительные работы 10",
        itemId: "jobs-10",
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
    ],
  },

  {
    itemName: "SEO-аналитика",
    itemId: "seo",
    itemList: [
      {
        itemName: "SEO-аналитика 1",
        itemId: "seo-1",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "SEO-аналитика 2",
        itemId: "seo-2",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "SEO-аналитика 3",
        itemId: "seo-3",
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
      {
        itemName: "SEO-аналитика 4",
        itemId: "seo-4",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "SEO-аналитика 5",
        itemId: "seo-5",
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
    ],
  },
  {
    itemName: "Стратегия продвижения",
    itemId: "strategy",
    itemList: [
      {
        itemName: "Стратегия продвижения 1",
        itemId: "strategy-1",
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
      {
        itemName: "Стратегия продвижения 2",
        itemId: "strategy-2",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Стратегия продвижения 3",
        itemId: "strategy-3",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Стратегия продвижения 4",
        itemId: "strategy-4",
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Стратегия продвижения 5",
        itemId: "strategy-5",
        itemLink: "https://ru.wikipedia.org/",
      },
    ],
  },
];

window.addEventListener("DOMContentLoaded", () => {
  checkboxes();
});

const checkboxes = () => {
  const listEl = document.querySelector(".checkboxes__list");
  listEl.innerHTML = "";

  makeCheckboxList(baseData);
};

const makeCheckboxList = (dataArr: IBaseData) => {
  const sectionEl = document.querySelector(".checkboxes__list");
  dataArr.forEach((listItem) => {
    sectionEl.append(makeListItem(listItem));
  });
};

const makeListItem = (item: IBaseDataObject) => {
  const itemEl = document.createElement("li");
  const wrapperEl = document.createElement("div");
  const inputEl = document.createElement("input");
  inputEl.setAttribute("type", "checkbox");
  inputEl.setAttribute("id", item.itemId);
  inputEl.setAttribute("name", item.itemId);
  const labelEl = document.createElement("label");
  labelEl.setAttribute("for", item.itemId);
  labelEl.textContent = item.itemName;
  wrapperEl.append(inputEl, labelEl);
  itemEl.append(wrapperEl);

  if (item.itemList) {
    itemEl.classList.add("checkboxes__item", "item");
    const subListEl = document.createElement("ul");
    subListEl.classList.add("checkboxes__sublist", "checkboxes__sublist--hide");
    const btnEl = document.createElement("button");
    btnEl.textContent = "Раскрыть";
    btnEl.addEventListener("click", () => {
      btnEl.innerText = btnEl.innerText == "Раскрыть" ? "Скрыть" : "Раскрыть";
      subListEl.classList.toggle("checkboxes__sublist--hide");
    });
    wrapperEl.append(btnEl);

    item.itemList.forEach((subItem) => {
      subListEl.append(makeListItem(subItem));
    });

    const subListInputs: NodeListOf<HTMLInputElement> =
      subListEl.querySelectorAll('[type="checkbox"]');

    inputEl.addEventListener("change", () => {
      subListInputs.forEach(
        (subListInput) => (subListInput.checked = inputEl.checked)
      );
      progressBar();
    });

    subListInputs.forEach((subListInput) => {
      subListInput.addEventListener("change", () => {
        const subListCheckedInputs =
          subListEl.querySelectorAll("input:checked");

        if (subListInputs.length == subListCheckedInputs.length) {
          inputEl.checked = true;
        } else {
          inputEl.checked = false;
        }
        progressBar();
      });
    });

    itemEl.append(subListEl);
  }

  if (!item.itemList) {
    itemEl.classList.add("checkboxes__subitem");
    const linkEl = document.createElement("a");
    linkEl.textContent = "Прочитать инструкцию";
    linkEl.setAttribute("href", item.itemLink);
    linkEl.setAttribute("target", "_blank");
    wrapperEl.append(linkEl);
  }

  return itemEl;
};

const progressBar = () => {
  const fillEl: HTMLDivElement = document.querySelector(".progress__fill");
  const progressValueEl = document.querySelector(".progress__value");
  const allSubCheckboxes = document.querySelectorAll(
    '.checkboxes__sublist [type="checkbox"]'
  );
  const allSubCheckedCheckboxes = document.querySelectorAll(
    '.checkboxes__sublist [type="checkbox"]:checked'
  );
  const percent =
    (allSubCheckedCheckboxes.length / allSubCheckboxes.length) * 100;

  progressValueEl.textContent = percent.toString();
  fillEl.style.width = percent.toString() + "%";
};
