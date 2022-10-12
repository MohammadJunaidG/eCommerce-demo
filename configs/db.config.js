module.exports = {
    development : {
        database: "ecom",
        username: "root",
        password: "admin@123456",
        dialectInformation : {
            dialect : "mysql",
            host: "localhost"
        },
        pool : {
            min : 0,
            max : 5,
            acquire: 20000,
            idle: 2000
        }
    }
}