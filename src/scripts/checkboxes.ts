type IBaseData = IBaseDataObject[];

interface IBaseDataObject {
  itemName: string;
  itemId: string;
  status: boolean;
  itemList?: IBaseDataObject[];
  itemLink?: string;
  itemNew?: boolean;
}

let baseData: IBaseData = JSON.parse(localStorage.getItem("checkboxes")) ?? [
  {
    itemName: "Подготовительные работы",
    itemId: "jobs",
    status: false,
    itemList: [
      {
        itemName: "Подготовительные работы 1",
        itemId: "jobs-1",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 2",
        itemId: "jobs-2",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 3",
        itemId: "jobs-3",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 4",
        itemId: "jobs-4",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 5",
        itemId: "jobs-5",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 6",
        itemId: "jobs-6",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 7",
        itemId: "jobs-7",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 8",
        itemId: "jobs-8",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Подготовительные работы 9",
        itemId: "jobs-9",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
      {
        itemName: "Подготовительные работы 10",
        itemId: "jobs-10",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
    ],
  },

  {
    itemName: "SEO-аналитика",
    itemId: "seo",
    status: false,
    itemList: [
      {
        itemName: "SEO-аналитика 1",
        itemId: "seo-1",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "SEO-аналитика 2",
        itemId: "seo-2",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "SEO-аналитика 3",
        itemId: "seo-3",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
      {
        itemName: "SEO-аналитика 4",
        itemId: "seo-4",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "SEO-аналитика 5",
        itemId: "seo-5",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
    ],
  },
  {
    itemName: "Стратегия продвижения",
    itemId: "strategy",
    status: false,
    itemList: [
      {
        itemName: "Стратегия продвижения 1",
        itemId: "strategy-1",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
        itemNew: true,
      },
      {
        itemName: "Стратегия продвижения 2",
        itemId: "strategy-2",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Стратегия продвижения 3",
        itemId: "strategy-3",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Стратегия продвижения 4",
        itemId: "strategy-4",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
      {
        itemName: "Стратегия продвижения 5",
        itemId: "strategy-5",
        status: false,
        itemLink: "https://ru.wikipedia.org/",
      },
    ],
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const switchEl: HTMLInputElement = document.querySelector(".switch input");
  checkboxes();

  switchEl.addEventListener("change", () => {
    if (switchEl.checked) {
      editor();
    } else {
      checkboxes();
    }
  });
});

const checkboxes = () => {
  makeCheckboxList(baseData);
  progressBar();
};

const makeCheckboxList = (dataArr: IBaseData) => {
  const sectionEl = document.querySelector(".checkboxes__list");
  sectionEl.innerHTML = "";
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
  inputEl.checked = item.status;
  const labelEl = document.createElement("label");
  labelEl.setAttribute("for", item.itemId);
  labelEl.textContent = item.itemName;
  wrapperEl.append(inputEl, labelEl);
  itemEl.append(wrapperEl);

  if (item.itemNew) {
    const newEl = document.createElement("span");
    newEl.classList.add("new");
    newEl.textContent = "new";
    itemEl.append(newEl);
  }

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
      item.status = inputEl.checked;

      subListInputs.forEach((subListInput, idx) => {
        item.itemList[idx].status = inputEl.checked;
        subListInput.checked = inputEl.checked;
      });

      progressBar();
    });

    subListInputs.forEach((subListInput, idx) => {
      subListInput.addEventListener("change", () => {
        const subListCheckedInputs =
          subListEl.querySelectorAll("input:checked");

        item.itemList[idx].status = subListInput.checked;

        if (subListInputs.length == subListCheckedInputs.length) {
          inputEl.checked = true;
          item.status = inputEl.checked;
        } else {
          inputEl.checked = false;
          item.status = inputEl.checked;
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

  progressValueEl.textContent = Math.round(percent).toString();
  fillEl.style.width = percent.toString() + "%";
};

const editor = () => {
  makeEditorItems(baseData);
};

const makeEditorItems = (dataArr: IBaseData) => {
  const sectionEl = document.querySelector(".checkboxes__list");
  sectionEl.innerHTML = "";
  dataArr.forEach((listItem) => {
    sectionEl.append(makeEditorForm(listItem));
  });
};

const makeEditorForm = (item: IBaseDataObject) => {
  const itemEl = document.createElement("li");
  const wrapperEl = document.createElement("div");
  const inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("id", item.itemId);
  inputEl.setAttribute("name", item.itemId);
  inputEl.value = item.itemName;
  const labelEl = document.createElement("label");
  labelEl.setAttribute("for", item.itemId);
  labelEl.textContent = "Название:";
  const saveBtnEl = document.createElement("button");
  saveBtnEl.textContent = "Сохранить";
  const delBtnEl = document.createElement("button");
  delBtnEl.setAttribute("data-id", "remove");
  delBtnEl.textContent = "Удалить";
  wrapperEl.append(labelEl, inputEl);
  itemEl.append(wrapperEl);

  if (item.itemList) {
    itemEl.classList.add("checkboxes__item", "item");
    const subListEl = document.createElement("ul");
    subListEl.classList.add("checkboxes__sublist");

    item.itemList.forEach((subItem) => {
      subListEl.append(makeEditorForm(subItem));
    });
    saveBtnEl.addEventListener("click", () => {
      item.itemName = inputEl.value;
    });
    delBtnEl.addEventListener("click", () => {
      const answ = confirm("Вы уверены?");
      if (answ) {
        itemEl.remove();
        baseData = baseData.filter(
          (dataItem) => dataItem.itemId !== item.itemId
        );
        return;
      }
    });
    itemEl.append(subListEl);
  }

  if (!item.itemList) {
    itemEl.classList.add("checkboxes__subitem");
    const inputLinkEl = document.createElement("input");
    inputLinkEl.setAttribute("type", "text");
    inputLinkEl.setAttribute("id", "link-" + item.itemId);
    inputLinkEl.setAttribute("name", "link-" + item.itemId);
    inputLinkEl.value = item.itemLink;
    const labelLinkEl = document.createElement("label");
    labelLinkEl.setAttribute("for", "link-" + item.itemId);
    labelLinkEl.textContent = "Ссылка:";
    wrapperEl.append(labelLinkEl, inputLinkEl);
    saveBtnEl.addEventListener("click", () => {
      item.itemName = inputEl.value;
      item.itemLink = inputLinkEl.value;
    });

    delBtnEl.addEventListener("click", () => {
      const answ = confirm("Вы уверены?");

      if (answ) {
        itemEl.remove();
        for (const dataItem of baseData) {
          dataItem.itemList = dataItem.itemList.filter(
            (dataSubItem) => dataSubItem.itemId !== item.itemId
          );
        }
        return;
      }
    });
  }

  wrapperEl.append(saveBtnEl, delBtnEl);

  return itemEl;
};
