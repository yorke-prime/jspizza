interface IPizzaDTO {
    id: number;
    name: string;
    img: string;
    price: number;
    sizes: string[];
    description: string;
}

interface ICartDTO {
    indentifier: string;
    id: number;
    size: number;
    qt: number;
}

import { pizzaJson } from "./pizzas.js";

let modalQt = 0;
let modalKey = 0;
let cart: ICartDTO[] = [];

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

        const key = e.target as HTMLElement;
        const cont = key.closest(".pizza-item").getAttribute("data-key");
        modalQt = 1;

        const pizzaInfo = pizzaJson[Number(cont)];

        q(".pizzaBig img").src = pizzaInfo.img;
        q(".pizzaInfo h1").innerHTML = pizzaInfo.name;
        q(".pizzaInfo--desc").innerHTML = pizzaInfo.description;
        q(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaInfo.price.toFixed(2)}`;
        q(".pizzaInfo--size.selected").classList.remove("selected");
        qs(".pizzaInfo--size").forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
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
        // ==============================================================

       modalKey = index;
            

        
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

q(".pizzaInfo--qtmenos").addEventListener("click", () => {
    if (modalQt > 1) {
        modalQt--;
    }
    q('.pizzaInfo--qt').innerHTML = String(modalQt);
});

q(".pizzaInfo--qtmais").addEventListener("click", () => {
    modalQt++;
    q('.pizzaInfo--qt').innerHTML = String(modalQt);
})

qs(".pizzaInfo--size").forEach((size, sizeIndex) => {
    size.addEventListener("click", (e) => {
        q(".pizzaInfo--size.selected").classList.remove("selected");
        size.classList.add("selected");
    });
});

q(".pizzaInfo--addButton").addEventListener("click", () => {
    const size = parseInt(q(".pizzaInfo--size.selected").getAttribute("data-key"));

            const indentifier = pizzaJson[modalKey].id + "@" + size;

            let key = cart.findIndex((item) => item.indentifier == indentifier);

            if (key > -1) {
                cart[key].qt += modalQt;
            } else {
                cart.push({
                    indentifier,
                    id: pizzaJson[modalKey].id,
                    qt: modalQt,
                    size
                });
            }

            updateCart();   
            closeModal();
            console.log(cart);
        }
);

q(".menu-openner").addEventListener("click", () => {
    if(cart.length > 0) {
        q("aside").style.left = '0';
    }
});
q(".menu-closer").addEventListener("click", () => {
    q("aside").style.left = '100vw';
});

function updateCart() {
    q(".menu-openner span").innerHTML = String(cart.length);
    if(cart.length >= 1) {
        q("aside").classList.add("show");
        q(".cart").innerHTML = "";

        let subtotal = 0;
        let  desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id );
            const cartItem = q(".models .cart--item").cloneNode(true) as HTMLInputElement;

            subtotal += pizzaItem.price * cart[i].qt;

            let pizzaSize;
            switch(cart[i].size) {
                case 0:
                    pizzaSize = "P"
                    break;
                case 1:
                    pizzaSize = "M"
                    break;
                case 2:
                    pizzaSize = "G"
                    break;
            }
            
            cartItem.querySelector("img").src = pizzaItem.img;
            cartItem.querySelector(".cart--item-nome").innerHTML = `${pizzaItem.name} (${pizzaSize})`;
            cartItem.querySelector(".cart--item--qt").innerHTML = String(cart[i].qt);
            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                }else {
                    cart.splice(Number(i), 1);
                    console.log(cart);
                }
                updateCart();
            });
            cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
                cart[i].qt++;
                updateCart();
            });


            q(".cart").append(cartItem);

        } 
        
        desconto = subtotal * 0.1;

        total = subtotal - desconto;

        q(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
        q(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
        q(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
        
    }else {
        q("aside").classList.remove("show");
        q("aside").style.left = '100vw';
    }
}

function teste() {
    setTimeout(() => {
        cart = [];
        updateCart();
    }, 1000);
}