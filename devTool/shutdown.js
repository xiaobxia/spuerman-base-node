/**
 * Created by xiaobxia on 2017/6/26.
 */
const shell = require('shelljs');
const port = process.argv[2];

shell.exec(`netstat -ano |findstr ${port}`, function (code, stdout, stderr) {
    let mainInfo = stdout.split('\r\n')[0];
    let pid = '';
    for (let k = mainInfo.length - 1; k >= 0; k--) {
        if(mainInfo.charAt(k)===' '){
            pid = mainInfo.slice(k+1);
            break;
        }
    }
    shell.exec(`tasklist|findstr ${pid}`, function (code, stdout, stderr){
        let mainPid = stdout.split('\r\n')[0];
        let softName = '';
        for(let k=0;k<mainPid.length;k++){
            if(mainPid.charAt(k)===' '){
                softName= mainPid.slice(0,k);
                break;
            }
        }
        shell.exec(`taskkill /f /t /im ${softName}`, function (code, stdout, stderr) {
            console.log('已解除端口占用');
        })
    })
})