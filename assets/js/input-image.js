// image-input.js
const initializeImageInput = () => {
  const inputFile = document.querySelector('.imagem-input');
  const imagemPreview = document.querySelector('.imagem-preview');

  const textoImagem = 'imagem de referência';

  imagemPreview.innerHTML = textoImagem;

  inputFile.addEventListener('change', (event) => {
    const inputTarget = event.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const readerTarget = event.target;

        const img = document.createElement('img');
        img.src = readerTarget.result;
        img.classList.add('imagem-img');

        imagemPreview.innerHTML = '';

        imagemPreview.appendChild(img);
      });
      reader.readAsDataURL(file);
    } else {
      imagemPreview.innerHTML = textoImagem;
    }
  });
};

export { initializeImageInput };
