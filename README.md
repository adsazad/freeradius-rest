# REST API for freeradius under-development

## User

### List User
```
https://localhost:8080/user
```
Method: `POST`
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

### List UserGroups
```
https://localhost:8080/usergroup
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|

### Get UserGroup Check And Reply Attributes
```
https://localhost:8080/usergroup/attributes
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|
|usergroup| Name of UserGroup you want to get attributes of|
