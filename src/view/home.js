export default () => {
  const viewHome = `
    <h2 class=""> Holi </h2>
    <figure class="">
        <img class="" src="" alt="">
    </figure>
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewHome;
  return divElement;
};
