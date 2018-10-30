let pre = document.querySelector('.pre');
let next = document.querySelector('.next');
let routerView = document.querySelector('.router-view');

class Router {
  constructor () {
    this.routes = {};
    this.currentURL = '';
    this.reflesh = this.reflesh.bind(this);
    window.addEventListener('load', this.reflesh);
    window.addEventListener('hashchange', this.reflesh);
  }

  push (path) {
    location.hash = path;
    this.reflesh();
  }

  addRoute (path, callback) {
    this.routes[path] = callback || function () {};
  }

  reflesh () {
    this.currentURL = location.hash.slice(1) || '/';
    if (this.routes.hasOwnProperty(this.currentURL)) {
      this.routes[this.currentURL]();
    }
  }
}

let router = new Router();

router.addRoute('/a', () => {
  routerView.innerHTML = '<p>这是页面A</p>';
});

router.addRoute('/b', () => {
  routerView.innerHTML = '<p>这是页面B</p>';
});

router.addRoute('/c', () => {
  routerView.innerHTML = '<p>这是页面C</p>';
});

router.addRoute('/d', () => {
  routerView.innerHTML = '<p>这是页面D</p>';
});
