import "bootstrap";
import "./index.scss";

'use strict';
const USER_NAME_KEY="user";

window.onload = () => {
  const form = document.querySelector("#login-form");

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // 本来のPOSTを打ち消す

    const req = new XMLHttpRequest();
    const action = document.querySelector("#login-form").action;

    req.addEventListener('load', function(){
      sessionStorage.setItem(USER_NAME_KEY, this.responseText);
      location.reload();
    });
    req.open('GET', action);
    req.send();
  });

  // sessionデータを見て、存在していればログアウトボタンにすり替える
  const userData = JSON.parse(sessionStorage.getItem(USER_NAME_KEY));
  if(userData) {
    const btnArea = document.querySelector("#loginBtnArea");
    btnArea.innerHTML = "<button class='nav-link ml-1'> <i class=\"fas fa-sign-out-alt\"></i> ログアウト</button>";
    // ログアウトの動作を行わせる
    btnArea.addEventListener('click', () => {
      // sessionを破棄する
      sessionStorage.removeItem(USER_NAME_KEY);
      // reload
      location.reload();
    });
    // usrNameを表示する
    const userNameArea = document.querySelector("#userName");
    userNameArea.textContent = userData.user_name;

  } else {
    console.log("なにもしない");
  }
};