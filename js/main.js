const BIKES = {
  Honda: ["Winner X", "SH 160i", "Air Blade", "CBR 650R"],
  Yamaha: ["Exciter 155", "NVX 155", "R15 V4", "Grande"],
  Suzuki: ["Satria F150", "Raider R150", "GSX-R150"],
  Kawasaki: ["Z1000", "Ninja 400", "ZX-10R"],
  Ducati: ["Monster", "Panigale V2"],
  Piaggio: ["Vespa Sprint", "Medley"],
};

const PRODUCTS = [
  {
    name: "Phuộc Ohlins TTX SH 350i chính hãng bình dầu",
    pn: "MT-PH-OH-V2",
    brand: "Ohlins",
    category: "Phuộc",
    make: "Yamaha",
    model: "Exciter 155",
    price: 68000000,
    old: 72000000,
    promo: true,
    image: "images/ohlins ttx.jpg",
  },
  {
    name: "Tay thắng Brembo Corsa Corta 15",
    pn: "MT-TT-BR-CC19",
    brand: "Brembo",
    category: "tay thắng",
    make: "Honda",
    model: "Winner X",
    price: 13927000,
    old: 15474000,
    promo: true,
    image: "images/Tay Thắng Brembo Corsa Corta 15.jpg",
  },
  {
    name: "Tay Thắng Brembo Corsa Corta RR 15",
    pn: "MT-HD-BR-4P",
    brand: "Brembo",
    category: "tay thắng",
    make: "Kawasaki",
    model: "Z1000",
    price: 32000000,
    old: 35000000,
    promo: true,
    image: "images/Tay Thắng Brembo Corsa Corta RR 15.jpg",
  },
  {
    name: "Tay Thắng Brembo RCS 14",
    pn: "MT-PO-AK-CR",
    brand: "Brembo",
    category: "Tay thắng",
    make: "Ducati",
    model: "Panigale V2",
    price: 7400000,
    old: 7800000,
    promo: false,
    image: "images/Tay Thắng Brembo RCS 14.JPG",
  },
  {
    name: "Tay Thắng Brembo RCS 15",
    pn: "MT-NSD-UMA-428",
    brand: "Brembo",
    category: "Tay thắng",
    make: "Suzuki",
    model: "Satria F150",
    price: 7600000,
    old: 8500000,
    promo: false,
    image: "images/Tay Thắng Brembo RCS 15.JPG",
  },
  {
    name: "Phuộc sau Shark X2 điện Honda SH350i",
    pn: "MT-LED-NGK-BI",
    brand: "Taiwan",
    category: "Phuộc",
    make: "Honda",
    model: "SH 350i",
    price: 45000000,
    old: 48790000,
    promo: false,
    image: "images/Shark-X2-Dien-Honda-SH350i.jpg",
  },
];
const CART_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7V6a5 5 0 0 1 10 0v1h3l-1.6 12.2A2 2 0 0 1 16.42 21H7.58a2 2 0 0 1-1.98-1.8L4 7h3Zm2 0h6V6a3 3 0 0 0-6 0v1Z"/></svg>';

const money = (n) => n.toLocaleString("vi-VN") + "đ";

