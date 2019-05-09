import sass from './css/style.css';
let a = 'dengzey';
document.getElementById('hot').innerHTML = a;
if (module.hot) {
  module.hot.accept();
}