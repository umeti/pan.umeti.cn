import React,{useState,useEffect} from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import gstat from "lib/gstat"
import api from "lib/api"
import {humanReadableSize} from "lib/util"

export default function Main(props){
  let [files,setFiles] = useState("loading...")
  function fetchFiles(){
    if(!gstat.userToken){
      return 
    }
    api.ls(gstat.user,gstat.userToken)
      .then((res) => res.json())
      .catch((err) =>{setFiles(err)})
      .then((data) => {
        if(data.length == 0){
          setFiles("还没有任何文件")
        }else{
          setFiles(data)
        }
    })
  }

  api._fetchFiles = fetchFiles

  useEffect(()=>{
    fetchFiles()
  },[gstat.userToken])
  return (<>
    {Array.isArray(files)?(<List>{files.map((f)=>{
      return (<FileItem  name={f.name} size={humanReadableSize(f.size)} url={api._getDownloadURL(f)} key={f.name} />)
      })}</List>):""+files}
  </>)
}

function FileItem({name,size,url}){
  return (<>
    <ListItem>
      <ListItemText primary={name} secondary={size} />
      <ListItemSecondaryAction>
        <a href={url} download>下载</a>
      </ListItemSecondaryAction>
    </ListItem>
  </>)
}
