import countapi from 'countapi-js';

countapi.visits().then((result) => {
    console.log("CountAPI visits:", result.value);
}).catch((err) => {
    console.error("CountAPI Error:", err);
});
