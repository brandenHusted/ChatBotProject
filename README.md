# ChatBotProject
Uses Node v22.2.0

You can change your version of node here: https://nodejs.org/en/download/prebuilt-installer/current

Use
npm install to install all dependences

If you get this error
ExpoMetroConfig.loadAsync is not a function
TypeError: ExpoMetroConfig.loadAsync is not a function
    at runMetroDevServerAsync (C:\Users\state\AppData\Roaming\npm\node_modules\expo-cli\node_modules\@expo\dev-server\src\MetroDevServer.ts:86:45)
    at startDevServerAsync (C:\Users\state\AppData\Roaming\npm\node_modules\expo-cli\node_modules\xdl\src\start\startDevServerAsync.ts:75:77)
    at startAsync (C:\Users\state\AppData\Roaming\npm\node_modules\expo-cli\node_modules\xdl\src\start\startAsync.ts:84:41)
Do this:
npm install @expo/config@8.1.1
>> npm install @expo/metro-config@0.10.0

npx expo start

Thank me later

npm install react-native@latest
to update react

