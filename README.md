# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

 Press i to test the app in iOS simulator with the expo go app 

The project took approximately 17hours. Tried in this approach to show the benefits of the hexagonal architecture. But due to time constraints, because i tried to follow the time you suggested to some extend, i couldn't clearly show its power. I had to use the session to handle all the functionality to save time and didn't separate all the entities that this app required (Transaction, User). Tried also to show the importance of structuring your base correctly, clear components with extensibility and reusability, some clean authorization handling(More things could be done to improve though). Things i would do if i had more time, properly create a theme, add more accessibility features, a lot more error handling and unit testing. I was going to write unit testing but due to an existing issue https://github.com/callstack/react-native-testing-library/issues/1769 i couldn't make the test suite in reasonable time to work. I also want to mention that i used AI in building some of the UI like the input component and for formatting and validation schemas. 