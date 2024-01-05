# FanHandler Arduino React

The FanHandler Arduino React project combines Arduino and React to create a system for controlling a fan. The Arduino board is responsible for adjusting the fan speed, while the React application provides a user-friendly interface to monitor and control the fan settings.

## Features

- Fan speed adjustment
- User-friendly interface
- Customizable settings
- Integration with Arduino and React

## Installation & Usage

To install and run the FanHandler Arduino React project, follow these steps:

1. Clone the repository to your local machine.
2. Open the project in VS Code.
3. Install the necessary extensions [PlatformIO](https://platformio.org/install/ide?install=vscode).
4. Await to install all libs.
5. Upload the code `(Platform IO -> Project Tasks -> esp32dev -> General -> Upload)`.
6. Upload the React Web App `(Platform IO -> Project Tasks -> esp32dev -> Platform -> Upload Filesystem Image)`.
    -   Once the code was upload to the esp32 the library `WiFiManager` take the control and create access point to connect a device to set the credentials of your wifi network.
    -   After completing the last task, you will be able to access the created server at the local IP shown on the serial monitor. 

For detailed installation instructions, please refer to the [documentation](https://github.com/jigonzalez930209/FanHandler-arduino-react/blob/main/README.md).

## Tegnologies
- PlatformIO IDE to handle esp32 project 
- Vite-React, TailwindCSS, shadcn-UI and Typescript to develop the front-end

## Contributing

Contributions to the FanHandler Arduino React project are welcome. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository. [-->>](https://github.com/jigonzalez930209/FanHandler-arduino-react/issues) 

## License

This project is licensed under the [GNU License](https://github.com/jigonzalez930209/FanHandler-arduino-react/blob/main/LICENSE).
