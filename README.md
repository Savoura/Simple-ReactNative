# Simple ReactNative Project

This project showcases the development of a Simple React Native application.

## Project Overview

The Simple ReactNative project is a mobile application that provides a basic login and registration functionality along with a Todo list feature. It allows users to register, login, and manage their tasks by adding new todos. The application is built using React Native, a popular framework for developing cross-platform mobile applications.

## Project Setup

To run this project locally, please follow the steps below:

1. Clone the repository:
```
git clone https://github.com/Savoura/Simple-ReactNative.git
```
2. Navigate to the project directory:
```
cd Simple-ReactNative
```
3. Install dependencies for account service and frontend as well:
```
npm install
```
Create a `.env` file in the Account service directory and provide the necessary environment variables. Which will have the following.
```
DATABASE_URL="mongodb+srv://username:password@services.2qujmjq.mongodb.net/Accounts"
```
4. Run the account service
```
node start index.js
```

5. Run the frontend:
```
npm start
```



