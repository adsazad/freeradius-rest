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

### Change User Password
```
https://localhost:8080/user/changepassword
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|
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

## IP Pool

### List IP Pools
```
https://localhost:8080/ippools
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|

### Add Ip Pool
```
https://localhost:8080/ippools
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|
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
|authusername| Daloradius username|
|authpassword| Daloradius password|

### Create NAS
```
https://localhost:8080/nas/create
```
Method: `POST`
|Attributes|Description|
|----------|------------|
|authusername| Daloradius username|
|authpassword| Daloradius password|
| nasname | IP Address of nas|
|secret| Secret|
| shortname| Short Name for the nas|
|type| Type attr for nas|
|ports| Ports for nas|
