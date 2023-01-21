const { 
    addAnimal,
    getSpeciesRoute,
    getAnimalsRoute,
    getAnimalsOfSpecie,
    getAnimalRoute,
    toggleFavouriteRoute,
    getFavouritesRoute,
    editAnimalRoute,
    deleteAnimalRoute
} = require('./routes/animals.cjs');

const { 
    checkLogin, 
    loginRoute,
    logoutRoute,
    isConnected,
    registerRoute
} = require('./routes/authentication.cjs');


const express = require('express');
const cookieParser = require('cookie-parser');
const setup = require('./database/setup.cjs');
const multer = require("multer");
const cors = require('cors');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(checkLogin);
const upload = multer({ dest: `${__dirname}/public/animals` });

(async () =>{
    if(process.argv.indexOf("--init") != -1)
    {
        await setup();
    }


    /* ANIMALS */
    app.post('/animals', upload.array('images', 10), addAnimal);
    app.get('/animal', getAnimalsRoute);
    app.get('/animal/:slug', getAnimalRoute);
    app.post('/animal/edit', upload.array('images', 10), editAnimalRoute);
    app.post('/animal/favourite', toggleFavouriteRoute);
    app.get('/favourite', getFavouritesRoute);
    app.delete('/animal/:slug', deleteAnimalRoute);

    /* SPECIES */
    app.get('/species', getSpeciesRoute);
    app.get('/species/:specie', getAnimalsOfSpecie)
    
    /* AUTH */
    app.post('/login', loginRoute);
    app.post('/logout', logoutRoute);
    app.post('/register', registerRoute);
    app.get('/is_connected', isConnected);


    const port = process.env.PORT || 3001
    app.listen(port, () => console.log(`Server open on port: ${3001}`));

})();

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});