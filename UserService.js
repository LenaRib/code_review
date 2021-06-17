class UserService {
  //var username - создает глобальную переменную в классе
  //нужно создать свойство для экземпляра объекта.
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getUsername() {
    //return UserService.username; вызывает static username()
    return this.username;
  }

  get password() {
    throw 'You are not allowed to get password'; // при обращении к свойству password вернется ошибка
  }

  static authenticateUser(username, password) {
    const xhr = new XMLHttpRequest();
    xhr.setRequestHeader('Authorization', `${this.username} ${this.password}`);
    xhr.open(
      'POST', //вместо GET
      'https://examples.com/api/user/authentificate?username=' +
        this.username +
        '&password' +
        this.password,
      true
    );
    xhr.send(); //оправляет запрос
    xhr.responseType = 'json';
    //const result = false; неизменяемая переменная
    let result = false;

    /*можно использовать fetch
    fetch(url).then(function(response) {
        response.text().then(function(text) {
          poemDisplay.textContent = text;
        });
      }); */

    xhr.onload = function () {
      if (xhr.status === 200) {
        //status вернет не строку '200', а число
        result = true;
      } else {
        result = xhr.response;
      }
    };
    return result;
  }
}
// export UserService class для использования в index.html
export default UserService;

//index.html

$('#login').click(function () {
  //id уникален для документа
  var user = new UserService($('#username').val(), $('#password').val()); //берем значения полей ввода
  if (user !== null) {
    const userAuth = UserService.authenticateUser();
    if (userAuth) {
      document.location.href = '/home';
    } else {
      alert('Something went wrong'); //информация для пользователя
      console.log(userAuth.error); //информация для разработчика
    }
  }
});
