// input-imagem
// const inputFile = document.querySelector('.imagem-input')
// const imagemPreview = document.querySelector('.imagem-preview')

// const textoImagem = 'imagem de referência'

// imagemPreview.innerHTML = textoImagem

// inputFile.addEventListener('change', (event) => {
//   const inputTarget = event.target
//   const file = inputTarget.files[0]

//   if (file){
//     const reader = new FileReader()
//     reader.addEventListener('load', (event) =>{
//       const readerTarget = event.target

//       const img = document.createElement('img')
//       img.src = readerTarget.result
//       img.classList.add('imagem-img')
      
//       imagemPreview.innerHTML = ''

//       imagemPreview.appendChild(img)
//     })
//     reader.readAsDataURL(file)
//   } else{
//     imagemPreview.innerHTML = textoImagem
//   }
// })

// envio do formulario
const h1Cotacao = document.querySelector("h1");

const removerH1 = (h1) => {
  if (h1) {
    h1Cotacao.remove();
  }
}

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
    removerH1(h1Cotacao)
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
    removerH1(h1Cotacao)
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: `<h1 class='success'>Cotação enviada!</h1>`,
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();