const { switchVersion } = require("./utils")
let [version] = process.argv.slice(2)
version = version || '2'
console.log('switch-admin-menu, version:', version)
if(version === '2') {
    switchVersion('2')
} else if(version === '2.7') {
    switchVersion('2.7')
} else if (version === '3') {
    switchVersion('3')
}