# eCommerce-demo

**E-commerce Demo**
This is a simple E-commerce backend application. The application loads products a MySql database. 

**Getting Started**
To get started you can simply clone this ecommerce-demo repository and install the dependencies.

Clone the ecommerce-d
emo repository using git:

git clone https://github.com/ratracegrad/ecommerce-demo
cd ecommerce-demo
Install dependencies with this command:

npm install
Run the application with this command:

npm start
Tech Stack
AngularJS
Node.js
Express.js
Bootstrap

This project need the following external modules to run:
    "bcryptjs",
    "body-parser",
    "dotenv",
    "express",
    "jsonwebtoken",
    "mysql2",
    "sequelize"


This application has the following functionalities:

**1. A user can signUp and singIn with their username, emailId, password and roles as customer or admin.**
  
   API for signup: /ecomm/api/v1/auth/signup
   API for signip: /ecomm/api/v1/auth/signin

**2. Only Admin can create the new categories and products:**

    **APIs for product:**
        **To create:**   /ecomm/api/v1/categories
        **To update:**   /ecomm/api/v1/categories/:id
        **To findAll:**  /ecomm/api/v1/categories
        **To find one:** /ecomm/api/v1/categories/:id
        **To delete:**   /ecomm/api/v1/categories/:id
    
    **APIs for products:**
        **To create:**   /ecomm/api/v1/products
        **To update:**   /ecomm/api/v1/products/:id
        **To findAll:**  /ecomm/api/v1/products
        **To find one:** /ecomm/api/v1/products/:id
        **To delete:**   /ecomm/api/v1/products/:id

**3. Admin and customer both can create and update the cart:**

    **APIs for Cart:**
        **To create:**   /ecomm/api/v1/carts
        **To update:**   /ecomm/api/v1/carts/:id
        **To find:**  /ecomm/api/v1/carts
