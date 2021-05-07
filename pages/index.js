import React,{useState,useEffect} from "react"
import App from "comp/app"
import Login from "comp/login"
import Main from "comp/main"

import gstat from "lib/gstat"

export default function Root(props){
  gstat.add("user",useState(null))
  gstat.add("userToken",useState(null))

  useEffect(()=>{
    gstat.set.user(localStorage.user)
    gstat.set.userToken(localStorage.userToken)

  },[])

  let user = gstat.user
  return (<App title="">
    {user?(<Main />):(<Login />)}
  </App>)
}
