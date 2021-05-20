interface IPizzaDTO {
    id: number;
    name: string;
    img: string;
    price: number;
    sizes: string[];
    description: string;
}

import {pizzaJson} from "./pizzas.js";
const q = (el: string) => document.querySelector(el);
const qs = (els: string) => document.querySelectorAll(els);

pizzaJson.map((item: IPizzaDTO): void => {
    const pizza = document.querySelector(".models .pizza-item").cloneNode(true) as HTMLInputElement;

    
    pizza.querySelector<HTMLInputElement>("a img").src = item.img;
    pizza.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizza.querySelector(".pizza-item--name").innerHTML = item.name;
    pizza.querySelector(".pizza-item--desc").innerHTML = item.description;
    pizza.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector<HTMLElement>('.pizzaWindowArea')!.style.opacity = "0";
        document.querySelector<HTMLElement>('.pizzaWindowArea')!.style.display = "flex";
        setTimeout(() => {
            document.querySelector<HTMLElement>('.pizzaWindowArea')!.style.opacity = "1";
        }, 200);
        
    });
    
    q(".pizza-area").append(pizza);
});