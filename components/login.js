import React,{useState,useEffect} from "react"
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import gstat from "lib/gstat"
import api from "lib/api"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      //margin: theme.spacing(1),
      margin: "5px",
    },
  },
}));
export default function Login(props){
  useEffect(()=>{
    gstat.set.appTitle("登录")
  },[])
  const classes = useStyles();
  let [userName,setUserName] = useState("")
  let [password,setPassword] = useState("")
  
  function login(e){
    e.preventDefault()
    api.login({user_name:userName,password:password},(data)=>{
        gstat.set.user(userName)
        gstat.set.userToken(data)
        localStorage.user = userName
        localStorage.userToken = data
    },(err)=>{
      gstat.set.user("")
      alert(err)
    })

  }
  function register(e){
    api.register({user_name:userName,password:password},(data)=>{
      alert("注册成功")
    },(err)=>{
      alert(err)
    })
  }
  return (<>
    <form className={classes.root} autoComplete="off" onSubmit={login}>
      <TextField id="user-name" label="用户名" value={userName} onChange={(e)=>setUserName(e.target.value)} fullWidth={true} />
      <TextField id="password" label="密码" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth={true} type="password"/>
      <Button variant="contained"  color="primary" type="submit">登录</Button>
      <Button variant="contained" onClick={register}>注册</Button>
    </form>

  </>)
}


export function logout(){
  gstat.set.user(null)
  gstat.set.userToken(null)
  localStorage.user = ""
  localStorage.userToken = ""
}
