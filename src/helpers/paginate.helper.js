/**
*  this will  help to separate and display data in discrete pages when are many
* @param {Object} page which includes
* @param {Object} limit number of results returned in a SQL statement
* @returns {Object} return offset
*/
const Paginate = (page, limit) => {
  const verifiedPage = (!Number(page) || page <= 1) ? 1 : page;
  const offset = limit * (verifiedPage - 1);
  return offset;
};
export default Paginate;
