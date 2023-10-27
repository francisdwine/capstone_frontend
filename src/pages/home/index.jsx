import React from "react";

// Wala pani heheh

const Home = () => {
    return (
            <div>
                <h1>Login Page</h1>
                <form>
                    <label>
                        Email:
                        <input type="email" name="email" />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
    );
};

export default Home;
