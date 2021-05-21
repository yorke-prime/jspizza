interface IPizzaDTO {
    id: number;
    name: string;
    img: string;
    price: number;
    sizes: string[];
    description: string;
}

import {pizzaJson} from "./pizzas.js";

let modalQt = 0;

const q = (el: string) => document.querySelector<HTMLInputElement>(el);
const qs = (els: string) => document.querySelectorAll<HTMLInputElement>(els);

pizzaJson.map((item: IPizzaDTO, index: number): void => {
    const pizza = document.querySelector(".models .pizza-item").cloneNode(true) as HTMLInputElement;

    pizza.setAttribute("data-key", String(index));
    pizza.querySelector<HTMLInputElement>("a img").src = item.img;
    pizza.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizza.querySelector(".pizza-item--name").innerHTML = item.name;
    pizza.querySelector(".pizza-item--desc").innerHTML = item.description;
    pizza.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
 
        const key = e.target as HTMLElement ;
        const cont = key.closest(".pizza-item").getAttribute("data-key");
        modalQt = 1;

        const pizzaInfo = pizzaJson[Number(cont)];

        q(".pizzaBig img").src = pizzaInfo.img;
        q(".pizzaInfo h1").innerHTML = pizzaInfo.name;
        q(".pizzaInfo--desc").innerHTML = pizzaInfo.description;
        q(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaInfo.price.toFixed(2)}`;
        q(".pizzaInfo--size.selected").classList.remove("selected");
        qs(".pizzaInfo--size").forEach((size, sizeIndex) => {
            if( sizeIndex == 2 ) {
                size.classList.add("selected");
            }

            size.querySelector("span").innerHTML = pizzaInfo.sizes[sizeIndex];
        });
        q('.pizzaInfo--qt').innerHTML = String(modalQt);

        q('.pizzaWindowArea').style.opacity = "0";
        q('.pizzaWindowArea').style.display = "flex";
        setTimeout(() => {
            q('.pizzaWindowArea')!.style.opacity = "1";
        }, 200);
        

    });
    
    q(".pizza-area").append(pizza);
});

function closeModal() {
    q('.pizzaWindowArea')!.style.opacity = "0";
    setTimeout(() => {
        q('.pizzaWindowArea').style.display = "none";
    }, 500);
}

qs(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener("click", closeModal);
});