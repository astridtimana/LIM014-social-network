export default () => {
  const viewFeed = `
      <h2 class=""> Holi Feed </h2>
      <figure class="">
          <img class="" src="" alt="">
      </figure>
      `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewFeed;
  return divElement;
};
