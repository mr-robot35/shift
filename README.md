# Django Shift Management Project
This is a shift management project.
I build this on Docker, so if you have installed Docker & docker-compose, you can easliy build.

![confirm](https://user-images.githubusercontent.com/72122101/129039696-06f691f1-c2b7-47a0-8fb6-be46257b42f3.png)

## Environment

|  | Version |
| ------ | ------ |
| Docker | 20.10.7 |
| docker-compose | 1.27.4 |
| Python | 3.9.6 |
| Django | 3.2.5 |
| MySQL | 8.0.26-0 |
| mysqlclient | 2.0.3 |
| Bootstrap | 5.1.0 |

## Tech

- Django
 Server-side framework.
- Docker docker-compose
 Container
- Bootstrap
 UI desigin. I'm not good at desiging...
- MySQL
 Data base. This is for a large data insted of sqlList.

## Installation

1. Clone my repository.
```sh
git clone git@github.com:nakanoi/shift.git
```
2. build on docker
```sh
docker-compose up --build -d
```
-**Below process is exactly same as usually django project.**
3. Migrate
```python
docker-compose run web python3 manage.py makemigrations
docker-compose run web python3 manage.py migrate
```
4. Run sercer
```python
docker-compose run web python3 manage.py runserver
```

## Usage
### Account & Shop
1. Create account & Log in. You need your email and name.
2. Create new shop or Join shop already exists.
When you create your own shop, you need shop's email, shop name and phone number. In this case, you will be it's owner.
On the other hand, you should have shop's ID or email which you want to join in.

### Shift Submission
1. Go  shift [submission page](http://127.0.0.1:8000/shift/submit/).
2. Click date field in calendar. Then, a form like below will show up. Put your working time in the form and click "ADD" button.
![form](https://user-images.githubusercontent.com/72122101/129044138-5889d3c3-9c66-49e1-a161-6f117f8aae83.png)
3. After adding your all shift forms, click blue "SUBMIT" button and the forms will be sent.

### OWNER
If you're an owner, you can (or should) confirm your employees' shift has benn sent.
1. Go  shift [confirmation page](http://127.0.0.1:8000/shift/confirm/).
2. Click a shift on calendar. Confirmation form like below will show up.
![confirm_form](https://user-images.githubusercontent.com/72122101/129045631-b2ed16a4-4493-4283-b414-f02ea88ba573.png)
3. If you confirm the shift, click "CONFIRM" button. Or if you don't accept it, click "DELETE" one.

### Other
- Go  shop [shop top page](http://127.0.0.1:8000/shop/). You can see your shop's information & your colleagues. ![shop_top](https://user-images.githubusercontent.com/72122101/129046641-a72cef7b-b169-4c5d-8503-7e4d5e6a6c46.png)
- Also you can see your account information. I'm sorry it's dreary...
![account_top](https://user-images.githubusercontent.com/72122101/129046799-e9b3f1ce-b5de-4d60-bfbf-32ee74b22525.png)

## License

MIT

**Thank you for seeing my repository!**