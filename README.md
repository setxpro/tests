# API MS-EMAIL

## Participants

[<img src="https://avatars.githubusercontent.com/u/69186374?v=4" width="75px;"/>](https://github.com/setxpro)

[Patrick Anjos](https://github.com/setxpro)


## ✨ Features
- NodeJS
- Typescript

## How to install package
- Install dependencies 
`npm install`

## How to execute
`npm nun dev`

## Documentation

### Send Email

| Função        | Método | Endpoint       |           
| --------------| ------ | -------------- |
| **sentEmail**     | POST   | `/ms-email/sent/office`    |

| Campo               | Tipo                         |
| --------------------| ---------------------------- |
| **emailFrom**     | string(required)          |
| **emailTo**     | string[](required)          |
| **message**     | string(required)          |
| **cc**     | string[](required)          |
| **subject**     | string(required)          |
| **html**     | string(required)          |
| **filename64**     | string(optional)          |
| **content64**     | string(optional)          |

#### Example

```json
    POST
```

Request:
```json
{ 
	"emailFrom": "developerseven777@gmail.com", 
	"emailTo": ["patrickpqdt87289@gmail.com"], 
	"message": "Hello World!", 
	"cc": [""], 
	"subject": "BG-LOCAL", 
	"html": "<h1>TESTE PROD</h1>",
    "filename64": "base64.pdf",
    "content64": "base64"
}
  
```
Response:
```json
{ 
    "message": "E-mail enviado com sucesso!"
}
```
---