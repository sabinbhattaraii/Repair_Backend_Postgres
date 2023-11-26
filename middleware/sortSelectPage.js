import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncError from './catchAsyncError.js'

let sortingFun = (_sort = "") => {

  let sort = "";
  if (_sort) {
    let _sortArr = _sort.split(",");
    sort = _sortArr.join(" ");
  } else {
    //let sort by default according to createdAt
    sort = "createdAt";
  }
  return sort;
  
};
let getExactPageData = (_brake, _page, _showAllData) => {
  //we know limit and skip required number so we have to convert them in number
  //and giving default value for limit and  page
  let limit = "";
  let skip = "";
  if (_showAllData !== "true") {
    //setting default value
    _brake = Number(_brake) || 10;
    _page = Number(_page) || 1;
    limit = `${_brake}`;
    skip = `${(_page - 1) * _brake}`;

  } else {
    limit = "";
    skip = "";
    //limit "" means show all document
    //skip "" means dont skip
  }
  let limitInfo = { limit: limit, skip: skip };
  return limitInfo;
  
};
let selectField = (_select) => {
 
  let _selectStr = "";
  if (_select) {
    let _selectArr = _select.split(",");
    _selectStr = _selectArr.join(" ");
  }
  return _selectStr;
};
export let sortFilterPagination = catchAsyncError(async (req, res) => {

  let find = req.find || {};
  let service = req.service;
  let myOwnSelect = req.myOwnSelect;
  let sort = sortingFun(req.query._sort);
  //for pagination
  let { limit, skip } = getExactPageData(
    req.query._brake,
    req.query._page,
    req.query._showAllData
  );
  //for select
  let select = "";
  if (!myOwnSelect) {
    //for user, admin, customer and other has (to hide password)
    //thus if there is no req.myOwnSelect then  use client select else use myOwnSelect
    select = selectField(req.query._select);
  } else {
    select = myOwnSelect;
  }
  //for search
  let results = await service({ find, sort, limit, skip, select });
  let totalDataInAPage = results.length;
  let totalResults = await service({
    find: {},
    sort: "",
    limit: "",
    skip: "",
    select: "",
  });
  let totalDataInWholePage = totalResults.length;
  let totalPage = Math.ceil(totalDataInWholePage / limit);
  let currentPage = req.query._page || 1;
  let hasPreviousPage = currentPage > 1;
  let hasNextPage = currentPage < totalPage;
  let data = {
    results,
    totalDataInAPage,
    totalDataInWholePage,
    currentPage,
    totalPage,
    hasPreviousPage,
    hasNextPage,
  };
  successResponseData({
    res,
    message: "Read successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});