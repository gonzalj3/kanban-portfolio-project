import React, { useState, useContext } from "react";

import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { authFetch } from "../helpers/authFetch";
import { DashboardContext } from "../context/dashboard/dashboard.provider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "45px",
    flexDirection: "row",
    alignItems: "center",
    background: "#759CFC",
    color: "white",
    boxShadow: "none",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    alignItems: "center",
    flexGrow: 2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    fontSize: "1.1rem"
  },
  root: {
    display: "flex",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const BoardBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { boards, selectedBoard } = useContext(DashboardContext);
  const selectBoard = (id) => {
    const idOfNewlySelectedBoard = new FormData();
    idOfNewlySelectedBoard.append("selectedBoard", id);
    const urlUpdatingUserSelectedBoard = "https://kanban-portfolio-project-backend.onrender.com/api/v1/user/update";
    authFetch(urlUpdatingUserSelectedBoard, {
      method: "PUT",
      body: idOfNewlySelectedBoard,
    })
      .then((res) => res.json())
      .then((dataOfUserUpdateSelectedBoard) => {
        window.location.replace("/");
      });
  };
  const handleDrawerOpen = () => {
    const url = "https://kanban-portfolio-project-backend.onrender.com/api/v1/boards/";

    authFetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const titles = {};
        for (let i = 0; i < data.boards.length; i += 1) {
          titles[data.boards[i]._id] = data.boards[i].title;
        }
        setOpen(true);
      });
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            {selectedBoard.title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        //variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {boards.map((board) => (
            <ListItem
              button
              key={board.title.toString()}
              idvalue={board._id}
              onClick={selectBoard.bind(this, board._id)}
            >
              <ListItemText primary={board.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              // Clear localStorage
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              
              // Force a complete page reload to login
              window.location.href = "/login";
            }}
          >
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default BoardBar;
