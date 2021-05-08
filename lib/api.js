import gstat from "lib/gstat"

let base = 'https://storage.umeti.cn:8080/'
//base = 'http://localhost:8000/'

function post(path,body,onOk,onError){
  return fetch(base+path,{
    method: "POST",
    body: body,
  })
    .then((res)=>{
      if(res.status == 200){
        res.text().then(data => onOk(data))
      } else {
        res.text().then(data => onError(data))
      }
    })
    .catch((err) => {
      if(onError)
        onError(err)
    })
}

let api = {}

api.register = (params,onOk,onError)=>{
  post("register",
    JSON.stringify(params),
    onOk,
    onError
  )
}

api.login = (params,onOk,onError) => {
  post("login",
    JSON.stringify(params),
    onOk,
    onError
  ) 
}
api.ls = (user,token) =>{
  return fetch(base+"ls", {
    method: 'POST',
    body: JSON.stringify({user,token})
  })
}
api.upload = (file,name) => {
  let form = new FormData()
  form.append("user",gstat.user)
  form.append("token",gstat.userToken)
  form.append("file",file)
  form.append("name",name && file.name)
  return fetch(base+"upload",{
    method:"POST",
    body: form
  })
}

api._getDownloadURL = (file) => {
  return base+"download/"+encodeURIComponent(file.name)+"?key="+file.hash
}
export default api
