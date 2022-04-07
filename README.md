# REST API for freeradius under-development

## User

### List User
```
https://localhost:8080/user
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|

### Create User
```
https://localhost:8080/user/create
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|
|radusername | Username for user you are creating|
|radpassword| Password for user you are creating|

### Change User Password
```
https://localhost:8080/user/changepassword
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|
|radusername | Username for user you are creating|
|radnewpassword| Password for user you are creating|


## Profiles

### List UserGroups
```
https://localhost:8080/usergroup
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|

### Get UserGroup Check And Reply Attributes
```
https://localhost:8080/usergroup/attributes
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|
|usergroup| Name of UserGroup you want to get attributes of|

## IP Pool

### List IP Pools
```
https://localhost:8080/ippools
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|

### Add Ip Pool
```
https://localhost:8080/ippools/add
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|
|poolName| Pool Name|
|framedIpAddress| Ip address for pool|

## NAS

### List NAS
```
https://localhost:8080/nas
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|

### Create NAS
```
https://localhost:8080/nas/create
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|
| nasname | IP Address of nas|
|secret| Secret|
| shortname| Short Name for the nas|
|type| Type attr for nas|
|ports| Ports for nas|

### Delete NAS
```
https://localhost:8080/nas/delete
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|secret| .env secret|
| nasname | IP Address of nas|
