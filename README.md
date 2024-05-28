### AI ASSISTED POWERSHELL MANAGER

This app lets you communicate with Gemini's API to generate and execute PowerShell code.

### REQUIREMENTS.

- Node Package Manager v10.8.0.

### SET-UP.

1. Execute this command to install the dependencies of the project:

    ```npm install```

2. Create a file called ```.env``` inside the root's folder. There you want to initialize Gemini's API Key by putting something like this:

    ```API_KEY=[PLACE YOUR API KEY HERE]```

3. If you want to disable the API for generation or remaking code, set the ```MAKE_DISABLE_API``` and ```REMAKE_DISABLE_API``` to any value you want inside ```.env```. This will enable direct code execution through the user input. For example:

    ```MAKE_DISABLE_API=1```
    ```REMAKE_DISABLE_API=1```

4. After that, you should be good to go. To execute the application, write this command:

    ```npm start --env-file=.env```