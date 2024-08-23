document.addEventListener("DOMContentLoaded", HandleEvent("check_log_status"));

function HandleEvent(event) 
{
    if (event === "check_log_status") 
    {
        var path = window.location.pathname;
        var current_page = path.split("/").pop().replace(".html", "");
        localStorage.setItem("current_page", current_page);
        
        if ("total_amount" in localStorage)
        {
            document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
        }
        else
        {
            localStorage.setItem("total_amount", 0);
            document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
        }
        

        if ("logged_in" in localStorage && localStorage.getItem("logged_in") !== "") 
        {
            // User is logged in
            document.getElementById("logged_in_page").style.display = 'block';
            document.getElementById("log_in_link").style.display = 'none';
            HandleEvent("logged_in");
        } 
        else 
        {
            // User is not logged in
            document.getElementById("logged_in_page").style.display = 'none';
            document.getElementById("log_in_link").style.display = 'block';

            if (current_page === "order_pizza" || current_page === "create_pizza")
            {
                document.getElementById("pizza_form_1").style.display = "none"
                document.getElementById("not_logged_in").style.display = "block"
            }
        }
    } 
    else if (event === "logged_in") 
    {
        // Show logged in elements
        document.getElementById("logged_in_page").style.display = 'block';
        document.getElementById("log_in_link").style.display = 'none';

        // Set the welcome text
        document.getElementById("username-text").textContent = "Kiva nähdä taas, " + localStorage.getItem("logged_in") + "!\xa0\xa0";
    } 
    else if (event === "log_out") 
    {
        // Hide logged in elements
        document.getElementById("logged_in_page").style.display = 'none';
        document.getElementById("log_in_link").style.display = 'block';

        localStorage.setItem("logged_in", "");
        var path = window.location.pathname;
        var current_page = path.split("/").pop();
        window-location.replace(current_page);
    }
    else if (event === "gotoPizza")
    {
        const dropDown = document.getElementById("pizza_dropdown");
        const pizza_id = dropDown.value;

        if (pizza_id === "pizza_1")
        {
            window-location.replace("pizza_1.html");
        }
        else if (pizza_id === "pizza_2")
        {
            window-location.replace("pizza_2.html");
        }
        else if (pizza_id === "pizza_3")
        {
            window-location.replace("pizza_3.html");
        }
        else if (pizza_id === "pizza_4")
        {
            window-location.replace("pizza_4.html");
        }
        else if (pizza_id === "pizza_5")
        {
            window-location.replace("pizza_5.html");
        }
        else if (pizza_id === "pizza_6")
        {
            window-location.replace("pizza_6.html");
        }
        else
        {
            window-location.replace("index.html");
        }
    }
    else if (event === "order_pizza_next")
    {
        const dropDown = document.getElementById("pizza_order_dropdown");
        const pizza_id = dropDown.value;
        localStorage.setItem("pizza", dropDown.querySelector('option[value="' + pizza_id + '"]').textContent);
        var pizza = localStorage.getItem("pizza");
        var checkbox = document.getElementById("gluten-free");
        var isGlutenFree = checkbox.checked;
        var amount = document.getElementById("amount_field").value;
        localStorage.setItem("amount", amount);
        var total = 0;
        var special_notes;
        localStorage.setItem("special", document.getElementById("additional").value);

        switch (pizza) 
        {
            case "Napoletana":
                total += 12 * amount;
                break;
            case "Margherita":
                total += 10 * amount;
                break;
            case "Al taglio":
                total += 15 * amount;
                break;
            case "Caprese":
                total += 18 * amount;
                break;
            case "Alla diavola":
                total += 15 * amount;
                break;
            default:
                break;
        }


        if (isGlutenFree)
        {
            localStorage.setItem("gluten-free", "true");
            total += 2;
        }
        else
        {
            localStorage.setItem("gluten-free", "false");
        }

        if (localStorage.getItem("gluten-free") === "true")
        {
            if (localStorage.getItem("special") !== "")
            {
                special_notes = "Gluteeniton pohja, " + localStorage.getItem("special");
                total += 5;
            }
            else
            {
                special_notes = "Gluteeniton pohja";
            }
            }
        else
        {
            if (localStorage.getItem("special") !== "")
            {
                special_notes = localStorage.getItem("special");
                total += 5;
            }
            else
            {
                special_notes = "Ei ole";
            }
        }

        if (pizza_id === "null")
        {
            alert("Ole hyvä ja valitse pizza");
        }
        else
        {
            if (amount === "" || amount === "0" || Number(amount) < 0)
            {
                alert("Ole hyvä ja anna järkevä määrä");
            }
            else
            {   
                localStorage.setItem("total", total);
                localStorage.setItem("amount", amount);

                //Success
                document.getElementById("pizza_form_1").style.display = "none";
                document.getElementById("pizza_form_3").style.display = "block";
                document.getElementById("special").textContent = "Erityishuomiot: " + special_notes;
                document.getElementById("item").textContent = "Pizza: " + dropDown.querySelector('option[value="' + pizza_id + '"]').textContent;
                document.getElementById("amount_final").textContent = "Määrä: " + amount;
                document.getElementById("total").textContent = "Hinta yhteensä: " + total + "€";
            }
        }
    }
    else if (event === "order_custom_pizza_next")
    {
        const dropDown = document.getElementById("pizza_order_dropdown");
        const pohja_id = dropDown.value;
        localStorage.setItem("pohja", dropDown.querySelector('option[value="' + pohja_id + '"]').textContent);
        var pohja = localStorage.getItem("pohja");
        var checkbox = document.getElementById("gluten-free");
        var isGlutenFree = checkbox.checked;
        var amount = document.getElementById("amount_field").value;
        localStorage.setItem("amount", amount);
        var total = 10;
        var special_notes;
        localStorage.setItem("special", document.getElementById("additional").value);
        special_notes = localStorage.getItem("special");

        switch (pohja) 
        {
            case "Vehnä":
                total += 5 * amount;
                break;
            case "Ruis":
                total += 10 * amount;
                break;
            default:
                break;
        }

        if (special_notes !== "" && special_notes !== null)
        {
            if (isGlutenFree)
            {
                localStorage.setItem("gluten-free", "true");
                special_notes += ", Gluteeniton pohja"
                total += 2;
            }
            else
            {
                localStorage.setItem("gluten-free", "false");
            }

            if (pohja_id === "null")
            {
                alert("Ole hyvä ja valitse pohja");
            }
            else
            {
                if (amount === "" || amount === "0" || Number(amount) < 0)
                {
                    alert("Ole hyvä ja anna järkevä määrä");
                }
                else
                {
                    localStorage.setItem("total", total);
                    localStorage.setItem("amount", amount);

                    //Success
                    document.getElementById("pizza_form_1").style.display = "none";
                    document.getElementById("pizza_form_3").style.display = "block";
                    document.getElementById("special").textContent = "Täytteet ja lisät: " + special_notes;
                    document.getElementById("item").textContent = "Pohja: " + dropDown.querySelector('option[value="' + pohja_id + '"]').textContent;
                    document.getElementById("amount_final").textContent = "Määrä: " + amount;
                    document.getElementById("total").textContent = "Hinta yhteensä: " + total + "€";
                }
            }
        }
        else
        {
            alert("Ole hyvä ja kerro mitä täytteitä haluat");
        }
    }
    else if (event === "Order_Custom")
    {
        document.getElementById("pizza_form_3").style.display = "none";
        document.getElementById("loader").style.display = "block";
        setTimeout(function() {
            var total = localStorage.getItem("total");
            var amount = localStorage.getItem("amount");

            document.getElementById("loader").style.display = "none";
            document.getElementById("order-finish").style.display = "block";
            if ("total_prize" in localStorage)
                {
                    localStorage.setItem("total_prize", parseInt(localStorage.getItem("total_prize")) + parseInt(total));
                }
                else
                {
                    localStorage.setItem("total_prize", parseInt(total));
                }

                if ("total_amount" in localStorage)
                {
                    localStorage.setItem("total_amount", parseInt(localStorage.getItem("total_amount")) + parseInt(amount));
                }
                else
                {
                    localStorage.setItem("total_amount", parseInt(amount));
                }

                //Create dataString
                var dataString = "Fantasiapizza:0/" + document.getElementById("item").textContent + "/" + document.getElementById("amount_final").textContent + "/" + document.getElementById("special").textContent + "/" + document.getElementById("total").textContent;
                
                //If ordersString exists in localStorage
                if ("orders" in localStorage)
                {
                    localStorage.setItem("orders", localStorage.getItem("orders") + "/" + dataString);
                }
                else //if not
                {
                    localStorage.setItem("orders", dataString);
                }
                document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
        }, 3000);
    }
    else if (event === "ShowDelivery")
    {
        document.getElementById("deliveryDiv").style.display = "block";
        localStorage.setItem("total_prize", parseInt(localStorage.getItem("total_prize")) + 5);
        document.getElementById("total_final").textContent = "Yhteishinta: " + localStorage.getItem("total_prize") + "€";
    }
    else if (event === "HideDelivery")
    {
        document.getElementById("deliveryDiv").style.display = "none";
        localStorage.setItem("total_prize", parseInt(localStorage.getItem("total_prize")) - 5);
        document.getElementById("total_final").textContent = "Yhteishinta: " + localStorage.getItem("total_prize") + "€";
    }
    else if (event === "Order")
    {
        document.getElementById("pizza_form_3").style.display = "none";
        document.getElementById("loader").style.display = "block";
        setTimeout(function() {
            var total = localStorage.getItem("total");
            var amount = localStorage.getItem("amount");

            document.getElementById("loader").style.display = "none";
            document.getElementById("order-finish").style.display = "block";
            if ("total_prize" in localStorage)
                {
                    localStorage.setItem("total_prize", parseInt(localStorage.getItem("total_prize")) + parseInt(total));
                }
                else
                {
                    localStorage.setItem("total_prize", parseInt(total));
                }

                if ("total_amount" in localStorage)
                {
                    localStorage.setItem("total_amount", parseInt(localStorage.getItem("total_amount")) + parseInt(amount));
                }
                else
                {
                    localStorage.setItem("total_amount", parseInt(amount));
                }

                //Create dataString
                var dataString = "Tilaus:" + localStorage.getItem("pizza") + "/" + document.getElementById("item").textContent + "/" + document.getElementById("amount_final").textContent + "/" + document.getElementById("special").textContent + "/" + document.getElementById("total").textContent;
                
                //If ordersString exists in localStorage
                if ("orders" in localStorage)
                {
                    localStorage.setItem("orders", localStorage.getItem("orders") + "/" + dataString);
                }
                else //if not
                {
                    localStorage.setItem("orders", dataString);
                }
                document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
        }, 3000);
    }
    else if (event === "home")
    {
        window-location.replace("index.html");
    }
    else if (event === "menu")
    {
        window-location.replace("menu.html");
    }
    else 
    {
        document.write("Error 404_1 Unexpected unknown event call");
    }
}

function handleRatingChange(selectedRating) 
{
    const stars = document.querySelectorAll('.rating label');
    stars.forEach((star, index) => {
      if (index < selectedRating) 
      {
        star.style.color = '#ffd700'; // Gold color for selected stars
      } 
      else 
      {
        star.style.color = '#ddd'; // Default color for unselected stars
      }
    });
  }


function sendfeedback()
{
    alert("Palaute lähetettiin onnistuneesti!");
}

