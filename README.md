# MERN-E-Commerce-Frontend

MERN-E-Commerce-Frontend is the frontend of an e-commerce web application built with ReactJS,ContextAPI,React-router-dom

## Live Link

You can access the live application at [https://e-shopit.vercel.app/](https://e-shopit.vercel.app/).

## Features

- User authentication and authorization(JWT)
- Admin dashboard for managing products, orders, and users
- Payemnt Gateway
- Mail Service
- Forgot Password & Reset Password
- Product listing and search
- Product details and reviews
- Cart management
- Order history 


## Backend

The backend of the application is built with NodeJS and ExpressJS and uses a MongoDB database to store the product and user data. The source code for the backend can be found at [https://github.com/Saurabh-8585/MERN-E-Commerce-Backend](https://github.com/Saurabh-8585/MERN-E-Commerce-Backend).

## Tech Stack

- MongoDB
- ReactJS
- NodeJS
- ExpressJS

## Installation and Usage

To run the application on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Saurabh-8585/MERN-E-Commerce-Frontend
   ```

2. Install the dependencies:

   ```
   cd MERN-E-Commerce
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```
4. .env variables:

   ```
   REACT_APP_LOGIN
   REACT_APP_REGISTER
   REACT_APP_GET_USER_DETAILS
   REACT_APP_UPDATE_USER_DETAILS
   REACT_APP_DELETE_USER_DETAILS
   REACT_APP_FORGOT_PASSWORD
   REACT_APP_RESET_PASSWORD

   REACT_APP_FETCH_PRODUCT
   REACT_APP_SEARCH_PRODUCT
   REACT_APP_PRODUCT_TYPE
   REACT_APP_PRODUCT_TYPE_CATEGORY

   REACT_APP_GET_CART
   REACT_APP_DELETE_CART
   REACT_APP_ADD_CART

   REACT_APP_GET_WISHLIST
   REACT_APP_DELETE_WISHLIST
   REACT_APP_ADD_WISHLIST

   REACT_APP_GET_REVIEW
   REACT_APP_DELETE_REVIEW
   REACT_APP_ADD_REVIEW
   REACT_APP_EDIT_REVIEW

   REACT_APP_GET_KEY
   REACT_APP_GET_CHECKOUT  
   REACT_APP_GET_PAYMENTVERIFICATION
   REACT_APP_GET_PREVIOUS_ORDER

   REACT_APP_ADMIN_LOGIN
   REACT_APP_ADMIN_REGISTER

   REACT_APP_ADMIN_GET_ALL_USERS
   REACT_APP_ADMIN_GET_USER
   REACT_APP_ADMIN_GET_CART
   REACT_APP_ADMIN_GET_WISHLIST
   REACT_APP_ADMIN_GET_REVIEW
   REACT_APP_ADMIN_GET_CHART_DATA
   REACT_APP_ADMIN_GET_ORDER

   REACT_APP_ADMIN_ADD_PRODUCT   
   REACT_APP_ADMIN_UPDATE_PRODUCT

   REACT_APP_ADMIN_DELETE_REVIEW
   REACT_APP_ADMIN_DELETE_CART
   REACT_APP_ADMIN_DELETE_WISHLIST
   REACT_APP_ADMIN_DELETE_PRODUCT
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Contributing

Contributions to the project are welcome. If you find a bug or want to add a new feature, please create a new issue or pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
