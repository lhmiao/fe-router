let nav = document.querySelector('nav');
let routerView = document.querySelector('.router-view');

class Router {
  constructor () {
    this.routes = {};
    this.currentURL = '';
    this.reflesh = this.reflesh.bind(this);
    window.addEventListener('load', this.reflesh);
    window.addEventListener('popstate', this.reflesh);
    nav.addEventListener('click', e => {
      if (e.target.id === 'pre') {
        this.back();
      } else if (e.target.id === 'next') {
        this.forward();
      } else {
        this.push(e.target.dataset.path);
      }
    });
  }

  addRoute (path, callback) {
    this.routes[path] = callback || function () {};
  }

  push (path) {
    history.pushState(null, null, path);
    this.reflesh();
  }

  back () {
    history.back();
  }

  forward () {
    history.forward();
  }

  replace (path) {
    history.replaceState(null, null, path);
    this.reflesh();
  }

  reflesh () {
    let currentURL = location.pathname || '/';
    this.routes[currentURL] && this.routes[currentURL]();
  } 
}

let router = new Router();

router.addRoute('/', () => {
  routerView.innerHTML = '<p>这是首页</p>';
});

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
