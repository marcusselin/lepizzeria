document.addEventListener("DOMContentLoaded", HandleEvent("check_log_status"));

function removeSpaces(input) {
    // Replace all spaces in the input value with an empty string
    input.value = input.value.replace(/\s/g, '');
    document.getElementById("errorText_A").style.display = "none";
    document.getElementById("errorText_B").style.display = "none";
  }

function HandleEvent(event) //eventHandler
{
    if (event === "log_in_attempt") //log in event-----------------------------------
    {
        // Get username and password
        var username = document.getElementById("username-field").value;
        var password = document.getElementById("password-field").value;

        //if username exists
        if (username in localStorage && localStorage.getItem(username) === password)
        {
            localStorage.setItem("logged_in", username);         
            window-location.replace("index.html");
        }
        else
        {
            document.getElementById("errorText_A").style.display = "block";
            document.getElementById("errorText_A").textContent = 'Virheellinen käyttäjänimi tai salasana';
        }
    }
    else if (event === "create-account")//------------------------------------------------
    {
        if (document.getElementById("new-username-field").value !== "" && document.getElementById("new-password-field").value !== "")
        {
            HandleEvent("save_account_data");
        }
        else
        {
            document.getElementById("errorText_B").style.display = "block";
            document.getElementById("errorText_B").textContent = 'Virheelliset tunnistetiedot';
        }
    }
    else if (event === "check_log_status")//---------------------------------------------
    {
        if ("logged_in" in localStorage)
        {
            if (localStorage.getItem("logged_in") !== "")
            {
                window-location.replace("index.html");
            }
        }
        document.getElementById("log-in-page").style.display = "block";
        document.getElementById("register-page").style.display = "none";
        document.getElementById("errorText_A").style.display = "none";
        document.getElementById("errorText_B").style.display = "none";
    }
    else if (event === "save_account_data") //save account data event-------------------------
    {
        // Get username and password
        var username = document.getElementById("new-username-field").value;
        var password = document.getElementById("new-password-field").value;

        //Save account data to localstorage
        if (username in localStorage)
        {
            document.getElementById("errorText_B").style.display = "block";
            document.getElementById("errorText_B").textContent = 'Käyttäjänimi on jo varattu';
            document.getElementById("new-username-field").value = "";
            document.getElementById("new-password-field").value = "";
        }
        else
        {
            localStorage.setItem(username, password);
            //set logged in;
            localStorage.setItem("logged_in", username);
            window-location.replace("index.html");
        }
    }
    else if (event === "switch_to_register")
    {
        document.getElementById("log-in-page").style.display = "none";
        document.getElementById("register-page").style.display = "block";
        document.getElementById("errorText_A").style.display = "none";
        document.getElementById("errorText_B").style.display = "none";
    }
    else if (event === "switch_to_login")
    {
        document.getElementById("log-in-page").style.display = "block";
        document.getElementById("register-page").style.display = "none";
        document.getElementById("errorText_A").style.display = "none";
        document.getElementById("errorText_B").style.display = "none";
    }
    else//if event is unkown--------------------------------------------------------------
    {
        document.write("Error 404_1 Unexpected unknown event call");
    }
}