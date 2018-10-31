let pre = document.querySelector('#pre');
let next = document.querySelector('#next');
let routerView = document.querySelector('.router-view');

class Router {
  constructor () {
    this.routes = {};
    this.currentURL = '';
    this.history = [];
    this.currentIndex = this.history.length - 1;
    this.isBackOrForward = false;
    this.isReplace = false;
    this.reflesh = this.reflesh.bind(this);
    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
    window.addEventListener('load', this.reflesh);
    window.addEventListener('hashchange', this.reflesh);
    pre.addEventListener('click', this.back);
    next.addEventListener('click', this.forward);
  }

  push (path) {
    location.hash = path;
  }

  replace (path) {
    location.hash = path;
    this.isReplace = true;
  }

  addRoute (path, callback) {
    this.routes[path] = callback || function () {};
  }

  reflesh () {
    this.currentURL = location.hash.slice(1) || '/';
    if (this.isReplace) {
      this.history.splice(this.currentIndex, 1, this.currentURL);
      this.isReplace = false;
    } else if (this.isBackOrForward) {
      this.isBackOrForward = false;
    } else {
      this.history.push(this.currentURL);
      this.currentIndex = this.history.length - 1;
    }
    this.routes[this.currentURL] && this.routes[this.currentURL]();
  }

  back () {
    this.currentIndex && this.currentIndex--;
    this.isBackOrForward = true;
    location.hash = this.history[this.currentIndex] || '/';
  }

  forward () {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
    }
    this.isBackOrForward = true;
    location.hash = this.history[this.currentIndex];
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
