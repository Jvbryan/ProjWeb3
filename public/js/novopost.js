if (localStorage.getItem('usuario') != null) {
    axios.get('/usuario_logado')
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (error) {
            //console.log("Erro");
            window.location.href = "/";
        });
}

const titulo = document.querySelector('input[name=titulo]'),
    categoria = document.querySelector('input[name=categoria]'),
    submit = document.querySelector('button[id=envijogo]'),
    container = document.querySelector(".errotit");

submit.addEventListener('click', async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    container.innerHTML = "";
    const formData = new FormData();
    const imagefile = document.querySelector("#thumbnail");
    formData.append("thumbnail", imagefile.files[0]);
    formData.append("titulo", titulo.value);
    formData.append("categoria", categoria.value);
    try {
        const response = await axios.post("/posts/novopost", formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
        //console.log(response);
        container.innerHTML = "Jogo cadastrado com sucesso!! Redirecionando...";
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(3500);
        window.location.href = "/";
    }
    catch (e) {
        console.log(e);
        apresentaErro(e.response.data.message + " Redirecionando...");
        if (e.response.status == 401) {
            window.location.href = "/";
        }
    }
    return false;
});
function apresentaErro(msg) {
    container.innerHTML = msg;
}