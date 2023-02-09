export default class Router {
  routes = {};

  add(routeName, href) {
    this.routes[routeName] = href;
  }

  router(event) {
    event = event || window.event;

    event.preventDefault();

    window.history.pushState({}, '', event.target);

    this.handle();
  }

  setBackground(page) {
    const body = document.body;
    body.removeAttribute('class');

    const thePageWasFound = page !== '404';
    if (thePageWasFound) {
      body.classList.add(page);
      return;
    }

    body.classList.add('home');
  }

  handle() {
    const { pathname } = window.location;

    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector('#app').innerHTML = html;
      });

    const currentPage = route.replace('./pages/', '').replace('.html', '');
    this.setBackground(currentPage);
  }
}
