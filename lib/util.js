

export function humanReadableSize(byte_num){
  let n = byte_num
  let unit = "B" 
  if(n > 1000){
    n /= 1024
    unit = "K"
  }
  if(n > 1000){
    n /= 1024
    unit = "M"
  }
  if(n > 1000){
    n /= 1024
    unit = "G"
  }
  
  if(n < 10){
    n = Math.floor(n*100)/100
  }
  else if(n < 100){
    n = Math.floor(n*10)/10
  }
  else {
    n = Math.floor(n)
  }

  return n+unit
}
