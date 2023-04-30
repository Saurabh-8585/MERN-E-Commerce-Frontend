# MERN-E-Commerce-Frontend

MERN-E-Commerce-Frontend is the frontend of an e-commerce web application built with ReactJS ,Material UI, ContextAPI, React-router-dom

## Live Link

You can access the live application at [https://e-shopit.vercel.app/](https://e-shopit.vercel.app/).

## Features

- User authentication and authorization(JWT)
- Admin dashboard for managing products, orders, users and to show statistics
- Payemnt Gateway
- Mail Service
- Forgot Password & Reset Password
- Product listing and search
- Product details and reviews
- Cart management
- Order history

## Images

![Dashboard](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853694/Stat1_asehhd.png)
![Dashboard](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853694/Stat2_tw25cm.png)
![HomePage](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853694/Home_bcr44v.png)
![Products](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853695/Products_vxf8pr.png)
![Product](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853694/Product_tnba6w.png)
![Payment](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853693/Payment_xrucd9.png)
![Cart](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853693/Cart_zpzmwr.png)
![UserProfile](https://res.cloudinary.com/dxguqzge7/image/upload/v1682853694/User_lyfday.png)

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
   git clone https://github.com/Saurabh-8585/MERN-E-Commerce-Frontend.git
   ```

2. Install the dependencies:

   ```
   cd MERN-E-Commerce-Frontend
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Set up the environment variables by creating a `.env` file in the root directory and adding the following variables::

   ```
   REACT_APP_LOGIN=http://localhost:5000/api/auth/login
   REACT_APP_REGISTER=http://localhost:5000/api/auth/register
   REACT_APP_GET_USER_DETAILS=http://localhost:5000/api/auth/getuser
   REACT_APP_UPDATE_USER_DETAILS=http://localhost:5000/api/auth/updateuser
   REACT_APP_DELETE_USER_DETAILS=http://localhost:5000/api/auth/delete/user
   REACT_APP_FORGOT_PASSWORD=http://localhost:5000/api/password/forgot-password
   REACT_APP_RESET_PASSWORD=http://localhost:5000/api/password/reset/password
   REACT_APP_FETCH_PRODUCT=http://localhost:5000/api/product/fetchproduct
   REACT_APP_SEARCH_PRODUCT=http://localhost:5000/api/product/search
   REACT_APP_PRODUCT_TYPE=http://localhost:5000/api/product/fetchproduct/type
   REACT_APP_PRODUCT_TYPE_CATEGORY_=http://localhost:5000/api/product/fetchproduct/category
   REACT_APP_GET_CART=http://localhost:5000/api/cart/fetchcart
   REACT_APP_DELETE_CART=http://localhost:5000/api/cart/deletecart
   REACT_APP_ADD_CART=http://localhost:5000/api/cart/addcart
   REACT_APP_GET_WISHLIST=http://localhost:5000/api/wishlist/fetchwishlist
   REACT_APP_DELETE_WISHLIST=http://localhost:5000/api/wishlist/deletewishlist
   REACT_APP_ADD_WISHLIST=http://localhost:5000/api/wishlist/addwishlist
   REACT_APP_GET_REVIEW=http://localhost:5000/api/review/fetchreview
   REACT_APP_DELETE_REVIEW=http://localhost:5000/api/review/deletereview
   REACT_APP_ADD_REVIEW=http://localhost:5000/api/review/addreview
   REACT_APP_EDIT_REVIEW=http://localhost:5000/api/review/editreview
   REACT_APP_GET_KEY=http://localhost:5000/api/getkey
   REACT_APP_GET_CHECKOUT=http://localhost:5000/api/checkout
   REACT_APP_GET_PAYMENTVERIFICATION=http://localhost:5000/api/paymentverification
   REACT_APP_GET_PREVIOUS_ORDER=http://localhost:5000/api/getPreviousOrders
   REACT_APP_ADMIN_LOGIN=http://localhost:5000/api/admin/login
   REACT_APP_ADMIN_REGISTER=http://localhost:5000/api/admin/register
   REACT_APP_ADMIN_GET_ALL_USERS=http://localhost:5000/api/admin/getusers
   REACT_APP_ADMIN_GET_USER=http://localhost:5000/api/admin/geteuser
   REACT_APP_ADMIN_GET_CART=http://localhost:5000/api/admin/getcart
   REACT_APP_ADMIN_GET_WISHLIST=http://localhost:5000/api/admin/getwishlist
   REACT_APP_ADMIN_GET_REVIEW=http://localhost:5000/api/admin/getreview
   REACT_APP_ADMIN_GET_CHART_DATA=http://localhost:5000/api/admin/chartdata
   REACT_APP_ADMIN_GET_ORDER=http://localhost:5000/api/admin/getorder
   REACT_APP_ADMIN_ADD_PRODUCT=http://localhost:5000/api/admin/addproduct
   REACT_APP_ADMIN_UPDATE_PRODUCT=http://localhost:5000/api/admin/updateproduct
   REACT_APP_ADMIN_DELETE_REVIEW=http://localhost:5000/api/admin/review
   REACT_APP_ADMIN_DELETE_CART=http://localhost:5000/api/admin/usercart
   REACT_APP_ADMIN_DELETE_WISHLIST=http://localhost:5000/api/admin/userwishlist
   REACT_APP_ADMIN_DELETE_PRODUCT=http://localhost:5000/api/admin/deleteproduct
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Contributing

Contributions to the project are welcome. If you find a bug or want to add a new feature, please create a new issue or pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
