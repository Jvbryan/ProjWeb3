if (localStorage.getItem('usuario') != null) {
    axios.get('/usuario_logado')
        .then(function (response) {
            //console.log(response);
            window.location.href = "/";
        })
        .catch(function (error) {
            //console.log("caiu catch");
        });
}

const   email = document.querySelector('input[id=email]'),
        password = document.querySelector('input[id=password]'),
        confirmPassword = document.querySelector('input[id=confirmPassword]'),
        submit = document.querySelector('button[id=submitcad]');
var     container = "";

submit.addEventListener('click', async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    container.innerHTML = "";

    if (email.value.length < 3) {
        container = document.querySelector(".erroemail");    
        container.innerHTML = "Email inválido! - Muito curto!";
        return;
    }
    if (password.value.length < 3) {
        container = document.querySelector(".errosenha");    
        container.innerHTML = "Senha inválida! - Muito curta";
        return;
    }
    if (confirmPassword.value.length < 3) {
        container = document.querySelector(".erroconfsenha");
        container.innerHTML = "Senha inválida! - Muito curta!";
        return;
    }
    if (password.value != confirmPassword.value) {
        container = document.querySelector(".erroconfsenha");
        container.innerHTML = "As senhas não coincidem...";
        return;
    }
    try {
        const response = await axios.post('/usuario/cadastrar', {
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        });
        console.log(response);
        if (response.status == 200) {
            container = document.querySelector(".erroconfsenha");
            container.innerHTML = "CADASTRO COMPLETO!  REDIRECIONANDO...";
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(4000);
            window.location.href = "/";
        }
    } catch {
        //alert(e.response.data.message);
            container = document.querySelector(".erroconfsenha");
            container.innerHTML = "Erro!! Esse email já foi usado";
    }
    return false;
});

//Verifica se o campo Email tem menos de 3 caracteres - tempo real
document.getElementById("email").addEventListener(
    "keyup",
    (event) => {
        if (email.value.length < 3){
            container = document.querySelector(".erroemail");
            container.innerHTML = "Email inválido! - Muito curto!";
            return;
        }else{container.innerHTML = "";};
        },
    false
);

document.getElementById("password").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (password.value.length < 3){
        container = document.querySelector(".errosenha");
        container.innerHTML = "Senha inválida! - Muito curta!";
        }else{container.innerHTML = "";};
    },
    false
);

document.getElementById("confirmPassword").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (confirmPassword.value.length < 3) {
            container = document.querySelector(".erroconfsenha");
            container.innerHTML = "Senha inválida! - Muito curta!";
            return;
        }
        else if (password.value != confirmPassword.value){
            container = document.querySelector(".erroconfsenha");
            container.innerHTML = "As senhas não coincidem...";
            return;
        }else if (container.innerHTML = "");
    },
    false
);

