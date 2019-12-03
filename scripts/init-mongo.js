db.createUser(
    {
        user: "iot-user-provisioner",
        pwd: "iot-user-provisioner",
        roles: [
            {
                role: "readWrite",
                db: "iot-user"
            }
        ]
    }
);