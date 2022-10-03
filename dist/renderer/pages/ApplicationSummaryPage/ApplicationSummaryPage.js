"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var NewApplicationForm_1 = require("./NewApplicationForm");
var DeleteComponentModal_1 = require("./DeleteComponentModal");
var CRUD_1 = require("../../util/CRUD");
var GlobalContext_1 = require("../../context/GlobalContext");
var react_table_1 = require("@tanstack/react-table");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var microComponents_1 = require("../../components/microComponents/");
var react_hot_toast_1 = require("react-hot-toast");
var columns = [
    // {
    //   accessorKey: 'id',
    //   header: 'Id',
    //   headerCellProps: {
    //     className: 'w-8',
    //   },
    //   bodyCellProps: {
    //     className: 'w-8',
    //   },
    // },
    {
        accessorKey: 'status',
        id: 'status_color',
        header: '',
        cell: function (info) {
            var color;
            switch (info.getValue()) {
                case 'Offer':
                    color = 'bg-green-500';
                    break;
                case 'Rejected':
                    color = 'bg-red-500';
                    break;
                case 'To apply':
                    color = 'bg-blue-500';
                    break;
                default:
                    color = 'bg-purple-500';
                    break;
            }
            return <div className={"h-5 w-1 ".concat(color)}></div>;
        },
        bodyCellProps: { className: 'pr-0 w-0.5' }
    },
    {
        accessorKey: 'company',
        header: 'Company'
    },
    {
        accessorKey: 'role',
        header: 'Role'
    },
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: function (info) {
            var str = info.getValue();
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    {
        id: 'documents',
        header: 'Docs',
        headerCellProps: {
            className: 'w-12'
        },
        bodyCellProps: {
            className: 'w-12 text-center'
        },
        cell: function (info) { return (<react_router_dom_1.Link type='button' to={"/application/".concat(info.row.original.id)} data-mdb-ripple='true' data-mdb-ripple-color='light' className='flex rounded bg-blue-600 p-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
        <react_bootstrap_icons_1.ArrowUpRightSquare className='mr-1'/>
        Open
      </react_router_dom_1.Link>); }
    },
];
var ApplicationSummaryPage = function () {
    var _a = (0, react_1.useContext)(GlobalContext_1.GlobalContext), appsData = _a.appsData, setAppsData = _a.setAppsData, userPath = _a.userPath, seasonValues = _a.seasonValues, currentSeason = _a.currentSeason;
    var _b = (0, react_1.useState)(false), deleteMode = _b[0], setDeleteMode = _b[1];
    var _c = (0, react_1.useState)({}), bsToggleContent = _c[0], setBSToggleContent = _c[1];
    var _d = (0, react_1.useState)({
        comapny: '',
        role: '',
        id: null
    }), deleteItemDetails = _d[0], setDeleteItemDetails = _d[1];
    var _e = (0, react_1.useState)(0), noItemsChanged = _e[0], setNoItemsChanged = _e[1];
    var table = (0, react_table_1.useReactTable)({
        data: appsData,
        columns: columns,
        sortDescFirst: false,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getSortedRowModel: (0, react_table_1.getSortedRowModel)()
    });
    (0, react_1.useEffect)(function () {
        (0, CRUD_1.readDatabaseEntry)('SELECT applications.*, seasons.season FROM applications LEFT JOIN seasons ON applications.season_id = seasons.id', null, function (_a) {
            var error = _a.error, result = _a.result;
            if (error)
                console.error(error);
            setAppsData(result);
        });
    }, [noItemsChanged]);
    (0, react_1.useEffect)(function () {
        if (deleteMode) {
            setBSToggleContent({
                'data-bs-toggle': 'modal',
                'data-bs-target': '#deleteModal'
            });
        }
        else {
            setBSToggleContent({});
        }
    }, [deleteMode]);
    var handleApplicationClick = function (id) {
        if (deleteMode) {
            var appDetails = appsData.find(function (elem) { return elem.id === id; });
            setDeleteItemDetails({
                company: appDetails.company,
                role: appDetails.role,
                id: id
            });
        }
    };
    var handleDeleteConfirmationCallback = function () {
        (0, CRUD_1.deleteDatabaseEntry)('DELETE FROM cv_component_in_application WHERE application_id=?', deleteItemDetails.id, function (_a) {
            var error = _a.error;
            if (error)
                console.error(error);
            (0, CRUD_1.deleteDatabaseEntry)('DELETE FROM applications WHERE id=?', deleteItemDetails.id, function (_a) {
                var error = _a.error;
                if (error)
                    console.error(error);
                setNoItemsChanged(noItemsChanged + 1);
            });
        });
    };
    var handleSubmitCallback = function (params) {
        var _a;
        var currentDate = new Date().toISOString();
        var seasonID = (_a = seasonValues.find(function (_a) {
            var season = _a.season;
            return season === currentSeason;
        })) === null || _a === void 0 ? void 0 : _a.id;
        if (seasonID === undefined) {
            react_hot_toast_1["default"].error('Error: No season selected. Go to settings.');
            return;
        }
        (0, CRUD_1.createDatabaseEntry)('INSERT INTO applications (company, role, job_description, status, link, priority, date_created, date_modified, season_id) VALUES (?,?,?,?,?,?,?,?,?)', [
            params.company,
            params.role,
            params.job_description,
            params.status,
            params.link,
            params.priority,
            currentDate,
            currentDate,
            seasonID,
        ], function (_a) {
            var error = _a.error;
            if (error)
                console.error(error);
            setNoItemsChanged(noItemsChanged + 1);
        });
    };
    var exportClickHandler = function () {
        var exportCsvPromise = window.electron
            .exportToCsv('export-to-csv', appsData)["catch"](function (error) {
            console.error(error);
        });
        react_hot_toast_1["default"].promise(exportCsvPromise, {
            loading: 'Loading',
            success: function (savePath) {
                return (<div className='flex'>
              <span className='grow'>
                Successfully exported to CSV{' '}
                <microComponents_1.Button Icon={react_bootstrap_icons_1.Folder2Open} value='Open' onClick={openFileExplorer("".concat(userPath).concat(savePath))}/>
              </span>
              {/* <button onClick><XLg /></button> */}
            </div>);
            },
            error: 'Error exporting CSV'
        }, {
            success: {
                duration: 10000
            }
        });
    };
    var openFileExplorer = function (path) { };
    return (<div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='inline w-fit text-xl font-bold tracking-tight'>
          All Applications
        </h1>
        <div className='flex gap-x-2'>
          <microComponents_1.Button Icon={react_bootstrap_icons_1.FiletypeCsv} value='Export' color='purple' onClick={exportClickHandler}/>
          <microComponents_1.Button Icon={react_bootstrap_icons_1.TrashFill} value='Delete' color='red' onClick={function () { return setDeleteMode(!deleteMode); }}/>
        </div>
      </div>
      {deleteMode ? (<p className='-mt-3 text-red-500'>Click on an item to delete 🡣</p>) : ('')}
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='border-b bg-white'>
                  {table.getHeaderGroups().map(function (headerGroup) { return (<tr key={headerGroup.id}>
                      {headerGroup.headers.map(function (header) {
                var _a, _b, _c;
                return (<th key={header.id} colSpan={header.colSpan} scope='col' className={"px-4 py-2 text-left font-medium text-gray-900 ".concat((_b = (_a = header.column.columnDef.headerCellProps) === null || _a === void 0 ? void 0 : _a.className) !== null && _b !== void 0 ? _b : '')}>
                          {header.isPlaceholder ? null : (<div {...{
                        className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                        onClick: header.column.getToggleSortingHandler()
                    }}>
                              {(0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext())}
                              {(_c = {
                            asc: (<react_bootstrap_icons_1.SortAlphaDown className='mb-1 ml-1 inline h-4 w-4'/>),
                            desc: (<react_bootstrap_icons_1.SortAlphaDownAlt className='mb-1 ml-1 inline h-4 w-4'/>)
                        }[header.column.getIsSorted()]) !== null && _c !== void 0 ? _c : null}
                            </div>)}
                        </th>);
            })}
                    </tr>); })}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(function (row) { return (<tr key={row.id} className={"".concat(deleteMode && 'cursor-pointer', " group border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100")} onClick={function () { return handleApplicationClick(row.original.id); }} {...bsToggleContent}>
                      {row.getVisibleCells().map(function (cell) {
                var _a, _b;
                return (<td key={cell.id} className={"whitespace-nowrap px-4 py-2 font-light text-gray-900 ".concat((_b = (_a = cell.column.columnDef.bodyCellProps) === null || _a === void 0 ? void 0 : _a.className) !== null && _b !== void 0 ? _b : '')}>
                          {(0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext())}
                        </td>);
            })}
                    </tr>); })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='my-2'>
        <microComponents_1.Button Icon={react_bootstrap_icons_1.PlusLg} color='blue' value='Add new' additionalAttributes={{
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addNewModal'
        }}/>
      </div>
      <NewApplicationForm_1["default"] handleSubmitCallback={handleSubmitCallback}/>
      <DeleteComponentModal_1["default"] handleSubmitCallback={handleDeleteConfirmationCallback} deleteApplicationName={"".concat(deleteItemDetails.role, " at ").concat(deleteItemDetails.company)}/>
    </div>);
};
exports["default"] = ApplicationSummaryPage;
//# sourceMappingURL=ApplicationSummaryPage.js.map