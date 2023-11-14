export default () => ({
    app: {
        port: parseInt(process.env.PORT, 10) || 3000,
    },
    database: {
        url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}:${process.env.DB_PORT}`,
        dbname: `${process.env.DB_NAME}`, 
        test: `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
    }
});