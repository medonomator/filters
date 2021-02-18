let filters = {};
let productItems = [];
let stash = [];

$(".aside-item_count").click(() => {
  if (Object.keys(filters).length) {
    fetch("http://localhost:5000/test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        productItems = data.data;
        renderProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

$(".aside-reset_btn").click((item) => {
  filters = {};
});

$(document.body).on("input", function (event) {
  const targetName = event.target.name;
  const targetId = event.target.id;

  if (
    targetName === "mark" ||
    targetName === "vein" ||
    targetName === "power-vein" ||
    targetName === "termo-vein" ||
    targetName === "spec-vein" ||
    targetName === "montaj-vein" ||
    targetName === "volt-vein"
  ) {
    if (event.target.checked) {
      if (!filters[targetName]) filters[targetName] = [];

      if (!filters[targetName].find((item) => item === targetId)) {
        filters[targetName].push(targetId);
      }
    } else {
      filters[targetName] = filters[targetName].filter(
        (item) => item === targetId
      );
    }
  }

  if (targetId === "filter-stock") {
    
    if (event.target.checked) {
      stash = productItems.filter((item) => !item.isStock);
      productItems = productItems.filter((item) => item.isStock);
    } else {
      productItems = productItems.concat(stash);
    }
  }

  if (targetName === "enter-mark") {
    const targetValue = event.target.value;
    if (!filters["mark"]) filters["mark"] = [];

    filters["mark"] = filters["mark"].filter((item) => item === targetValue);
    filters["mark"].push(targetValue);
  }

  if (targetName === "available") {
    filters[targetName] = [targetId];
  }
});

let count = 0;
let invertCount = 0;
let classNumber = 1;
function renderProduct(pageNumber) {
  const ONE_PAGE = 10;
  const allPage = Math.ceil(productItems.length / ONE_PAGE);
  let allPageArr = [];
  let products = "";
  let productsSecond = "";
  let paginate = "";
  let indent = 0;

  for (let i = count; i < allPage; i++) {
    allPageArr.push(i + 1);
  }

  if (allPageArr.length < 2) {
    allPageArr = [];
  }

  if (pageNumber) {
    indent = pageNumber * 10;
  }

  const takedItem = productItems.slice(indent, indent + 10);

  takedItem.forEach((item) => {
    products =
      products +
      `<div class="filter-list__item">
        <div class="product-card">
          <div class="product-card_img"></div>
          <div class="product-card_title">
            ${item.name}
          </div>
          <div class="product-card_stock">
            <div class="card-stock_img"></div>
            <span>${item.isStock ? "В наличии" : "Отсутствует"}</span>
          </div>
          <a href="javascript:void(0)" class="product-card_get_price">Запросить цену</a>
          <div class="product-buy__wrapper">
            <a href="javascript:void(0);" class="btn__base btn__add-cart">В корзину</a>
            <a href="javascript:void(0);" class="add-favorite">
              <i class="icons icon__grey-favorite"></i>
            </a>
          </div>
        </div>
      </div>`;
  });

  $(".filter-list__item").remove();
  $(".product-filter__list-main").prepend(products);

  const takedItemSecond = productItems.slice(indent, indent + 10);

  takedItemSecond.forEach((item) => {
    productsSecond =
      productsSecond +
      `<div class="menu-other-products__block">
              <div class="menu-other-products__container">
                <div class="menu-other-products__product">
                  <div class="menu-other-products__row">
                    <div class="menu-other-products__row-main">
                      <div class="menu-other-products__img"></div>
                      <div class="menu-other-products__name">
                      ${item.name}
                      </div>
                    </div>
                    <div class="menu-other-products__row-second">
                      <div class="menu-other-products__availability">
                        ${item.isStock ? "В наличии" : "Отсутствует"}
                      </div>
                      <div class="menu-other-products__price">
                        <a
                          href="javascript:void(0)"
                          class="product-card_get_price"
                          >Запросить цену</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="menu-other-products__buttons">
                    <a
                      href="javascript:void(0);"
                      class="btn__base btn__add-cart"
                      >В корзину</a
                    >
                    <a href="javascript:void(0);" class="add-favorite">
                      <i class="icons icon__grey-favorite"></i>
                    </a>
                  </div>
                  <div class="menu-other-products__break"></div>
                </div>
              </div>
            </div>`;
  });

  $(".menu-other-products__block").remove();
  $(".buy-header-main").after(productsSecond);

  $(".filter-pagination__wrapper ul li").remove();

  allPageArr.forEach((i) => {
    if (i < 2) {
      paginate =
        paginate + `<li class="${classNumber == i ? "active" : ""}">${i}</li>`;
    }

    if (i > 1 && i < 4 + invertCount) {
      paginate =
        paginate + `<li class="${classNumber == i ? "active" : ""}">${i}</li>`;
    }

    if (allPage > 5 + invertCount && i == 4 + invertCount) {
      paginate = paginate + `<li>...</li>`;
    }

    if (allPageArr.length === 2) {
      return;
    }

    if (allPageArr.length === 3) {
      return;
    }

    if (i + 2 > allPage) {
      paginate =
        paginate + `<li class="${classNumber == i ? "active" : ""}">${i}</li>`;
    }
  });

  $(".filter-pagination__wrapper ul").prepend(paginate);

  if (allPageArr.length === 4) {
    $(".filter-pagination__wrapper ul li").first().next().next().remove();
  }

  $(".filter-pagination__wrapper ul li").click((elem) => {
    const pageNumber = $(elem.target).text();
    classNumber = pageNumber;

    if (pageNumber === "...") {
      return;
    }

    if (!$(elem.target).prev().length && pageNumber > 1) {
      count = count - 1;
      invertCount = invertCount - 1;
    }

    if ($(elem.target).next().text() == "...") {
      count = count + 1;
      invertCount = invertCount + 1;
    }

    renderProduct(pageNumber - 1);
  });
}

$(".filter-pagination__wrapper ul li").click((item) => {});
