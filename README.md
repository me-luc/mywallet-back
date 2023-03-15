# MyWallet Endpoints

## SIGN IN

Allows a user to sign in to their account with their registered email and password. The request requires a JSON body with email and password fields, and the response returns a token that identifies the user.

### Request

`POST /sign-in/`
    
```json
{
  "email": "",
  "password": ""
}
```

### Request Body

- `email` (string, required): The user's already registered e-mail, must be a valid e-mail.
- `password` (string, required): The password chosen by the user while signing up.

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    7bf33b5f-a218-4439-bde9-3ae2ae2afa69
    
    
    
## SIGN IN

Allows a new user to sign up for a new account with their name, email, and password. The request requires a JSON body with name, email, password, and confirmPassword fields, and the response returns a token that identifies the user.

### Request

`POST /sign-up/`

```json
{
  "name": "",
  "email": "",
  "password": "",
  "confirmPassword": ""
}
```

### Request Body

- `name` (string, required): The full name of user.
- `email` (string, required): The user's e-mail, must be a valid e-mail.
- `password` (string, required): The password chosen by the user.
- `confirmPassword` (string, required): The confirmation of user password, both passwords must match.

### Response

    HTTP/1.1 201 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    7bf33b5f-a218-4439-bde9-3ae2ae2afa69
    
    
    
## SIGN OUT

allows a user to sign out of their account with their token. The request requires a JSON body with a token field, and the response returns an empty array.

### Request

`POST /sign-out/`

```json
{
  "token": ""
}
```

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    []
    
    
    
## ADD NEW CASHFLOW

Allows a user to add a new cashflow entry to their account with a description, price, and type (income or outcome). The request requires a JSON body with description, price, and type fields, and the response returns an empty array.

### Enum Definition

    type:
      type: string
      enum: [income, outcome]   

### Request

`POST /entries/`
    
```json    
{
  "description": "",
  "price": 10,
  "type": "income/outcome"
}
```

### Request Body

- `description` (string, required): A description of the cashflow.
- `price` (number, required): The amount of the cashflow.
- `type` (string, required): The type of the cashflow. Must be one of `income` or `outcome`.

### Response

    HTTP/1.1 201 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/

    []
    
    
    
## GET USER HISTORY

allows a user to get their entire cashflow history with their token. The request requires a JSON body with a token field, and the response returns an array of all cashflow entries associated with that user.

### Request

`GET /entries/`

```json
{
  "token": ""
}
```

### Request Body

- `token` (string, required): The token that identifies the user and is provided while signing in/up.

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    []    
