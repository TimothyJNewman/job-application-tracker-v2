"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var entry_webpack_1 = require("react-pdf/dist/esm/entry.webpack");
var PdfDisplay = function (_a) {
    var url = _a.url, title = _a.title;
    var _b = (0, react_1.useState)(null), numPages = _b[0], setNumPages = _b[1];
    var _c = (0, react_1.useState)(1), pageNumber = _c[0], setPageNumber = _c[1];
    var onDocumentLoadSuccess = function (_a) {
        var numPages = _a.numPages;
        setNumPages(numPages);
    };
    var prevPagePagination = function () {
        if (pageNumber !== 1)
            setPageNumber(pageNumber - 1);
    };
    var nextPagePagination = function () {
        if (pageNumber !== numPages)
            setPageNumber(pageNumber + 1);
    };
    return (<div className='overflow-x-auto'>
      {title && (<h1 id='cv-pdf-viewer' className='my-2 text-xl font-bold'>
          {title}
        </h1>)}
      <entry_webpack_1.Document className='flex justify-center border-2' file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <entry_webpack_1.Page width={500} pageNumber={pageNumber}/>
      </entry_webpack_1.Document>
      <div className='my-2 flex justify-end'>
        <div className='flex'>
          <button onClick={prevPagePagination} data-mdb-ripple='true' data-mdb-ripple-color='light' className='flex h-8  w-8 items-center justify-center rounded bg-blue-700 text-white hover:bg-blue-500'>
            <react_bootstrap_icons_1.ChevronLeft />
          </button>
          <span className='p-1'>
            {pageNumber} of {numPages}
          </span>
          <button onClick={nextPagePagination} data-mdb-ripple='true' data-mdb-ripple-color='light' className='flex h-8  w-8 items-center justify-center rounded bg-blue-700 text-white hover:bg-blue-500'>
            <react_bootstrap_icons_1.ChevronRight />
          </button>
        </div>
      </div>
    </div>);
};
exports["default"] = PdfDisplay;
//# sourceMappingURL=PdfDisplay.js.map