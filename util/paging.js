/**
 * Created by xiaobxia on 2017/7/5.
 */
module.exports = function (pageIndex, pageSize) {
    let pageIndexT = parseInt(pageIndex),
        pageSizeT = parseInt(pageSize),
        index = isNaN(pageIndexT)? 1: pageIndexT,
        size = isNaN(pageSizeT)? 10: pageSizeT;
    return {
        pageIndex: index,
        pageSize: size,
        start: (index-1)*size,
        offset: size
    }
};