import './index.scss'
import 'babel-polyfill'

var oLogin = document.getElementById("login")
oLogin.onclick = function (e) {
    e.preventDefault();
    window.location.href = "index.html"
}