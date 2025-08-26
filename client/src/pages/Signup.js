import React, { useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AuthForm, RedirectDiv } from "../components/auth";
import { authStyle } from "../themes/signup.style";
import {
  fetchUserFailure,
  fetchUserSuccess,
  fetchUserRequest,
  setIsAuthenticated,
} from "../context/auth/auth.action";
import { useAuth } from "../context/auth/auth.provider";

const Signup = () => {
  console.log("=== SIGNUP COMPONENT RENDERED ===");
  
  const auth = useAuth();
  const { dispatchIsAuthenticated, dispatchUser } = auth;

  const [serverResponse, setServerResponse] = useState("");
  
  console.log("Signup component state:", { serverResponse });

  //Classes of CSS style
  const classes = makeStyles(authStyle)();

  //Callback for the form submission after validation
  const onSubmit = (values) => {
    console.log("=== FRONTEND REGISTRATION STARTED ===");
    console.log("Form values received:", values);
    
    const { email, password } = values;
    console.log("Extracted email and password:", { email, password: "***" });

    //Make a request to backend
    const url = "https://kanban-portfolio-project-backend.onrender.com/api/v1/auth/register";
    const requestBody = { email, password };
    console.log("Request URL:", url);
    console.log("Request body:", { ...requestBody, password: "***" });
    
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    
    console.log("Making fetch request...");
    fetch(url, options)
      .then((res) => {
        console.log("Response received, status:", res.status);
        console.log("Response headers:", res.headers);
        return res.json();
      })
      .then((res) => {
        console.log("Response data:", res);
        //If success to create a new account, redirect to login page
        if (!res.error) {
          console.log("Registration successful!");
          //Save data on local storage
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));

          //Update the state of Auth providers
          dispatchIsAuthenticated(setIsAuthenticated(true));
          dispatchUser(fetchUserSuccess(res.user));
          console.log("login successfully");

          //Redirect to dashboard
          window.location.replace("/");
        } else {
          console.log("Registration error from server:", res.error);
          throw Error(res.error);
        }
      })
      .catch((e) => {
        console.log("Registration catch block error:", e);
        console.log("Error message:", e.message);
        console.log("Full error object:", e);
        dispatchUser(fetchUserFailure(e.message));
        setServerResponse(e.message);
      });
  };
  const onDemoSubmit = () => {
    const { email, password } = {
      email: "test@test.com",
      password: "testtest",
    };

    setServerResponse("");

    //Make request to check whether the email and password are valid
    const url = "https://kanban-portfolio-project-backend.onrender.com/api/v1/auth/login"; //It is mock data, it will change when sever can provide auth api

    dispatchUser(fetchUserRequest());

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        //If success to create a new account, redirect to login page
        if (!res.error) {
          //Save data on local storage
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));

          //Update the state of Auth providers
          dispatchIsAuthenticated(setIsAuthenticated(true));
          dispatchUser(fetchUserSuccess(res.user));
          console.log("login successfully");

          //Redirect to dashboard
          window.location.replace("/");
        } else {
          throw Error(res.error);
        }
      })
      .catch((e) => {
        // console.log(e);
        dispatchUser(fetchUserFailure(e.message));
        setServerResponse(e.message);
      });
  };
  return (
    <Grid container className={classes.vh100}>
      <Grid item md={6} xs={12} className={classes.img}>
        {/*<img alt='' src={"/images/image1.png"} className={classes.img}/>*/}
      </Grid>
      <Grid item md={6} xs={12}>
        <AuthForm
          title="Sign up to Kanban"
          input1="Enter email"
          input2="Create Password"
          submit="Sign up"
          onSubmit={onSubmit}
          serverResponse={serverResponse}
        />
        <RedirectDiv
          title={"Already have an account?"}
          link={"/login"}
          desc={"Login"}
        />
        <Box className={classes.demoContainer} mt={3} mb={2}>
          <Typography className={classes.demoDescription}>
            Do not want to create an account. Click Below:
          </Typography>
        </Box>
        <Box className={classes.demoContainer}>
          <Button
            variant="contained"
            onClick={onDemoSubmit}
            className={classes.demoButton}
          >
            <Typography className={classes.demoDescription}>
              Try Demo!
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export { Signup };
