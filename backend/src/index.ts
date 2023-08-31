import App from './app';
import Config from './app/config/envConfig';
// This is the main entry point for the application.
App.start()
    .then(() => {
        console.log(`App started successfully. Running on ${Config.SERVICE_PORT}.`);
    })
    .catch(error => {
        console.error("Error starting the application:", error);
        process.exit(1); // Exit.
    });
