# REST API для одностраничного приложения поиска фильмов

## Ссылка на домен API 
https://api.movies.kd.nomoredomains.work

## Стек
 - Node.js
 - Express
 - MongoDB
## Директории
/models – папка со схемами и моделями пользователя и карточки  
/routes — папка с файлами роутера  
/errors – папка с модулями ошибок  
/controllers – папка с контроллерами  
/middlewares – папка с мидлварами  
## Запуск проекта
### Для запуска проекта:

- Клонировать репозиторий
- Установить зависимости npm install
- Запустить проект npm start
- Проект запускается на http://localhost:3000/

## Запросы
### Регистрация
POST http://localhost:3000/signup

В теле запроса передать объект вида

{  
"email": "example@example.com",  
"password": "password",  
"name": "Имя"  
}  
✔️ При успехе в ответе приходит объект пользователя со статусом 201.

❌ При попытке создать пользователя с уже существующей в базе почтой приходит ответ со статусом 400 и сообщением Пользователь с таким email уже зарегистрирован.

❌ При попытке создать пользователя с некорректными данными приходит ответ со статусом 400 и ошибкой валидации.

###Авторизация
POST http://localhost:3000/signin

В теле запроса передать объект вида

{  
"email": "example@example.com",  
"password": "password"  
}  
✔️ При успехе приходит ответ c токеном.

❌ При неправильных почте и/или пароле приходит ответ со статусом 401 и сообщением Неправильные email или пароль.

### Редактирование информации по пользователе
PATCH http://localhost:3000/users/me

В теле запроса передать объект вида

{  
"name": "Имя",  
"email": "example@example.com",  
}  
✔️ При успехе в ответе приходит обновлённый объект пользователя со статусом 200.

❌ При попытке создать пользователя с некорректными данными приходит ответ со статусом 400 и ошибкой валидации.

### Добавление фильма
POST http://localhost:3000/movies

В теле запроса передать объект вида

{
"country": "some string",  
"director": "some string",  
"duration": some number,  
"year":"some string",  
"description":"some string",  
"image":"https://link.html",  
"trailerLink":"https://link.html",  
"nameRU":"some string",  
"nameEN":"some string",  
"thumbnail": "https://link.html",  
"movieId": "6216545b9a038b02fc9359fe"  
}  
✔️ При успехе в ответе приходит объект карточки со статусом 201.

❌ При попытке создать карточку с некорректными данными приходит ответ со статусом 400 и ошибкой валидации.

### Удаление фильма
DELETE http://localhost:3000/movies/:id  

✔️ При успехе в ответе приходит обновлённый объект карточки со статусом 200.

❌ При попытке удалить чужую карточку приходит ответ со статусом 403 и сообщением Недостаточно прав для выполнения операции.

❌ При повторной попытке удалить карточку или попытке удалить карточку с несуществующим в базе id приходит ответ со статусом 404 и сообщением Нет карточки с таким id.

❌ При попытке удалить карточку с некорректным id приходит ответ со статусом 400 и ошибкой валидации.
