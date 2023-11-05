export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ynfwrf3.mongodb.net/?retryWrites=true&w=majority`
    }
  });