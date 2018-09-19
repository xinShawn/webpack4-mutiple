import './index.scss';
import 'babel-polyfill';

var dom = document.createElement("p"),
    now = new Date();
dom.innerText = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}` ;
document.body.appendChild(dom);

let arr = [1, 2, 2, 1, 3, 4]
document.getElementById("demo").innerText = Array.from(new Set(arr)).join(",")