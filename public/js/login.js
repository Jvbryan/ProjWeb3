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


const email = document.querySelector('input[id=email]'),
    password = document.querySelector('input[id=password]'),
    submit = document.querySelector('button[id=submitlog]');
var container = ""; 
    //= document.querySelector(".erroemail");
    //(".errosenha");

//Realiza Login
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

    try {
        const response = await axios.post('/usuario/login', {
            email: email.value,
            password: password.value,
        });
        console.log(response);
        if (response.status == 200) {
            localStorage.setItem('usuario', response.data)
            window.location.href = "/views/index.html";
        }
    } catch {
        container = document.querySelector(".erroemail");
        container.innerHTML = "Email invalido! - Não existe";
        container = document.querySelector(".errosenha");
        container.innerHTML = "Senha incorreta!";
    }
    return false;
});

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
        if (password.value.length < 3){
            container = document.querySelector(".errosenha");    
            container.innerHTML = "Senha inválida! - Muito curta";
        }else{container.innerHTML = "";};
    },
    false
);
