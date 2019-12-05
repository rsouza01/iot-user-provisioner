db.createUser(
    {
        user: "iotuserdatabase-user",
        pwd: "iotuserdatabase-pwd",
        roles: [
            {
                role: "readWrite",
                db: "iot-user-database"
            }
        ]
    }
);

db.users.drop();
db.users.insertMany([
    {
        _id: 'c7b5c7fb-0701-4736-9d05-798f1eef5b54',
        email: 'useradmin@gmail.com',
        password: '123wer'
    }
])