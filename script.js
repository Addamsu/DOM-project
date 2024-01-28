document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const totalPriceElement = document.getElementById("total-price");
    let total = 0;

    // Sample preselected items
    const items = [
        { name: "Item 1", price: 10, quantity: 1 },
        { name: "Item 2", price: 20, quantity: 1 },
        // Add more items as needed
    ];

    // Function to render items in the cart
    function renderItems() {
        itemList.innerHTML = "";
        total = 0;

        items.forEach(item => {
            const li = document.createElement("li");

            // Quantity adjustment buttons
            const quantityButtons = document.createElement("div");
            quantityButtons.innerHTML = `
                <button onclick="adjustQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="adjustQuantity('${item.name}', 1)">+</button>
            `;

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener("click", () => deleteItem(item.name));

            // Like button
            const likeButton = document.createElement("button");
            likeButton.innerHTML = "❤️";
            likeButton.classList.add("like-button");
            likeButton.addEventListener("click", () => toggleLike(item.name));

            li.innerHTML = `
                <span>${item.name}</span>
                ${quantityButtons.outerHTML}
                ${deleteButton.outerHTML}
                ${likeButton.outerHTML}
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;

            itemList.appendChild(li);

            // Calculate total price
            total += item.price * item.quantity;
        });

        // Update total price
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to adjust the quantity of an item
    window.adjustQuantity = function (itemName, amount) {
        const item = items.find(item => item.name === itemName);
        if (item) {
            item.quantity += amount;
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            renderItems();
        }
    };

    // Function to delete an item from the cart
    function deleteItem(itemName) {
        const index = items.findIndex(item => item.name === itemName);
        if (index !== -1) {
            items.splice(index, 1);
            renderItems();
        }
    }

    // Function to toggle the like status of an item
    function toggleLike(itemName) {
        const item = items.find(item => item.name === itemName);
        if (item) {
            item.liked = !item.liked;
            renderItems();
        }
    }

    // Initial render
    renderItems();
});
