let filters = {};
let productItems = [];

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
function renderProduct(pageNumber) {
  const ONE_PAGE = 10;
  const allPage = Math.round(productItems.length / ONE_PAGE);
  const allPageArr = [];
  let products = "";
  let paginate = "";
  let indent = 0;

  for (let i = count; i < allPage; i++) {
    allPageArr.push(i + 1);
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

  $(".filter-pagination__wrapper ul li").remove();

  allPageArr.forEach((i) => {
    if (i < 2) {
      paginate = paginate + `<li class="active">${i}</li>`;
    }

    if (i > 1 && i < 4) {
      paginate = paginate + `<li>${i}</li>`;
    }

    if (allPage > 6 && i === 4) {
      paginate = paginate + `<li>...</li>`;
    }

    if (i + 2 > allPage) {
      paginate = paginate + `<li>${i}</li>`;
    }
  });

  $(".filter-pagination__wrapper ul").prepend(paginate);

  $(".filter-pagination__wrapper ul li").click((elem) => {
    const pageNumber = $(elem.target).text();

    if (pageNumber === "...") {
      return;
    }

    if ($(elem.target).next().text() == "...") {
      count = count + 1;
    }

    renderProduct(pageNumber - 1);
  });
}

$(".filter-pagination__wrapper ul li").click((item) => {});
