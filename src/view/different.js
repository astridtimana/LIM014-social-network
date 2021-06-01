const viewError = () => {
  const viewDifferent = `
    <section class="page-404">

      <article class="container-404">
        <h2>the requested URL was not found on this server</h2>
        <h3>to go back to the main page, please click the button below </h3>
        <button class="buttonHome">Regresar</button>
      </article>

    </section>
  `;

  const articleElement = document.createElement('article');
  articleElement.innerHTML = viewDifferent;

  const goHome = articleElement.querySelector('.buttonHome');
  goHome.addEventListener('click', () => { window.location.hash = '#/'; });

  return articleElement;
};

export { viewError };
