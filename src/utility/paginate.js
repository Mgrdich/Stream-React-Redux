import _ from 'lodash';
export function paginate(items,pageNumber,pageSize){
    //we have to calcuate the starting index of the page
    const startIndex=(pageNumber-1)*pageSize;

   return _(items)
       .slice(startIndex)
       .take(pageSize)
       .value();

}