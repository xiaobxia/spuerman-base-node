/**
 * Created by xiaobxia on 2017/6/26.
 */
const shell = require('shelljs');
const commitMsg = process.argv[2];

shell.exec('git add .');
shell.exec(`git commit -m ${commitMsg}`);
shell.exec('git pull');
shell.exec('git push');