document.addEventListener("DOMContentLoaded", LoadCart);

function LoadCart()
{
    var cart_text = document.getElementById("ostoskori_text");
    var cart_list = document.getElementById("cart_list");
    var total_text = document.getElementById("total_final");
    var total_amount = document.getElementById("total_amount");
    var delivery_type = document.getElementById("deliveryType");
    var delivery_location = document.getElementById("deliveryLocation");
    var delivery_time = document.getElementById("delivery-time");
    var order_num = 0;

    if ("orders" in localStorage && "logged_in" in localStorage)
    {
        if (localStorage.getItem("orders") !== "" && localStorage.getItem("orders") !== null && localStorage.getItem("logged_in") !== "" && localStorage.getItem("logged_in") !== null)
        {
            let orders_raw = localStorage.getItem("orders");

            if (orders_raw.startsWith("/")) 
            {
                localStorage.setItem("orders", orders_raw.substring(1));
            }

            orders_raw = localStorage.getItem("orders").split("/");
            
            let orders = {};
            let currentKey = "";

            for (let i = 0; i < orders_raw.length; i++)
            {

                let order = orders_raw[i].split(":");
                let key = order[0].trim();
                let value = order[1].trim();
                
                if (key === "Tilaus")
                {
                    if (order_num > 0)
                    {
                        CreateButton(order_num, cart_list)
                    }
                    order_num++;
                    var orderTitle = document.createElement("li");
                    orderTitle.textContent = "-----------------------" + value + ", tilaus nro." + order_num + "-----------------------";
                    cart_list.appendChild(orderTitle);
                }
                else if (key === "Fantasiapizza")
                {
                    if (order_num > 0)
                    {
                        CreateButton(order_num, cart_list)
                    }
                    order_num++;
                    var orderTitle = document.createElement("li");
                    orderTitle.textContent = "-------------------" + "Fantasiapizza, tilaus nro." + order_num + "-------------------";
                    cart_list.appendChild(orderTitle);
                }
                else
                {
                    var cartItem = document.createElement("li");
                    cartItem.textContent = key + ": " + value;
                    cart_list.appendChild(cartItem);
                }
            }
            if (order_num > 0)
            {
                CreateButton(order_num, cart_list)
            }

            total_text.textContent = "Yhteishinta: " + localStorage.getItem("total_prize") + "€";
            total_amount.textContent = "Pizzoja yhteensä " + localStorage.getItem("total_amount") + " kappaletta";
        }
        else
        {
            cart_text.textContent = "Ostoskori on tyhjä";
            cart_text.style.display = "block";
            document.getElementById("order_final").style.display = "none";
            localStorage.setItem("total_amount", 0);
            localStorage.removeItem("orders");
            document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
        }
    }
    else
    {
        cart_text.textContent = "Ostoskori on tyhjä";
        cart_text.style.display = "block";
        document.getElementById("order_final").style.display = "none";
        localStorage.setItem("total_amount", 0);
        localStorage.removeItem("orders");
        document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
    }
}

function Destroy_Order(id) {
    var end_num = (id * 5) - 1;
    var order_list = localStorage.getItem("orders");
    var final_order_list = "";
    order_list = order_list.split("/");

    // Calculate the start index for the splice
    var start_index = Math.max(0, end_num - 4); // Subtracting 4 instead of 5

    // Remove elements from start_index to end_num
    order_list.splice(start_index, end_num - start_index + 1);

    for (var i = 0; i < order_list.length; i++) 
    {
        if (i === 0)
        {
            final_order_list += order_list[i];
        }
        else
        {
            final_order_list += "/" + order_list[i];
        }
    }

    // Update the localStorage with the modified order list
    localStorage.setItem("orders", final_order_list);

    localStorage.setItem("total_amount", parseInt(localStorage.getItem("total_amount")) - 1)
    
    localStorage.setItem("total_prize", parseInt(localStorage.getItem("total_prize")) - parseInt(localStorage.getItem("total")))

    window-location.replace("ostoskori.html");
}


function CreateButton(order_num, cart_list)
{
    var delButton = document.createElement("button");
    delButton.textContent = "Poista";
    delButton.style = "background-color: red; color: white; border: 1px solid black; border-radius: 10px; cursor: pointer;"
    delButton.onclick = function() {
         Destroy_Order(order_num)
    };
    cart_list.appendChild(delButton);
}