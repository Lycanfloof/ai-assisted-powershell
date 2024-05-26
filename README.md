### AI ASSISTED POWERSHELL MANAGER

This app lets you communicate with Gemini's API to generate and execute PowerShell code.

### REQUIREMENTS.

- Node Package Manager v10.8.0.

### SET-UP.

Execute this command to install the dependencies of the project:

```npm install```

Create a file called ```.env``` inside the root's folder. There you want to initialize Gemini's API Key by putting something like this:

```API_KEY=[PLACE YOUR API KEY HERE]```

If you want to disable the API and get a default response (for testing purposes), set the ```DISABLE_API``` inside ```.env``` to 1:

```DISABLE_API=1```

After that, you should be good to go. To execute the application, write this command:

```npm start --env-file=.env```