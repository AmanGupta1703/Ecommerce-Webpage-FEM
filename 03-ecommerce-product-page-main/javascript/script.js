// Cart elements
const cartContainerEl = document.querySelector(".cart-container");
const cartboxEl = document.querySelector(".cart__box");

// Product elements
const mainProductImgEl = document.querySelector(".main__product-image");
const mainThumbnailContainerEl = document.querySelector(".thumbnail-container");
const mainthumbnailImagesEl = document.querySelectorAll(".thumbnail");

// Lightbox elements
const lightboxEl = document.querySelector(".lightbox");
const lightboxImgEl = document.querySelector(".lightbox__img");
const lightboxThumbnailContainerEl = document.querySelector(
	".lightbox__thumbnail-container"
);
const lightboxThumbnailEls = document.querySelectorAll(".lightbox__thumbnail");

// Button and container elements
const buttonContainerEl = document.querySelector(".button-container");

// Additional elements
const lightboxHeaderEl = document.querySelector(".lightbox__header");
const bgBlackEl = document.querySelector(".bg-black");

// QUANTITY SELECTOR
const quantitySelectorEl = document.querySelector(".quantity--selector");
const countEl = document.querySelector(".count");

const totalQuantityEl = document.querySelector(".total-quantity");
const finalPriceEl = document.querySelector(".final-price");
const totalItemsEl = document.querySelector(".total-items");

// DATA
const SHOE_PRICE = 125;
const imagesArray = [
	"../images/image-product-1.jpg",
	"../images/image-product-2.jpg",
	"../images/image-product-3.jpg",
	"../images/image-product-4.jpg",
];
let currentImgIndex = 0;
let quantityCount = 1;

function showQuantityCount() {
	countEl.textContent = quantityCount;
	totalItemsEl.textContent = quantityCount;
}

function calculateTotalPrice() {
	const totalPrice = SHOE_PRICE * quantityCount;
	return totalPrice;
}

function displayTotalPrice(quantityCount) {
	const totalPrice = calculateTotalPrice();
	totalQuantityEl.textContent = quantityCount;
	finalPriceEl.textContent = `$${totalPrice}.00`;
}

function showLightBox() {
	lightboxEl.classList.add("lightbox--show");
	bgBlackEl.classList.add("bg-black--show");

	lightboxEl.classList.remove("lightbox--hide");
	bgBlackEl.classList.remove("bg-black--hide");
}

function hideLightBox() {
	lightboxEl.classList.remove("lightbox--show");
	lightboxEl.classList.add("lightbox--hide");

	bgBlackEl.classList.remove("bg-black--show");
	bgBlackEl.classList.add("bg-black--hide");
}

function showLightBoxImg(index) {
	lightboxImgEl.src = imagesArray.at(index);
}

const handleCloseButtonClick = (e) => {
	const isCloseBtnEl = e.target.classList.contains("btn--close");

	if (!isCloseBtnEl) return;

	console.log(isCloseBtnEl);

	if (isCloseBtnEl) {
		hideLightBox();
	}
};

const closeLightBox = (e) => {
	hideLightBox();
};

const openLightBox = () => {
	showLightBox();
};

const toggleCartBoxVisibility = (e) => {
	const isCartIconEl = e.target.classList.contains("header__right-img");

	if (!isCartIconEl) return;

	if (isCartIconEl) {
		cartboxEl.classList.toggle("cart__box--show");
	}
};

const selectThumbnail = (e) => {
	const img = e.target.classList.contains("thumbnail");

	if (!img) return;

	mainthumbnailImagesEl.forEach((img) =>
		img.classList.remove("thumbnail--active")
	);

	if (img) {
		const { src } = e.target.dataset;
		mainProductImgEl.src = src;
		e.target.classList.add("thumbnail--active");
	}
};

const handleLightboxThumbnailClick = (e) => {
	const img = e.target.classList.contains("lightbox__thumbnail");

	if (!img) return;

	lightboxThumbnailEls.forEach((img) =>
		img.classList.remove("lightbox__thumbnail--active")
	);

	if (img) {
		const targetImg = e.target;
		const { src } = targetImg.dataset;
		const { id } = targetImg.dataset;
		currentImgIndex = id - 1;
		lightboxImgEl.src = src;
		targetImg.classList.add("lightbox__thumbnail--active");
	}
};

const handleLightboxNavigationButtonClick = (e) => {
	const isPrevBtnEl = e.target.classList.contains("btn--prev");
	const isNextBtnEl = e.target.classList.contains("btn--next");

	if (!isPrevBtnEl && !isNextBtnEl) return;

	if (isPrevBtnEl) {
		if (currentImgIndex === 0) currentImgIndex = imagesArray.length - 1;
		else currentImgIndex--;
		showLightBoxImg(currentImgIndex);
	}

	if (isNextBtnEl) {
		if (currentImgIndex === imagesArray.length - 1) currentImgIndex = 0;
		else currentImgIndex++;
		showLightBoxImg(currentImgIndex);
	}

	lightboxThumbnailEls.forEach((img, index) => {
		if (index === currentImgIndex) {
			img.classList.add("lightbox__thumbnail--active");
		} else {
			img.classList.remove("lightbox__thumbnail--active");
		}
	});
};

const handleQuantityControlButtonClick = (e) => {
	const isMinusBtnEl = e.target.classList.contains("btn--minus");
	const isAddBtnEl = e.target.classList.contains("btn--add");

	if (!isMinusBtnEl && !isAddBtnEl) return;

	if (isMinusBtnEl) {
		if (quantityCount === 1) return;
		quantityCount--;
		showQuantityCount();
	}

	if (isAddBtnEl) {
		quantityCount++;
		showQuantityCount();
	}
	displayTotalPrice(quantityCount);
};

function init() {
	showLightBoxImg(currentImgIndex);
	showQuantityCount();
	displayTotalPrice(quantityCount);
}

lightboxHeaderEl.addEventListener("click", handleCloseButtonClick);
bgBlackEl.addEventListener("click", closeLightBox);
mainProductImgEl.addEventListener("click", openLightBox);
cartContainerEl.addEventListener("click", toggleCartBoxVisibility);
mainThumbnailContainerEl.addEventListener("click", selectThumbnail);
lightboxThumbnailContainerEl.addEventListener(
	"click",
	handleLightboxThumbnailClick
);
buttonContainerEl.addEventListener(
	"click",
	handleLightboxNavigationButtonClick
);
quantitySelectorEl.addEventListener("click", handleQuantityControlButtonClick);

init();
