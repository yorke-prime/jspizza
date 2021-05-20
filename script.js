const q = (el) => document.querySelector(el);
const qs = (els) => document.querySelectorAll(els);

pizzaJson.map((item, index) => {
    const pizza = q(".models .pizza-item").cloneNode(true);

    pizza.querySelector("")
    
    q(".pizza-area").append(pizza);
});