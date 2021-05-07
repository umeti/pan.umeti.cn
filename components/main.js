import React,{useState,useEffect} from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import gstat from "lib/gstat"
import api from "lib/api"
import {humanReadableSize} from "lib/util"

export default function Main(props){
  let [uploading,setUploading] = useState(false)
  useEffect(()=>{
    gstat.set.appTitle("我的网盘")
    gstat.set.toolbar((<>
          <Button color="inherit" onClick={()=>setUploading(true)}>上传</Button>
    </>))
  },[])

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
    {Array.isArray(files)?(<FileList list={files}/>):""+files}


    <Upload open={uploading} handleClose={()=>{setUploading(false)}}/>
  </>)
}

function FileList({list}){
  return (<List>{list.map((f)=>{
      return (<FileItem  name={f.name} size={humanReadableSize(f.size)} url={api._getDownloadURL(f)} key={f.name} />)
      })}</List>)
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