function getCart() {
  return JSON.parse(localStorage.getItem("mt_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("mt_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = totalQty;
}

function addToCart(pn) {
  const product = PRODUCTS.find((p) => p.pn === pn);
  if (!product) return;
  let cart = getCart();
  const existing = cart.find((item) => item.pn === pn);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function fillMakes() {
  const makeSelect = document.getElementById("filter-make");
  if (!makeSelect) return;
  Object.keys(BIKES).forEach((make) => {
    const opt = document.createElement("option");
    opt.value = make;
    opt.textContent = make;
    makeSelect.appendChild(opt);
  });
}

function fillModels(make) {
  const modelSelect = document.getElementById("filter-model");
  if (!modelSelect) return;
  modelSelect.innerHTML = '<option value="">Tất cả tên xe</option>';
  if (!make || !BIKES[make]) return;
  BIKES[make].forEach((model) => {
    const opt = document.createElement("option");
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
  });
}

// HÀM CARDHTML ĐÃ ĐƯỢC CHỈNH SỬA ĐỂ THÊM LINK
function cardHTML(item, compact) {
  const old = item.old ? `<span class="was">${money(item.old)}</span>` : "";
  if (compact) {
    return `
      <article class="promo-card">
        <a href="product.html?id=${item.pn}" style="display: block;">
          <img src="${item.image}" alt="${item.name}" />
        </a>
        <div class="meta">
          <h3><a href="product.html?id=${item.pn}" style="color: inherit; text-decoration: none;">${item.name}</a></h3>
          <p class="pn">P/N: ${item.pn}</p>
          <div class="price"><span class="now">${money(item.price)}</span>${old}</div>
        </div>
      </article>`;
  }
  return `
    <article class="product-card">
      <button class="cart-icon" type="button" data-pn="${item.pn}" aria-label="Thêm ${item.name} vào giỏ">${CART_SVG}</button>
      <a href="product.html?id=${item.pn}" style="display: block;">
        <img src="${item.image}" alt="${item.name}" />
      </a>
      <div class="body">
        <h3><a href="product.html?id=${item.pn}" style="color: inherit; text-decoration: none;">${item.name}</a></h3>
        <p class="pn">P/N: ${item.pn}</p>
        <div class="price"><span class="now">${money(item.price)}</span>${old}</div>
      </div>
    </article>`;
}
function render(list) {
  const promoEl = document.getElementById("promo-list");
  if (promoEl) {
    promoEl.innerHTML = PRODUCTS.filter((p) => p.promo)
      .map((p) => cardHTML(p, true))
      .join("");
  }
  const gridEl = document.getElementById("product-grid");
  if (gridEl) {
    gridEl.innerHTML = list.map((p) => cardHTML(p, false)).join("");
  }
  const countEl = document.getElementById("result-count");
  if (countEl) {
    countEl.textContent = `${list.length} sản phẩm`;
  }
}

function currentFilters() {
  const pEl = document.getElementById("filter-product");
  const bEl = document.getElementById("filter-brand");
  const mEl = document.getElementById("filter-make");
  const moEl = document.getElementById("filter-model");
  const qEl = document.querySelector(".header-search input");
  return {
    product: pEl ? pEl.value : "",
    brand: bEl ? bEl.value : "",
    make: mEl ? mEl.value : "",
    model: moEl ? moEl.value : "",
    q: qEl ? qEl.value.trim().toLowerCase() : "",
  };
}

function applyFilters() {
  const f = currentFilters();
  const list = PRODUCTS.filter((p) => {
    const hay = `${p.name} ${p.brand} ${p.make} ${p.model} ${p.category} ${p.pn}`.toLowerCase();
    return (
      (!f.product || p.category === f.product) &&
      (!f.brand || p.brand === f.brand) &&
      (!f.make || p.make === f.make) &&
      (!f.model || p.model === f.model) &&
      (!f.q || hay.includes(f.q))
    );
  });
  render(list);
}

function initSlider() {
  const root = document.getElementById("hero-slider");
  if (!root) return;
  const slides = [...root.querySelectorAll(".hero-slide")];
  const dots = [...root.querySelectorAll(".hero-dots button")];
  let index = 0;
  let timer;

  function go(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  }

  function start() {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 4000);
  }

  const prevBtn = root.querySelector(".hero-nav.prev");
  const nextBtn = root.querySelector(".hero-nav.next");
  if (prevBtn) prevBtn.addEventListener("click", () => { go(index - 1); start(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { go(index + 1); start(); });
  
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { go(i); start(); });
  });

  start();
}

document.addEventListener("DOMContentLoaded", () => {
  fillMakes();
  fillModels("");
  render(PRODUCTS);
  initSlider();
  updateCartCount();

  const makeFilter = document.getElementById("filter-make");
  if (makeFilter) {
    makeFilter.addEventListener("change", (e) => fillModels(e.target.value));
  }

  const filterForm = document.getElementById("filter-form");
  if (filterForm) {
    filterForm.addEventListener("submit", (e) => { e.preventDefault(); applyFilters(); });
  }

  const searchForm = document.querySelector(".header-search");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => { e.preventDefault(); applyFilters(); });
  }

  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
    productGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".cart-icon");
      if (!btn) return;
      const pn = btn.getAttribute("data-pn");
      addToCart(pn);
    });
  }
});