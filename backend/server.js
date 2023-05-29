const app = require('./app');
const PORT =  process.env.PORT || 4000;
const errorMiddleware = require('./middlewares/Error')

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.use(errorMiddleware);
