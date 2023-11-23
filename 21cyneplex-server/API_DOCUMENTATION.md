# Rest API Documentation
## _List of all endpoints:_

## POST /register
### Request:
- Body:
```json
{
    "username": "username",
    "email": "email",
    "password": "password",
}
```
### Response:
- (201 - Created)
```json
{
    "id": 1,
    "username": "username",
    "email": "email",
}
```
- (400 - Bad Request)
```json
{
    "message": "Username cannot be null"
}
OR
{
    "message": "Username is required"
}
OR
{
    "message": "Email cannot be null"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Password cannot be null"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Username already exists"
}
OR
{
    "message": "Email already exists"
}
OR
{
    "message": "Password must be between 8 and 32 characters"
}
```

## POST /login
### Request:
- Body:
```json
{
    "username": "username",
    "password": "password",
}
```
### Response:
- (200 - OK)
```json
{
  "access_token": "string"
}
```
- (400 - Bad Request)
```json
{
    "message": "Email and password is required"
}
```

## POST /googe_login
### Request:
- Body:
```json
{
    "google_token": "string",
}
```
### Response:
- (200 - OK or 201 - Created)
```json
{
  "access_token": "string"
}
```
- (400 - Bad Request)
```json
{
    "message": "No Google Token Provided"
}
```

## GET /movies/trending
### Request:
- Query Params: (optional)
```json
{
    "page": "number",
    "type": "string" ('all', 'movie', 'tv')
}
```
### Response:
- (200 - OK)
```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
            "id": 951491,
            "title": "Saw X",
            "original_language": "en",
            "original_title": "Saw X",
            "overview": "string",
            "poster_path": "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
            "media_type": "movie",
            "genre_ids": [
                27,
                53
            ],
            "popularity": 1469.177,
            "release_date": "2023-09-26",
            "video": false,
            "vote_average": 7.345,
            "vote_count": 309
        },
        ...,
    ],
    
    "total_pages": 1000,
    "total_results": 20000,
    "lastUpdate": "2023-10-23T19:02:36.973Z"
}
```
- (400 - Bad Request)
```json
{
    "message": "Invalid type"
}
```

## GET /movies/any
### Request:
- Query Params: (optional)
```json
{
    "page": "number",
    "type": "string" ('popular', 'top_rated', 'upcoming')
    "query": "string"
}
```
### Response:
- (200 - OK)
```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
            "id": 951491,
            "title": "Saw X",
            "original_language": "en",
            "original_title": "Saw X",
            "overview": "string",
            "poster_path": "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
            "media_type": "movie",
            "genre_ids": [
                27,
                53
            ],
            "popularity": 1469.177,
            "release_date": "2023-09-26",
            "video": false,
            "vote_average": 7.345,
            "vote_count": 309
        },
        ...,
    ],
    "total_pages": 1000,
    "total_results": 20000,
    "lastUpdate": "2023-10-23T19:02:36.973Z"
}
```
- (400 - Bad Request)
```json
{
    "message": "Invalid type"
}
```

## GET /tvshows/any
### Request:
- Query Params: (optional)
```json
{
    "page": "number",
    "type": "string" ('popular', 'top_rated', 'airing_today')
    "query": "string"
}
```
### Response:
- (200 - OK)
```json
{
    "page": 1,
    "results": [
        {
            "backdrop_path": "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
            "first_air_date": "2023-09-26",
            "genre_ids": [
                10759,
                10765
            ],
            "id": 951491,
            "name": "Saw X",
            "origin_country": [
                "US"
            ],
            "original_language": "en",
            "original_name": "Saw X",
            "overview": "string",
            "poster_path": "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
            "popularity": 1469.177,
            "vote_average": 7.345,
            "vote_count": 309
        },
        ...,
    ],
    "total_pages": 1000,
    "total_results": 20000,
    "lastUpdate": "2023-10-23T19:02:36.973Z"
}
```
- (400 - Bad Request)
```json
{
    "message": "Invalid type"
}
```

