import menuArray from "/data.js";
const orderArray = [];
const modal = document.getElementById("modal");
const cardForm = document.getElementById("card-form");

document.addEventListener("click", (e) => {
  e.target.dataset.add ? handleAddOrder(e) : "";
  e.target.dataset.remove ? handleRemoveOrder(e) : "";
  // Open modal if user clicks 'complete order'
  if (e.target.id === "pay-btn") {
    modal.classList.add("show");
  }
  // Close modal with the close button
  if (e.target.id === "modal-close-btn") {
    closeModal();
  }

  // Close modal if clicking outside the modal content
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("show");
  // Clear the form
  cardForm.reset();
  // Remove any error messages
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate required fields
  const cardName = cardForm.cardName.value.trim();
  const cardNumber = cardForm.cardNumber.value.trim();
  const cardCvc = cardForm.cardCvc.value.trim();

  if (!cardName || !cardNumber || !cardCvc) {
    alert("Please fill in all required fields");
    return;
  }

  // If validation passes, proceed with original logic
  modal.classList.remove("show");

  // Clear the order array
  orderArray.length = 0;

  // Clear the order container and update display
  renderOrder();

  const thankYouMessage = document.createElement("div");
  thankYouMessage.classList.add("thank-you");
  thankYouMessage.innerHTML = `<p>Thanks, ${cardName}, for your payment!</p>`;
  thankYouMessage.innerHTML += `<p>Your order is on its way!</p>`;

  // Replace the order container content with just the thank you message
  document.getElementById("order-container").innerHTML = "";
  document.getElementById("order-container").appendChild(thankYouMessage);
});

function handleAddOrder(e) {
  const id = Number(e.target.dataset.add);
  const orderItem = menuArray.find((menuItem) => menuItem.id === id);
  if (orderItem) {
    orderArray.push(orderItem);
    renderOrder();
  }
}

function handleRemoveOrder(e) {
  const index = Number(e.target.dataset.index);
  if (index !== -1) {
    orderArray.splice(index, 1);
    renderOrder();
  }
}

function getMenu() {
  let menuHtml = ``;

  menuArray.forEach((menu) => {
    menuHtml += `<div class="menu">
                <div class="menu-start">
                    
                    <p class="menu-img">${menu.emoji}</p>
                </div>
                    <div class="menu-mid">
                        <h4 class="menu-title">${menu.name}</h4>
                        <p class="menu-info">${menu.ingredients}</p>
                        <p class="menu-price">$${menu.price}</p>
                    </div>
                <div class="menu-end">
                    <i class="fa-solid fa-plus"
                    data-add="${menu.id}"></i>
                </div>
            </div>
            `;
  });

  return menuHtml;
}

function getOrder() {
  if (orderArray.length === 0) {
    return "";
  }
  const totalPrice = orderArray.reduce((total, order) => {
    return total + order.price;
  }, 0);

  let orderHtml = `<h4 class="order-title">Your Order</h4> `;

  orderArray.forEach((order, index) => {
    orderHtml += `<div class="order">
                <div class="order-start">
                    
                    <h4 class="order-title">${order.name}</h4>
                    <span class="order-remove"
                        data-remove="${order.id}" 
                        data-index="${index}">remove</span>
                </div>
                <div class="order-end">
                    <p class="order-price">$${order.price}</p>
                    </div>
                </div>`;
  });
  orderHtml += `<div class="total-section">
                    <p class="order-total">Total price: $${totalPrice}</p>
                    <button class="order-btn" id="pay-btn">Complete order</button>
                </div>`;
  return orderHtml;
}

function renderMenu() {
  document.getElementById("menu-container").innerHTML = getMenu();
}

function renderOrder() {
  document.getElementById("order-container").innerHTML = getOrder();
}

renderMenu();
renderOrder();
