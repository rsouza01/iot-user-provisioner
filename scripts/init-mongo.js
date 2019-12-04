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
        _id: 1,
        email: 'useradmin@gmail.com',
        password: '123wer'
    },
    {
        _id: 2,
        email: 'useradmin2@gmail.com',
        password: '123wer'
    }
])