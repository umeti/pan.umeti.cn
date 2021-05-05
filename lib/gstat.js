/*

gstat()

 */
let gstat = {}
gstat.set = {}
gstat.add = function(name,hook){
  gstat[name] = hook[0]
  gstat.set[name] = hook[1]
  return hook
}

export default gstat
