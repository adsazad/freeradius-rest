# Restful api for freeradius under-development

## User

### List User
```
https://localhost:8080/user
```
Method: `GET`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|

### Create User
```
https://localhost:8080/user/create
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|
|radusername | Username for user you are creating|
|radpassword| Password for user you are creating|
