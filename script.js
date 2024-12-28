// Simulating an API call to get the food menu from the JSON.
async function getMenu() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    const menu = await response.json();

    // Display the menu on the webpage
    const menuContainer = document.getElementById("menu-container");
    menu.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");
      menuItem.innerHTML = `
      <img src="${item.imgSrc}"><br/>
      <p>${item.name}</p>
      <p>${item.price}</p>
      `;
      menuContainer.appendChild(menuItem);
    });
  } catch (error) {
    console.error("Error fetching the menu:", error);
  }
}

// Simulate taking the order, returns a promise that resolves after 2500ms.
function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomBurgers = ["Burger 1", "Burger 2", "Burger 3"];
      const selectedBurgers = [];
      for (let i = 0; i < 3; i++) {
        selectedBurgers.push(
          randomBurgers[Math.floor(Math.random() * randomBurgers.length)]
        );
      }
      resolve({ order: selectedBurgers });
    }, 2500);
  });
}

// Simulate order preparation, returns a promise after 1500ms.
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// Simulate payment, returns a promise after 1000ms.
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// Show a thank you message after payment is confirmed.
function thankYouFnc() {
  alert("Thank you for eating with us today!");
}

// Putting it all together in an async function to handle the sequence.
async function handleOrderProcess() {
  try {
    // Simulate the restaurant order process
    const order = await takeOrder();
    console.log("Order placed:", order);

    const prepStatus = await orderPrep();
    console.log("Order is being prepared:", prepStatus);

    if (prepStatus.order_status) {
      const paymentStatus = await payOrder();
      console.log("Payment status:", paymentStatus);

      if (paymentStatus.paid) {
        thankYouFnc();
      }
    }
  } catch (error) {
    console.error("Error in the order process:", error);
  }
}

// Adding event listener to the "Order Food" button
document.getElementById("orderButton").addEventListener("click", () => {
  handleOrderProcess();
});

// Run the getMenu function when the page loads.
window.onload = getMenu;
