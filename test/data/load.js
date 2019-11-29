
mongo localhost/auth

db.createCollection('users')
db.users.insert({ name: 'New York', password: '123qwe' })
db.users.find()