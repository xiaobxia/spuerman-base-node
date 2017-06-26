/**
 * Created by xiaobxia on 2017/6/26.
 */
function toSql(obj) {
    let sqlArr= [];
    for(let k in obj){
        if(obj.hasOwnProperty(k)){
            sqlArr.push(`${k}=${obj[k]}`);
        }
    }
    return sqlArr.join(',')
}

module.exports = {
    toSql: toSql
}
