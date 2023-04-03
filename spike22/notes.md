# Spike 22 Notes

## Password Encyption

- We're going to use a library called [**Bcrypt**](https://www.npmjs.com/package/bcrypt) to help us encrypt passwords. This means, that even though we can see the password property in our database, it will have been hashed into an unrecognizable code, keeping our user's data safe and private. 