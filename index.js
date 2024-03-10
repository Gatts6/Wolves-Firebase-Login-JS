// ==UserScript==
// @name         Oturum Açma
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Web sitesine otomatik oturum açma
// @author       You
// @match        https://www.wolvesville.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wolvesville.com
// @grant        none
// ==/UserScript==


(function() {
    var modal = null;
    var emailInput = null;
    var passwordInput = null;
    var isModalVisible = false;

    // E-posta ve şifre bilgilerini belirtin
    var email = "kullanici@email.com";
    var password = "sifre123";

    // "Giriş Yap" düğmesini ve e-posta ile şifre giriş alanlarını oluşturun
    function createLoginButton() {
        // "Giriş Yap" düğmesini özelleştirilmiş stil ile oluşturun
        var loginButton = document.createElement("button");
        loginButton.innerText = "Giriş Yap";
        loginButton.style.position = "fixed";
        loginButton.style.top = "10px";
        loginButton.style.right = "10px";
        loginButton.style.backgroundColor = "#0074d9";
        loginButton.style.color = "#fff";
        loginButton.style.padding = "10px 20px";
        loginButton.style.border = "none";
        loginButton.style.cursor = "pointer";
        loginButton.style.fontSize = "16px";

        // "Giriş Yap" düğmesine tıklandığında modal pencereyi göster veya gizle
        loginButton.addEventListener("click", function() {
            if (isModalVisible) {
                hideModal();
            } else {
                showModal();
            }
        });

        // Sayfaya "Giriş Yap" düğmesini ekleyin
        document.body.appendChild(loginButton);
    }


    
    function createModal() {
        modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "30px";
        modal.style.right = "10px";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "#fff";
        modal.style.padding = "20px";
        modal.style.border = "1px solid #ccc";
        modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        modal.style.zIndex = "1000";

        emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.value = email;
        emailInput.placeholder = "E-posta";

        passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.value = password;
        passwordInput.placeholder = "Şifre";

        var submitButton = document.createElement("button");
        submitButton.innerText = "Giriş Yap";
        submitButton.addEventListener("click", function() {
            var url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCH9qHx3eLCfXqodcKKBshE9BKfTLAioRo";
            
            var data = {
                email: emailInput.value,
                password: passwordInput.value,
                returnSecureToken: "true"
            };

            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("POST isteği başarıyla tamamlandı.");
                    console.log("Yanıt:", xhr.responseText);

                    var responseJSON = JSON.parse(xhr.responseText);
                    var idToken = responseJSON.idToken;

                    var authtokens = JSON.parse(localStorage.getItem("authtokens")) || {};

                    
                    authtokens.idToken = idToken;

                    
                    localStorage.setItem("authtokens", JSON.stringify(authtokens));

                    location.reload();
                } else {
                    console.error("POST isteği başarısız oldu. Status Code:", xhr.status);
                }
            };

            
            var veriJSON = JSON.stringify(data);
            xhr.send(veriJSON);
            
            hideModal();
        });

        modal.appendChild(emailInput);
        modal.appendChild(passwordInput);
        modal.appendChild(submitButton);

        document.body.appendChild(modal);
        isModalVisible = true;
    }

    // Modal pencereyi göster
    function showModal() {
        if (!modal) {
            createModal();
        }
        modal.style.display = "block";
    }

    // Modal pencereyi gizle
    function hideModal() {
        if (modal) {
            modal.style.display = "none";
        }
        isModalVisible = false;
    }

    // Özelleştirilmiş "Giriş Yap" düğmesini oluşturun
    createLoginButton();
})();
