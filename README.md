## Stock Watchlist App

This README contains information surrounding the architecture decisions that I made when building this stock app.

## Running the Application

To launch the application, follow these steps:

1. **Build Docker Image**:

    ```bash
    make build
    ```

2. **Run the Client and Server**:

    ```bash
    make up
    ```

3. **Open the Web App**:

    ```bash
    make open-app
    ```

## Architecture

This application is built using a **React frontend** with **Vite** for bundling and an **Express backend** utilizing **tRPC** for type-safe API routes that improve development efficiency and reduce runtime errors.

### Future Enhancements

-   Add multiple authentication providers such as Google to provide more optionality for users
-   Charts to show historical stock prices to provide more information for users
-   Percentage change feature that allows users to see the change in price for a given stock since they added it to their watchlist
-   Pagination support to improve performance in a production environment with thousands of stocks
-   Mobile device and cross platform support for better accessibility
