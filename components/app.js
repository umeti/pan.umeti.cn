import {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';


import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blueGrey,brown } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import Image from 'next/image'


import gstat from 'lib/gstat'
import api from "lib/api"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: brown[700],
    },
  },
});



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  leftbar:{
    minWidth:"250px",
    maxWidth:"75vw",
    minHeight: "100%",
    position: "relative"
  },
  header:{
    height: "180px",
    backgroundColor: "#212121",
  },
  footer:{
    position: "absolute",
    bottom: 0,
    width: "100%",
    pidding: "5px"
  }
}));

export default function App(props) {
  gstat.add("appTitle",useState(""))
  gstat.add("toolbar",useState(""))

  let [leftbarOpen,setLeftbarOpen] = useState(false)

  const classes = useStyles();
  return (<ThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={()=>{
              setLeftbarOpen(true)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title || gstat.appTitle}
          </Typography>
          {gstat.toolbar}
        </Toolbar>
      </AppBar>
    </div>
    <Container maxWidth="md">
      {props.children}
    </Container>

    <Leftbar open={leftbarOpen} onClose={(e)=>{setLeftbarOpen(false)}}/>
  </ThemeProvider>);
}

import {logout} from "comp/login"
function Leftbar(props){
  const classes = useStyles()
  return (<>
    <SwipeableDrawer
      anchor="left"
      open={props.open}
      onClose={props.onClose}
    >
      <div className={classes.leftbar}>
        <Header />
        <List>
          <ListItem button>
            <ListItemIcon>
              <StorageRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="我的网盘" />
          </ListItem>
          <ListItem button onClick={()=>{logout()}}>
            <ListItemIcon>
              <PowerSettingsNewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="退出登录" />
          </ListItem>
        </List>
        <Footer />
      </div>
    </SwipeableDrawer>
  </>)
}

function Header(){
  let classes = useStyles()
  return (<header className={useStyles().header}>
    <div style={{
      height: "50%",
      position: "relative"
    }}>
      <img
        style={{
          maxHeight:'100%',
          maxWidth: "40%"
        }}
        src="/images/decore-left.png" 
      />
      <img
        style={{
          maxHeight:'100%',
          maxWidth: "40%",
          position: "absolute",
          right:0
        }}
        src="/images/decore-right.png" 
      />
      <Avatar style={{
        backgroundColor:"#4c4c4c",
        margin:"-20px auto 10px auto",
        width:"64px",
        height: "64px",
        }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
    </Avatar>
    <Typography style={{color:"#eeeeee"}} variant="h6" align="center">
      {gstat.user?"Hi, "+gstat.user:"未登录"}
    </Typography>



        {/*
      <Image width={225} height={116} src="/images/decore-left.png" />
      </div>
      <div className={classes.headerBGRight}>
      <Image  width={197} height={83} src="/images/decore-right.png" />
      */}
    </div>
  </header>)
}

function Footer(){
  let {footer} = useStyles()
  return (<footer className={footer}>
        <Typography variant="body2" align="center" color="textSecondary">
         © 2021 梦吉网盘
        </Typography>
  </footer>)
}
