const q = (el) => document.querySelector(el);
const qs = (els) => document.querySelectorAll(els);

pizzaJson.map((item, index) => {
    const pizza = q(".models .pizza-item").cloneNode(true);

    
    pizza.querySelector("a img").src = item.img;
    pizza.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizza.querySelector(".pizza-item--name").innerHTML = item.name;
    pizza.querySelector(".pizza-item--desc").innerHTML = item.description;
    
    q(".pizza-area").append(pizza);
});