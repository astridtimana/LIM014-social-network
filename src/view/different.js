export default () => {
  const viewDifferent = `
      <h2 class=""> 404 - RUTA NO EXISTE </h2>
      <figure class="">
          <img class="" src="" alt="">
      </figure>
      `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewDifferent;
  return divElement;
};
