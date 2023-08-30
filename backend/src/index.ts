import App from './app';

// This is the main entry point for the application.
App.start()
    .then(() => {
        console.log(`App started successfully. Running in ${process.env.NODE_ENV} mode.`);
    })
    .catch(error => {
        console.error("Error starting the application:", error);
        process.exit(1); // Exit.
    });
