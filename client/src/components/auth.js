import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { authStyle } from "../themes/signup.style";
import { Link } from "react-router-dom";
import React from "react";

const AuthForm = (props) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const emailValidator = {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address",
    },
  };

  const passwordValidator = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password needs 8 characters at least",
    },
  };

  const classes = makeStyles(authStyle.form)();

  return (
    <Box
      component={"form"}
      className={classes.root}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Typography align={"center"} className={classes.title}>
        {props.title}
      </Typography>

      <FormHelperText error={true} className={classes.error}>
        {props.serverResponse}
        {errors.email && errors.email.message + ". "}
        {errors.password && errors.password.message}
      </FormHelperText>

      <TextField
        variant={"outlined"}
        type="text"
        label={props.input1}
        className={classes.input}
        {...register("email", emailValidator)}
        error={!!errors.email}
        // helperText={errors.email && errors.email.message}
      />

      <TextField
        variant={"outlined"}
        type="password"
        label={props.input2}
        className={classes.input}
        {...register("password", passwordValidator)}
        error={!!errors.password}
        // helperText={errors.password && errors.password.message}
      />

      <Button
        color={"primary"}
        className={classes.button}
        variant={"contained"}
        type={"submit"}
      >
        {" "}
        {props.submit}
      </Button>
    </Box>
  );
};

const RedirectDiv = (props) => {
  const AuthDivStyle = makeStyles(authStyle.div)();

  return (
    <Box component={"div"} className={AuthDivStyle.root}>
      <Typography className={AuthDivStyle.displayMsg}>{props.title}</Typography>
      <Link
        to={props.link}
        style={{ textDecoration: "none", color: "#039be5" }}
      >
        {props.desc}
      </Link>
    </Box>
  );
};

export { AuthForm, RedirectDiv };
