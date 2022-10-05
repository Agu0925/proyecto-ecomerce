//Paises
let urlpaises = "https://gist.githubusercontent.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/raw/107e0bdf27918adea625410af0d340e8fc1cd5bf/countries.json";
fetch(urlpaises)
.then((resp) => resp.json())
.then((datos) => {
    let paises = "";
    for (const iterator of datos.countries) {
        paises += `
            <option value="">${iterator.name_es}</option>
        `
        document.getElementById("pais").innerHTML =`<option value="" disabled selected hidden>Pais</option>` + paises
    }
})