## GET /movies/now_playing
### Response:
- (200 - OK)
```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
            "id": 951491,
            "title": "Saw X",
            "original_language": "en",
            "original_title": "Saw X",
            "overview": "string",
            "poster_path": "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
            "media_type": "movie",
            "genre_ids": [
                27,
                53
            ],
            "popularity": 1469.177,
            "release_date": "2023-09-26",
            "video": false,
            "vote_average": 7.345,
            "vote_count": 309
        },
        ...,
    ],
    "total_pages": 1000,
    "total_results": 20000,
    "lastUpdate": "2023-10-23T19:02:36.973Z"
}
```

## GET /movies/detail/:id
### Request:
- Params:
```json
{
    "id": "number"
}
```
### Response:
- (200 - OK)
```json
{
    "adult": false,
    "backdrop_path": "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
    "id": 951491,
    "title": "Saw X",
    "original_language": "en",
    "original_title": "Saw X",
    "overview": "string",
    "poster_path": "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    "media_type": "movie",
    "genre_ids": [
        27,
        53
    ],
    "popularity": 1469.177,
    "release_date": "2023-09-26",
    "video": false,
    "vote_average": 7.345,
    "vote_count": 309
}
```

## Endpoints below need authentication
- Each and every request must have access_token in headers
```json
{
    "access_token": "string"
}
```


## POST /payment/generate
### Request:
- Body:
```json
{
    "MovieId": "number",
    "duration": "string", ('24 hours', '3 days', '5 days', '7 days')
}
```
### Response:
- (201 - Created)
```json
{
    "transactionToken": {
        "token": "string",
        "redirect_url": "string"
    }
}
```
- (400 - Bad Request)
```json
{
    "message": "Invalid duration"
}
OR
{
    "message": "MovieId is required"
}
OR
{
    "message": "You alredy rented this movie"
}
```

## PATCH /payment/success
### Request:
- Body:
```json
{
    "fraud_status": "string",
    "order_id": "string",
}
```
### Response:
- (200 - OK)
```json
{
    "message": "Payment verified"
}
```
- (400 - Bad Request)
```json
{
    "message": "Payment Failed"
}
```

## DELETE /user_rent/:id
### Request:
- Params:
```json
{
    "id": "number"
}
```
### Response:
- (200 - OK)
```json
{
    "message": "Rent deleted"
}
```
- (404 - Not Found)
```json
{
    "message": "Rent not found"
}
```

## GET /user_rent
### Response:
- (200 - OK)
```json
[
    {
        "id": 1,
        "UserId": 1,
        "MovieId": 1,
        "duration": "24 hours",
        "createdAt": "2021-08-23T19:02:36.973Z",
        "updatedAt": "2021-08-23T19:02:36.973Z",
        "Movie": {
            "id": 1,
            "title": "Saw X",
            "description": "string",
            "release_date": "2023-09-26",
            "duration": "string",
            "rating": 7.345,
            "price": 10000,
            "genre": "string",
            "trailer_url": "string",
            "poster_url": "string",
            "createdAt": "2021-08-23T19:02:36.973Z",
            "updatedAt": "2021-08-23T19:02:36.973Z"
        }
    },
    ...,
]
```

## POST /qrcode
### Request:
- body
```json
{
    "url": "string"
}
```
### Response:
- (200 - OK)
```json
{
    "qrCode": "svg"
}
```
- (400 - Bad Request)
```json
{
    "message": "Invalid URL for QR code"
}
```

## Global Error
- (500 - Internal Server Error)
```json
{
    "message": "Internal Server Error"
}
```
- (401 - Unauthorized)
```json
{
    "message": "Invalid email or password"
}
```
- (401 - Invalid Token)
```json
{
    "message": "Invalid Token"
}
OR
{
    "message": "Unauthorized"
}
```