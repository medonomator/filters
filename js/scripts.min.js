// Выбор городов
const city_chooser = document.querySelector(".js-city");
const city_name = city_chooser.querySelector(".header-city_name");
const city__list = city_chooser.querySelector(".header-city__list");

city_chooser?.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("header-city_name") ||
    e.target.classList.contains("header-city_arrow")
  ) {
    city__list.classList.toggle("active");
  }
  if (e.target.dataset.city) {
    city_name.textContent = e.target.dataset.city;
    city__list.classList.toggle("active");
  }
});

// Аккордеоны

let accordeons = document.querySelectorAll(".js-accordeon");

for (let i = 0; i < accordeons.length; i++) {
  accordeons[i].addEventListener("click", (e) => {
    if (e.target.classList.contains("js-accordeon-btn")) {
      const content = accordeons[i].querySelector(".aside-item__content");
      content.classList.toggle("active-content");
      accordeons[i]
        .querySelector(".aside-item_arrow")
        .classList.toggle("active");
      if (content.classList.contains("active-content")) {
        content.style.overflow = "visible";
      } else {
        content.style.overflow = "hidden";
      }
    }
  });
}

// Показать еще

let showMore = document.querySelectorAll(".js-show_more");
showMore?.forEach((x) => {
  x?.addEventListener("click", (e) => {
    if (e.target.classList.contains("aside-item_show_more_btn")) {
      x.classList.add("active");
    }
  });
});

// Показать больше карточек

const card_list = document.querySelector(".js-cards");
const card_btn = document.querySelector(".show__more-cards");

card_btn?.addEventListener("click", () => {
  card_list?.classList.toggle("active");
});

// Слайдеры
const sliderJS = (
  containerClass,
  trackClass,
  itemClass,
  prevClass,
  nextClass
) => {
  let position = 0;
  let slidesToShow = 0;
  const slidesToScroll = 1;
  const container = document.querySelector(containerClass);
  if (!container) {
    return;
  }
  const track = document.querySelector(trackClass);
  const item = document.querySelector(itemClass);
  slidesToShow = Math.floor(container.clientWidth / (item.clientWidth + 20))
    ? Math.floor(container.clientWidth / (item.clientWidth + 20))
    : 1;
  const items = document.querySelectorAll(itemClass);
  const btnPrev = document.querySelector(prevClass);
  const btnNext = document.querySelector(nextClass);
  const itemsCount = items.length;
  const itemWidth = Math.ceil(container.clientWidth / slidesToShow);
  const movePosition = slidesToScroll * itemWidth;

  items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
  });

  btnNext.addEventListener("click", () => {
    const itemsLeft =
      itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
  });

  btnPrev.addEventListener("click", () => {
    if (position === 0) {
      position = -(itemsCount - slidesToShow) * itemWidth;
    }
    const itemsLeft = itemsCount - Math.abs(position) / itemWidth;

    position +=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
  });

  const setPosition = () => {
    if (position <= -(itemsCount - slidesToShow) * itemWidth) {
      position = 0;
      track.style.transform = `translateX(0px)`;
    } else {
      track.style.transform = `translateX(${position}px)`;
    }
  };
};

sliderJS(
  ".slider__popular-container",
  ".slider__popular-track",
  ".slider__popular-item",
  ".btn__popular-prev",
  ".btn__popular-next"
);
sliderJS(
  ".slider__similar-container",
  ".slider__similar-track",
  ".slider__similar-item",
  ".btn__similar-prev",
  ".btn__similar-next"
);
sliderJS(
  ".slider__viewed-container",
  ".slider__viewed-track",
  ".slider__viewed-item",
  ".btn__viewed-prev",
  ".btn__viewed-next"
);
sliderJS(
  ".filter-btns__container",
  ".filter-btns__track",
  ".btn__filter-item ",
  ".btn__filter-prev",
  ".btn__filter-next"
);

// Смена отображения

const filter_list = document.querySelector(".product-filter__list");
const filter_table = document.querySelector(".buy-section");
const btn_list = document.querySelector(".btn__list");
const btn_table = document.querySelector(".btn__table");

btn_list?.addEventListener("click", () => {
  btn_table.classList.remove("active");
  filter_list.classList.remove("active");
  filter_table.classList.add("active");
  btn_list.classList.add("active");
});

btn_table?.addEventListener("click", () => {
  btn_table.classList.add("active");
  filter_list.classList.add("active");
  btn_list.classList.remove("active");
  filter_table.classList.remove("active");
});

// Табы
const tabsJS = (itemClass, contentClass, activeTab = null) => {
  document.querySelectorAll(itemClass)?.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const currentId = e.target.getAttribute("href").replace("#", "");

      document.querySelectorAll(itemClass).forEach((trigger) => {
        trigger.classList.remove("--active");
      });
      document.querySelectorAll(contentClass).forEach((content) => {
        content.classList.remove("--active");
      });

      item.classList.add("--active");
      document.getElementById(currentId).classList.add("--active");
    });
  });
  if (activeTab) {
    const items = document.querySelectorAll(itemClass);
    items.forEach((item) => {
      const id = item.getAttribute("href").replace("#", "");
      if (id === activeTab) {
        item.click();
      }
    });
  } else {
    document.querySelector(itemClass)?.click();
  }
};

