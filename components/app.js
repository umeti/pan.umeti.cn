import {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
}));

export default function App(props) {
  const classes = useStyles();
  let [uploading,setUploading] = useState(false)

  return (<ThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {gstat.user?"我的网盘":"登录"}
          </Typography>
          {gstat.user && (
          <Button color="inherit" onClick={()=>setUploading(true)}>上传</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
    <Container maxWidth="md">
      {props.children}
    </Container>
    <Upload open={uploading} handleClose={()=>{setUploading(false)}}/>
  </ThemeProvider>);
}

function Upload({open,handleClose}){
  let [file, setFile] = useState(null)
  let [name, setName] = useState("")
  return (<>
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">上传文件</DialogTitle>
      <DialogContent>
        <DialogContentText>

        </DialogContentText>
        <form action="http://storage.umeti.cn:8080/uploadi" enctype="multipart/form-data" onSubmit={(e)=>{ 
            e.preventDefault()
            api.upload(file,name)
              .then(res=>res.text())
              .catch((err) => alert(err))
              .then((data)=>{
                alert(data)
                
                api._fetchFiles()
              })
          }}>
          <input onChange={(e)=>{
            setFile(e.target.files[0])
            setName(e.target.files[0].name)
          }} type="file"  />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="文件名"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          type="text"
          fullWidth
        />
      <Button variant="contained" type="submit" fullWidth >开始上传</Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  </>)
}
