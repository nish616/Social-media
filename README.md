# Social media app

## Available Scripts  
### `npm start`
### `npm run dev` to run the project in develeopment mode  

## Environment Variables  
`DB_NAME` -> Database name    
`DB_USER` -> User name for database access  
`DB_PASSWORD` -> Password for database access  
`TOKEN_SECRET` -> A secret for token generation

## Routes
 **`/register`** to register a new user and get access token   
**`/login`** to login and get access token

**`/posts/newPost`** to create a new Post  
**`/posts/like/:id`** to register a like to a post. *id* here should be the post id  
**`/posts/comment/:id`** to register a like to a post. *id* here should be the post id


### **Important!!**  
Create a folder `images` in the root directory  
Add `key`: autorization, `value`: Bearer < access token here >  
To headers while making requests.