tabsJS(".tabs-brands__trigger-item", ".tabs-brands__content-item");
tabsJS(".tabs-product__trigger-item", ".tabs-product__content-item");

// Показать фильтр

const btnShowFilter = document.querySelector(".show__filter");
const btnShowMenu = document.querySelector(".show__menu");
const btnCloseAside = document.querySelectorAll(".close__aside-mobile");
const overlay = document.querySelector(".overlay");

const openAside = (asideClass, btnClass) => {
  document.querySelector(btnClass).classList.add("--active");
  document.querySelector(asideClass).classList.add("--active");
  overlay.classList.add("--active");
};

const closeAside = () => {
  btnShowFilter.classList.remove("--active");
  document.querySelectorAll(".aside-panel").forEach((panel) => {
    panel.classList.remove("--active");
  });
  overlay.classList.remove("--active");
};

btnShowFilter?.addEventListener("click", () => {
  openAside(".aside-filter", ".show__filter");
});

btnShowMenu?.addEventListener("click", () => {
  openAside(".aside-menu", ".show__menu");
});

btnCloseAside?.forEach((item) => {
  item.addEventListener("click", () => {
    closeAside();
  });
});

overlay?.addEventListener("click", () => {
  closeAside();
  closeModal();
});

// Открытие диалоговых окон

const btnFeedback = document.querySelectorAll(".btn__feedback");
const btnAddProduct = document.querySelectorAll(".btn__add-cart");
const btnGetPrice = document.querySelectorAll(".product-card_get_price");
const btnQuickPurchase = document.querySelectorAll(".btn__quick-purchase");
const modalFeedback = document.querySelector(".modal-panel.feedback");
const modalAddProduct = document.querySelector(".modal-panel.add-product");
const modalCheckPrice = document.querySelector(".modal-panel.check-price");
const modalQuickOrder = document.querySelector(".modal-panel.quick-order");
const btnCloseModal = document.querySelectorAll(".btn__close-modal");

btnFeedback.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalFeedback.classList.add("--active");
    overlay.classList.add("--active");
  });
});

btnAddProduct.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalAddProduct.classList.add("--active");
    overlay.classList.add("--active");
  });
});

btnQuickPurchase.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalQuickOrder.classList.add("--active");
    overlay.classList.add("--active");
  });
});

btnGetPrice.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalCheckPrice.classList.add("--active");
    overlay.classList.add("--active");
  });
});

btnCloseModal?.forEach((item) => {
  item.addEventListener("click", () => {
    closeModal();
  });
});

const closeModal = () => {
  const modals = document.querySelectorAll(".modal-panel");
  modals.forEach((modal) => {
    modal.classList.remove("--active");
  });
  overlay.classList.remove("--active");
};

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Escape") {
    closeAside();
    closeModal();
  }
});

// Открытие таба Другие характеристики

const btnOtherFeatures = document.querySelector(".btn__other-features");
const tabsProduct = document.querySelector(".tabs-product");

btnOtherFeatures?.addEventListener("click", () => {
  const positionY =
    tabsProduct.getBoundingClientRect().top + window.pageYOffset;
  const headerHeight = 154;
  const scrollY = positionY - headerHeight - 20;
  window.scrollTo(0, scrollY);
  tabsJS(
    ".tabs-product__trigger-item",
    ".tabs-product__content-item",
    "tab-specifications"
  );
});

// Изменение значения в input указания Количества метров
function changeMeters(dir, id) {
  const input = document.getElementById(id);
  let value = parseInt(input.value, 10);
  if (isNaN(value)) {
    value = 0;
  }

  if (dir == "dec") {
    value--;
  } else if (dir == "inc") {
    value++;
  }

  if (value > 0) {
    input.value = value;
  }
}

// Панель чекбоксов
const overlayPanel = (btnClass, listClass) => {
  const btn = document.querySelector(`.${btnClass}`);
  const list = document.querySelector(`.${listClass}`);

  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      list.classList.add(".aside-item_list");
      list.classList.remove("overlay-panel");
      return;
    }
    btn.classList.add("active");
    list.classList.remove(".aside-item_list");
    list.classList.add("overlay-panel");
  });

  document.addEventListener("click", (e) => {
    if (e.target.parentElement) {
      const isBtn = e.target.parentElement.classList.contains(btnClass);
      const isList = e.path.find((x) => x.classList?.contains(listClass));

      if (!isBtn && !isList) {
        btn.classList.remove("active");
        list.classList.add(".aside-item_list");
        list.classList.remove("overlay-panel");
      }
    }
  });
};

overlayPanel("trademark__btn", "trademark__list");
