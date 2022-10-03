"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalContext_1 = require("../../../../context/GlobalContext");
var react_ace_1 = require("react-ace");
require("ace-builds/src-noconflict/mode-json");
var CRUD_1 = require("../../../../util/CRUD");
var NewCVSectionForm_1 = require("./NewCVSectionForm");
var EditCVSectionForm_1 = require("./EditCVSectionForm");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var template2_schema_1 = require("../../../../constants/template2_schema");
require("tw-elements/dist/src/js/index");
var react_hot_toast_1 = require("react-hot-toast");
var microComponents_1 = require("../../../../components/microComponents");
var CVConstructorSection = function (_a) {
    var id = _a.id;
    var _b = (0, react_1.useContext)(GlobalContext_1.GlobalContext), setAppsData = _b.setAppsData, userPath = _b.userPath;
    var _c = (0, react_1.useState)([]), elements = _c[0], setElements = _c[1];
    // Todo find way to rerender after createDatabaseEntry without this entra state
    // perhaps use the usereducer hook
    var _d = (0, react_1.useState)(0), noElementsAdded = _d[0], setNoElementsAdded = _d[1];
    var _e = (0, react_1.useState)(0), noElementsClicked = _e[0], setNoElementsClicked = _e[1];
    var _f = (0, react_1.useState)('basics'), currentSection = _f[0], setCurrentSection = _f[1];
    var _g = (0, react_1.useState)([]), openJsonViewerArr = _g[0], setOpenJsonViewerArr = _g[1];
    // Handles clicks to elements in either used or unused components
    var elementToggleClickHandler = function (action, deleteComponentID) {
        // When unused element is clicked
        if (action === 'unused') {
            // If element is not already used
            if (!elements.filter(function (elem) { return elem.id === deleteComponentID; })[0]
                .application_id) {
                (0, CRUD_1.createDatabaseEntry)('INSERT INTO cv_component_in_application (application_id, component_id) VALUES (?,?)', [id, deleteComponentID], function (_a) {
                    var error = _a.error;
                    if (error)
                        console.error(error);
                    else
                        setNoElementsClicked(noElementsClicked + 1);
                });
            }
            // If element is already used, remove it
            else {
                (0, CRUD_1.deleteDatabaseEntry)('DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?', [id, deleteComponentID], function (_a) {
                    var error = _a.error;
                    if (error)
                        console.error(error);
                    else
                        setNoElementsClicked(noElementsClicked + 1);
                });
            }
        }
        // When used element is clicked
        else if (action === 'used') {
            (0, CRUD_1.deleteDatabaseEntry)('DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?', [id, deleteComponentID], function (_a) {
                var error = _a.error;
                if (error)
                    console.error(error);
                setNoElementsClicked(noElementsClicked + 1);
            });
        }
    };
    /**
     * delete component from cv_components table and cv_component_in_application if existis
     * @param {number} componentId
     */
    var elementDeleteClickHandler = function (componentId) {
        (0, CRUD_1.deleteDatabaseEntry)('DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?', [id, componentId], function (_a) {
            var error = _a.error;
            if (error)
                console.error(error);
            // TODO add a check to make sure that component deleted is not referenced by another application component
            else {
                (0, CRUD_1.deleteDatabaseEntry)('DELETE FROM cv_components WHERE id = ?', [componentId], function (_a) {
                    var error = _a.error;
                    if (error)
                        console.error(error);
                    else
                        setNoElementsClicked(noElementsClicked + 1);
                });
            }
        });
    };
    var elementClickHandler = function (componentId) {
        if (openJsonViewerArr.includes(componentId)) {
            setOpenJsonViewerArr(openJsonViewerArr.filter(function (elem) { return elem !== componentId; }));
        }
        else {
            setOpenJsonViewerArr([openJsonViewerArr, componentId]);
        }
    };
    var generatePdfParams = function (schemaLocal, elementsLocal) {
        var resumeObject = {};
        elementsLocal
            .filter(function (elem) { return elem.application_id; })
            .forEach(function (_a) {
            var cv_component_section = _a.cv_component_section, cv_component_text = _a.cv_component_text;
            if (schemaLocal[cv_component_section].constructor === Array) {
                if (resumeObject[cv_component_section]) {
                    resumeObject[cv_component_section].push(JSON.parse(cv_component_text));
                }
                else {
                    resumeObject[cv_component_section] = [
                        JSON.parse(cv_component_text),
                    ];
                }
            }
            else if (schemaLocal[cv_component_section].constructor === Object) {
                resumeObject[cv_component_section] = JSON.parse(cv_component_text);
            }
        });
        return {
            id: id,
            name: String(id),
            detailsObject: resumeObject
        };
    };
    var addCVSectionBuilderHandler = function (sectionObj, sectionDesc) {
        var dateString = new Date().toISOString();
        (0, CRUD_1.createDatabaseEntry)('INSERT INTO cv_components (cv_component_section, cv_component_text, cv_component_description, date_created, date_modified) VALUES (?,?,?,?,?)', [
            sectionObj.section,
            JSON.stringify(sectionObj[sectionObj.section], null, 2),
            sectionDesc,
            dateString, dateString
        ], function (_a) {
            var error = _a.error;
            if (error)
                console.error(error);
        });
        setNoElementsAdded(noElementsAdded + 1);
    };
    var editCVSectionBuilderHandler = function (sectionObj, sectionDesc, id) {
        (0, CRUD_1.updateDatabaseEntry)('UPDATE cv_components SET cv_component_text=?, cv_component_description=?, date_modified=? WHERE id=?', [
            JSON.stringify(sectionObj[sectionObj.section], null, 2),
            sectionDesc,
            new Date().toISOString(),
            id,
        ], function (_a) {
            var error = _a.error;
            if (error)
                console.error(error);
        });
        setNoElementsAdded(noElementsAdded + 1);
    };
    var generatePdf = function () {
        if (elements.filter(function (elem) { return elem.application_id; }).length === 0) {
            console.error('Select CV elements before generating document!');
            react_hot_toast_1.toast.error('Error: Select CV elements before generating document');
            return;
        }
        /**
         * Generate pdf in the background
         */
        var getPdfPromise = window.electron.getPdf('generate-pdf', 'cv', generatePdfParams(template2_schema_1["default"], elements));
        getPdfPromise
            .then(function (relativeCVUrl) {
            (0, CRUD_1.updateDatabaseEntry)('UPDATE applications SET cv_url=? WHERE id=?', [relativeCVUrl, id], function (_a) {
                var error = _a.error;
                if (error)
                    console.error(error);
                (0, CRUD_1.readDatabaseEntry)('SELECT * FROM applications', null, function (_a) {
                    var error = _a.error, result = _a.result;
                    if (error)
                        console.error(error);
                    setAppsData(result);
                });
            });
        })["catch"](function (error) {
            console.error("PDF error: ".concat(error));
        });
        react_hot_toast_1.toast.promise(getPdfPromise, {
            loading: 'Loading',
            success: function (savePath) {
                return (<div className='flex'>
              <span className='grow'>
                Successfully generated CV PDF{' '}
                <microComponents_1.Button Icon={react_bootstrap_icons_1.Folder2Open} value='Open' onClick={openFileExplorer("".concat(userPath).concat(savePath))}/>
              </span>
              {/* <button onClick><XLg /></button> */}
            </div>);
            },
            error: 'Error generating CV PDF'
        }, {
            success: {
                duration: 10000
            }
        });
    };
    (0, react_1.useEffect)(function () {
        (0, CRUD_1.readDatabaseEntry)("SELECT cv_components.id, cv_components.date_created, cv_components.date_modified, cv_components.cv_component_section, cv_components.cv_component_text, cv_components.cv_component_description, cv_component_in_application.application_id\n      FROM cv_components \n      LEFT JOIN cv_component_in_application \n      ON cv_components.id = cv_component_in_application.component_id AND cv_component_in_application.application_id = ?", id, function (_a) {
            var error = _a.error, result = _a.result;
            if (error)
                console.error(error);
            setElements(result);
        });
    }, [noElementsAdded, noElementsClicked]);
    var getDescription = function (elem) {
        var _a, _b, _c, _d;
        var cv_component_description = elem.cv_component_description;
        var _e = JSON.parse(elem.cv_component_text), name = _e.name, text = _e.text, institution = _e.institution, organization = _e.organization, title = _e.title, language = _e.language;
        return cv_component_description !== ''
            ? cv_component_description
            : (_d = (_c = (_b = (_a = name !== null && name !== void 0 ? name : text) !== null && _a !== void 0 ? _a : institution) !== null && _b !== void 0 ? _b : organization) !== null && _c !== void 0 ? _c : title) !== null && _d !== void 0 ? _d : language;
    };
    var openFileExplorer = function (path) { };
    return (<div className='mb-2'>
      <div className='my-2 flex justify-between'>
        <h1 id='cv-contructor' className='text-lg font-bold'>
          CV constructor
        </h1>
        <microComponents_1.Button onClick={generatePdf} value='Generate CV Pdf'/>
      </div>
      <div className='flex flex-wrap gap-2'>
        <ul className='nav nav-tabs flex list-none flex-row flex-wrap border-b-0 pl-0' id='tabs-tab' role='tablist'>
          {Object.entries(template2_schema_1["default"])
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            return value !== 'unavailable';
        })
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<li key={key} onClick={function () { return setCurrentSection(key); }} className='nav-item' role='presentation'>
                <a href={"#tabs-".concat(key)} className={"".concat(key === currentSection && 'active bg-blue-50 shadow', " nav-link block rounded-t border-transparent px-6 py-3 text-xs font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent")} id={"tabs-".concat(key, "-tab")} data-bs-toggle='pill' data-bs-target={"#tabs-".concat(key)} role='tab' aria-controls={"tabs-".concat(key)} aria-selected='false'>
                  {key}
                </a>
              </li>
            // <li
            //   key={key}
            //   onClick={() => setCurrentSection(key)}
            //   className='underline hover:cursor-pointer hover:underline-offset-4'>
            //   {key}
            // </li>
            );
        })}
        </ul>
      </div>
      <div className='relative z-10 rounded-b bg-blue-50 p-2 shadow'>
        <div className='mb-2'>
          <h2 className='font-medium tracking-tight'>Used Components</h2>
          <div className='accordion' id='accordionBuilder'>
            {elements
            .filter(function (elem) {
            return elem.application_id &&
                elem.cv_component_section === currentSection;
        })
            .map(function (elem) { return (<div key={elem.id} className='accordion-item border border-gray-200 bg-white'>
                  <h2 className='accordion-header mb-0' id={"accordion_builder_header_".concat(elem.id)}>
                    <button className='accordion-button relative flex w-full items-center rounded-none border-0 bg-white py-2 px-4 text-left text-base text-gray-800 transition focus:outline-none' type='button' data-bs-toggle='collapse' data-bs-target={"#accordion_builder_collapse_".concat(elem.id)} aria-expanded='false' aria-controls={"#accordion_builder_collapse_".concat(elem.id)}>
                      {elem === null || elem === void 0 ? void 0 : elem.cv_component_description}
                    </button>
                  </h2>
                  <div id={"accordion_builder_collapse_".concat(elem.id)} className='collapse accordion-collapse' aria-labelledby={"accordion_builder_header_".concat(elem.id)} data-bs-parent='#accordionBuilder'>
                    <div className='accordion-body w-full'>
                      <EditCVSectionForm_1["default"] elementToggleClickHandler={elementToggleClickHandler} editSectionCallback={editCVSectionBuilderHandler} id={elem.id} currentSection={currentSection} currentDescriptionDatabase={elem.cv_component_description} currentFieldValuesDatabase={JSON.parse(elem.cv_component_text)}/>
                    </div>
                  </div>
                </div>); })}
          </div>
        </div>
        <div>
          <h2 className='font-medium tracking-tight'>Unused Components</h2>
          {elements.filter(function (elem) { return elem.cv_component_section === currentSection; }).length === 0 ? (<div className='mb-3 rounded-lg bg-yellow-100 py-5 px-4 text-base text-yellow-700' role='alert'>
              No entries available
            </div>) : (<div className='flex flex-col'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2 '>
                  <div className='overflow-hidden'>
                    <table className='min-w-full'>
                      <thead className='border-b bg-white '>
                        <tr className='text-left text-gray-700 '>
                          <th scope='col' className='w-10/12 px-4 py-2 font-normal'>
                            Description
                          </th>
                          <th scope='col' className='w-1/12 px-4 py-2 font-normal'>
                            Toggle
                          </th>
                          <th scope='col' className='w-1/12 px-4 py-2 font-normal'>
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {elements
                .filter(function (elem) {
                return elem.cv_component_section === currentSection;
            })
                .map(function (elem) { return (<react_1.Fragment key={elem.id}>
                              <tr className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'>
                                <td onClick={function () { return elementClickHandler(elem.id); }} className='w-7/12 whitespace-nowrap px-4 py-2 font-light text-gray-900'>
                                  {getDescription(elem)}
                                </td>
                                <td className='w-1/12 whitespace-nowrap px-4 py-2 font-light text-gray-900'>
                                  <button onClick={function () {
                    return elementToggleClickHandler('unused', elem.id);
                }} className='flex w-full items-center justify-center'>
                                    {elem.application_id ? (<react_bootstrap_icons_1.XCircleFill className='h-5 w-5 text-red-600'/>) : (<react_bootstrap_icons_1.PlusCircleFill className='h-5 w-5 text-green-600'/>)}
                                  </button>
                                </td>
                                <td className='w-1/12  whitespace-nowrap px-4 py-2 font-light text-gray-900'>
                                  <button onClick={function () {
                    return elementDeleteClickHandler(elem.id);
                }} className='flex w-full items-center justify-center'>
                                    <react_bootstrap_icons_1.TrashFill className='h-5 w-5 text-red-600'/>
                                  </button>
                                </td>
                              </tr>
                              {openJsonViewerArr.includes(elem.id) && (<tr>
                                  <td colSpan={'100%'}>
                                    <react_ace_1["default"] mode='json' width='100%' maxLines={15} value={elem.cv_component_text} readOnly={true}/>
                                  </td>
                                </tr>)}
                            </react_1.Fragment>); })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        <button type='button' data-mdb-ripple='true' data-mdb-ripple-color='light' data-bs-toggle='modal' data-bs-target='#newCVSectionModal' className='my-2 ml-auto flex items-center rounded bg-purple-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg'>
          <react_bootstrap_icons_1.PlusLg className='mr-2 h-4 w-4'/>
          Add section
        </button>
      </div>
      <NewCVSectionForm_1["default"] addSectionCallback={addCVSectionBuilderHandler} currentSection={currentSection}/>
    </div>);
};
exports["default"] = CVConstructorSection;
//# sourceMappingURL=CVConstructorSection.js.map