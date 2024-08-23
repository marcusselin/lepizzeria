var deliveryRadio = document.getElementById("Kuljetus");

function Order_Final()
{
    if (deliveryRadio.checked)
    {
        if (document.getElementById("deliveryDiv").value !== "" && document.getElementById("deliveryDiv").value !== null)
        {
            document.getElementById("order_final").style.display = "none";
            document.getElementById("loader").style.display = "block";
            setTimeout(function() {
                document.getElementById("loader").style.display = "none";
                document.getElementById("success_text").style.display = "block";

                localStorage.removeItem("orders");
                localStorage.removeItem("amount");
                localStorage.removeItem("total_prize");
                localStorage.removeItem("special");
                localStorage.removeItem("gluten-free");
                localStorage.removeItem("pizza");
                localStorage.removeItem("pohja");

                localStorage.setItem("total_amount", 0);
                document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
            }, 3000);
        }
        else
        {
            alert("Ole hyvä ja anna osoitteesi")
        }
    }
    else
    {
        document.getElementById("order_final").style.display = "none";
        document.getElementById("loader").style.display = "block";
        setTimeout(function() {
            document.getElementById("loader").style.display = "none";
            document.getElementById("success_text").style.display = "block";

            localStorage.removeItem("orders");
            localStorage.removeItem("amount");
            localStorage.removeItem("total_prize");
            localStorage.removeItem("special");
            localStorage.removeItem("gluten-free");
            localStorage.removeItem("pizza");
            localStorage.removeItem("pohja");

            localStorage.setItem("total_amount", 0);
            document.getElementById("amount_text").textContent = localStorage.getItem("total_amount");
        }, 3000);
    }
}