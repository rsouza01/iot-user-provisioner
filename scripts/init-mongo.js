userDb = db.getSiblingDB('iot-user-db');


userDb.createUser(
    {
        user: "iot-user-provisioner",
        pwd: "iot-user-provisioner",
        roles: [
            "readWrite"
        ]
    }
);