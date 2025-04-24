/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startApp: () => (/* binding */ startApp)\n/* harmony export */ });\n/* harmony import */ var src_element_date_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/element_date/index */ \"./src/element_date/index.js\");\n/* harmony import */ var src_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/helpers */ \"./src/helpers.js\");\n/* harmony import */ var src_element_team_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/element_team/index */ \"./src/element_team/index.js\");\n/* harmony import */ var src_element_versions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/element_versions */ \"./src/element_versions/index.js\");\n/* harmony import */ var src_element_versions_last__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/element_versions_last */ \"./src/element_versions_last/index.js\");\n/* harmony import */ var src_block_header_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/block_header/index */ \"./src/block_header/index.js\");\n/* harmony import */ var src_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/constants */ \"./src/constants.js\");\n\n\n\n\n\n\n\n\nconst startApp = () => {\n  document\n    .getElementById(\"csvFile\")\n    .addEventListener(\"change\", function (event) {\n      const file = event.target.files[0];\n      const reader = new FileReader();\n\n      document.querySelector(\".input-file-text\").textContent = file.name;\n      // console.dir(event.target);\n      // console.dir(file.name);\n\n      reader.onload = function (e) {\n        const csvString = e.target.result;\n\n        const csvArray = csv_parse_sync.parse(csvString, {\n          delimiter: \"|\",\n        });\n\n        const csvHeader = csvArray.splice(0, 1)[0];\n\n        // !!! массив из тасок!!!\n        const reportDataItems = csvArray.map((item) => {\n          let result = new Object();\n\n          csvHeader.forEach((title, index) => {\n            result[title] =\n              result[title] == undefined\n                ? \"\" + index\n                : result[title] + \" \" + index;\n          });\n\n          return {\n            type: item[result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.type]],\n            status: item[result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.status]],\n            name: item[result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.name]],\n            affectedServices:\n              result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.affectedServices] == \"\"\n                ? []\n                : result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.affectedServices]\n                    .split(\" \")\n                    .map((el) => item[el])\n                    .filter((el) => el != \"\"),\n            taskID: item[result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.taskID]],\n            priority: item[result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.priority]],\n            version:\n              result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.version] == \"\"\n                ? []\n                : result[src_constants__WEBPACK_IMPORTED_MODULE_6__.headers.version]\n                    .split(\" \")\n                    .map((el) => item[el])\n                    .filter((el) => el != \"\"),\n          };\n        });\n\n        const versions = (0,src_helpers__WEBPACK_IMPORTED_MODULE_1__.getVersionsArr)(reportDataItems);\n\n        const stateVersions = {\n          activeVersion: \"\",\n          lastVersions: [],\n        };\n\n        (0,src_element_team_index__WEBPACK_IMPORTED_MODULE_2__.createAndRunTeam)();\n        (0,src_block_header_index__WEBPACK_IMPORTED_MODULE_5__.addHeaderBlock)(reportDataItems);\n        (0,src_element_versions__WEBPACK_IMPORTED_MODULE_3__.createAndRunVersionSelector)(reportDataItems, versions, stateVersions);\n        (0,src_element_versions_last__WEBPACK_IMPORTED_MODULE_4__.createAndRunLastVersionsSelector)(\n          reportDataItems,\n          versions,\n          stateVersions\n        );\n      };\n\n      reader.readAsText(file);\n    });\n};\n\n\n//# sourceURL=webpack://report_generate/./src/app.js?");

/***/ }),

/***/ "./src/block_affectedServices/index.js":
/*!*********************************************!*\
  !*** ./src/block_affectedServices/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAndRunAffectedServices: () => (/* binding */ createAndRunAffectedServices)\n/* harmony export */ });\n/* harmony import */ var src_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/helpers */ \"./src/helpers.js\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ \"./src/block_affectedServices/styles.scss\");\n\n\n\n// Функция уникальных значений затронутых сервисов\nconst getAffectedServices = (arr) => {\n  let result = [];\n  arr.forEach((el) => {\n    const count =\n      el.tasksActiveVersion.length +\n      Object.values(el.tasksLastVersion).reduce(\n        (acc, version) => acc + version.length,\n        0\n      );\n    if (count > 0) {\n      el.tasksActiveVersion.forEach((task) => {\n        result = result\n          .concat(task.affectedServices)\n          .filter((service) => service != \"\");\n      });\n      Object.values(el.tasksLastVersion)\n        .flat()\n        .forEach((task) => {\n          result = result\n            .concat(task.affectedServices)\n            .filter((service) => service != \"\");\n        });\n    }\n  });\n\n  return [...new Set(result)];\n};\n\nconst affectedServices = {\n  create: () => {\n    return document.querySelector(\".affectedServices_list\");\n  },\n  clean: (list) => {\n    [...list.children].forEach((i) => i.remove());\n  },\n  render: (data, list) => {\n    const uniqueArrayAffectedServices = getAffectedServices(data);\n    uniqueArrayAffectedServices.forEach((service) => {\n      const serviceTemplate = (0,src_helpers__WEBPACK_IMPORTED_MODULE_0__.getTemplateInstance)(\"#serviceTypeTemplate\");\n      const tmpService = serviceTemplate.querySelector(\".service\");\n\n      tmpService.textContent = `${service};`;\n      list.appendChild(serviceTemplate);\n    });\n  },\n};\n\n//функция отрисовки затронутых сервисов\nconst createAndRunAffectedServices = (data) => {\n  const affectedServicesList = affectedServices.create();\n  affectedServices.clean(affectedServicesList);\n  affectedServices.render(data, affectedServicesList);\n};\n\n\n//# sourceURL=webpack://report_generate/./src/block_affectedServices/index.js?");

/***/ }),

/***/ "./src/block_affectedServices/styles.scss":
/*!************************************************!*\
  !*** ./src/block_affectedServices/styles.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/block_affectedServices/styles.scss?");

/***/ }),

/***/ "./src/block_header/index.js":
/*!***********************************!*\
  !*** ./src/block_header/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addHeaderBlock: () => (/* binding */ addHeaderBlock)\n/* harmony export */ });\n/* harmony import */ var src_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/constants */ \"./src/constants.js\");\n/* harmony import */ var src_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/helpers */ \"./src/helpers.js\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ \"./src/block_header/styles.scss\");\n\n\n\n\n// функция для корректного окончания\nconst getEnding = (obj, total) => {\n  let num;\n\n  if (total > 100) {\n    num = total % 100;\n  } else if (total <= 20 && total >= 10) {\n    num = total;\n  } else if (total > 20) {\n    num = total % 10;\n  } else {\n    num = total;\n  }\n  return num == 1 ? obj[0] : num > 1 && num < 5 ? obj[1] : obj[2];\n};\n\n// функция для текста с кол-вом типов задач\nconst getTypes = (data) => {\n  return [\n    {\n      count: data.filter(\n        (item) =>\n          item.type == \"Задача\" ||\n          item.type == \"Подзадача\" ||\n          item.type == \"История\" ||\n          item.type == \"Эпик\" ||\n          item.type == \"Подзадача на разработку\"\n      ).length,\n      description: \"на разработку\",\n    },\n    {\n      count: data.filter(\n        (item) => item.type == \"Ошибка\" || item.type == \"Подзадача на ошибку\"\n      ).length,\n      description: \"на исправление багов\",\n    },\n    {\n      count: data.filter(\n        (item) => item.type == \"Дизайн\" || item.type == \"Подзадача на дизайн\"\n      ).length,\n      description: \"на дизайн\",\n    },\n  ];\n};\n\nconst addHeaderBlock = (data) => {\n  // вычисляем общее кол-во задач и правильное окончание\n  const total = data.length;\n  const endingTotal = getEnding(src_constants__WEBPACK_IMPORTED_MODULE_0__.endingList, total);\n\n  // вычисляем кол-во задач по типу\n  const types = getTypes(data);\n\n  // Добавляем общее кол-во задач с верным окончанием\n  document.querySelector(\".total_tasks\").textContent = `${total}`;\n  document.querySelector(\".ending\").textContent = `${endingTotal}`;\n\n  // Заполняем блок типами задач + кол-во\n  const listTypes = document.querySelector(\".list_types\");\n\n  types.forEach((type) => {\n    if (type.count > 0) {\n      const countTypeTemplate = (0,src_helpers__WEBPACK_IMPORTED_MODULE_1__.getTemplateInstance)(\"#countTypeTemplate\");\n      const tmpTypeCount = countTypeTemplate.querySelector(\".type_count\");\n      const tmpTypeTitle = countTypeTemplate.querySelector(\".type_title\");\n\n      tmpTypeCount.textContent = `${type.count}`;\n      tmpTypeTitle.textContent = `${type.description}`;\n\n      listTypes.appendChild(countTypeTemplate);\n    }\n  });\n};\n\n\n//# sourceURL=webpack://report_generate/./src/block_header/index.js?");

/***/ }),

/***/ "./src/block_header/styles.scss":
/*!**************************************!*\
  !*** ./src/block_header/styles.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/block_header/styles.scss?");

/***/ }),

/***/ "./src/block_section/index.js":
/*!************************************!*\
  !*** ./src/block_section/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAndRunSection: () => (/* binding */ createAndRunSection)\n/* harmony export */ });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/block_section/styles.scss\");\n/* harmony import */ var src_block_status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/block_status */ \"./src/block_status/index.js\");\n// import { stat } from \"fs\";\n\n\n\nconst getCount = (state, dataStatus) => {\n  if (state === \"prod\") {\n    return (\n      dataStatus.tasksActiveVersion.length +\n      Object.values(dataStatus.tasksLastVersion).reduce(\n        (acc, version) => acc + version.length,\n        0\n      )\n    );\n  } else {\n    return dataStatus.tasks.length;\n  }\n};\n\nconst section = {\n  create: (state) => {\n    return document.querySelector(\n      state == \"prod\" ? \".statuses_block__prod\" : \".statuses_block__backlog\"\n    );\n  },\n  clean: (section) => {\n    const parent = [...section.children];\n    for (let i = 1; i < parent.length; i++) {\n      parent[i].remove();\n    }\n  },\n  render: (state, arr, section) => {\n    arr.forEach((status) => {\n      const count = getCount(state, status);\n\n      if (count > 0) {\n        const statusTemplate = (0,src_block_status__WEBPACK_IMPORTED_MODULE_1__.createStatusBlock)(state, count, status);\n\n        section.appendChild(statusTemplate);\n      }\n    });\n  },\n};\n\nconst createAndRunSection = (state, data) => {\n  const sectionInstance = section.create(state);\n  section.clean(sectionInstance);\n  section.render(state, data, sectionInstance);\n};\n\n\n//# sourceURL=webpack://report_generate/./src/block_section/index.js?");

/***/ }),

/***/ "./src/block_section/styles.scss":
/*!***************************************!*\
  !*** ./src/block_section/styles.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/block_section/styles.scss?");

/***/ }),

/***/ "./src/block_status/index.js":
/*!***********************************!*\
  !*** ./src/block_status/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createStatusBlock: () => (/* binding */ createStatusBlock)\n/* harmony export */ });\n/* harmony import */ var src_element_mark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/element_mark */ \"./src/element_mark/index.js\");\n/* harmony import */ var src_block_tasksList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/block_tasksList */ \"./src/block_tasksList/index.js\");\n/* harmony import */ var src_helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/helpers.js */ \"./src/helpers.js\");\n\n\n\n\nconst createStatusBlock = (state, count, data) => {\n  const statusTemplate = (0,src_helpers_js__WEBPACK_IMPORTED_MODULE_2__.getTemplateInstance)(\"#statusTemplate\");\n\n  const activeVersionTemplate = statusTemplate.querySelector(\n    \".activeVersionsTasks\"\n  );\n\n  (0,src_element_mark__WEBPACK_IMPORTED_MODULE_0__.createMark)(statusTemplate, count, data.text, data.clname);\n\n  if (state === \"prod\") {\n    const lastVersionTemplate =\n      statusTemplate.querySelector(\".lastVersionsTasks\");\n\n    (0,src_block_tasksList__WEBPACK_IMPORTED_MODULE_1__.createListTasks)(activeVersionTemplate, data.tasksActiveVersion);\n\n    Object.entries(data.tasksLastVersion).forEach((version) => {\n      if (version[1].length > 0) {\n        const lastTasksTemplate = (0,src_helpers_js__WEBPACK_IMPORTED_MODULE_2__.getTemplateInstance)(\"#lastTasksTemplate\");\n        lastTasksTemplate.querySelector(\n          \".lastVersion_name\"\n        ).innerText = `в рамках релиза \"${version[0]}\"`;\n        (0,src_block_tasksList__WEBPACK_IMPORTED_MODULE_1__.createListTasks)(lastTasksTemplate, version[1]);\n        lastVersionTemplate.appendChild(lastTasksTemplate);\n      }\n    });\n  } else {\n    (0,src_block_tasksList__WEBPACK_IMPORTED_MODULE_1__.createListTasks)(activeVersionTemplate, data.tasks);\n  }\n\n  return statusTemplate;\n};\n\n// export const createStatusBlock = (\n//   count,\n//   text,\n//   clname,\n//   ActiveTasks,\n//   lastTasks\n// ) => {\n//   const statusTemplate = getTemplateInstance(\"#statusTemplate\");\n//   const lastTasksTemplate = getTemplateInstance(\"#lastTasksTemplate\");\n\n//   const activeVersionTemplate = statusTemplate.querySelector(\n//     \".activeVersionsTasks\"\n//   );\n//   const lastVersionTemplate =\n//     statusTemplate.querySelector(\".lastVersionsTasks\");\n\n//   createMark(statusTemplate, count, text, clname);\n//   createListTasks(activeVersionTemplate, ActiveTasks);\n//   createListTasks(lastTasksTemplate, lastTasks);\n\n//   return statusTemplate;\n// };\n\n\n//# sourceURL=webpack://report_generate/./src/block_status/index.js?");

/***/ }),

/***/ "./src/block_tasksList/index.js":
/*!**************************************!*\
  !*** ./src/block_tasksList/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createListTasks: () => (/* binding */ createListTasks)\n/* harmony export */ });\n/* harmony import */ var src_element_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/element_task */ \"./src/element_task/index.js\");\n\n\nconst createListTasks = (tmp, arr) => {\n  const tmpListTasks = tmp.querySelector(\".list_tasks\");\n\n  arr.forEach((task) => {\n    const taskTemplate = (0,src_element_task__WEBPACK_IMPORTED_MODULE_0__.createTask)(task);\n\n    tmpListTasks.appendChild(taskTemplate);\n  });\n\n  return tmpListTasks;\n};\n\n\n//# sourceURL=webpack://report_generate/./src/block_tasksList/index.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   endingList: () => (/* binding */ endingList),\n/* harmony export */   headers: () => (/* binding */ headers),\n/* harmony export */   icons: () => (/* binding */ icons)\n/* harmony export */ });\nconst icons = {\n  Эпик: \"🔨\",\n  История: \"🔨\",\n  Задача: \"🔨\",\n  Подзадача: \"🔨\",\n  Ошибка: \"🐞\",\n  Дизайн: \"🎨\",\n  \"Подзадача на ошибку\": \"🐞\",\n  \"Подзадача на дизайн\": \"🎨\",\n  \"Подзадача на разработку\": \"🔨\",\n};\n\nconst headers = {\n  type: \"Тип задачи\",\n  status: \"Статус\",\n  name: \"Тема\",\n  affectedServices: \"Пользовательское поле (Затронутые сервисы)\",\n  taskID: \"Ключ проблемы\",\n  priority: \"Приоритет\",\n  version: \"Исправить в версиях\",\n};\n\nconst endingList = [\"задачу\", \"задачи\", \"задач\"];\n\n\n//# sourceURL=webpack://report_generate/./src/constants.js?");

/***/ }),

/***/ "./src/element_date/index.js":
/*!***********************************!*\
  !*** ./src/element_date/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/element_date/styles.scss\");\n\n\nlet today = new Date();\nconst releaseDate = document.querySelector(\"#releaseDate\");\nconst dateControl = document.getElementById(\"date_field\");\nconst options = {\n  year: \"numeric\",\n  month: \"2-digit\",\n  day: \"2-digit\",\n  hour12: false,\n};\n\n// устанавливаем сегодняшнюю дату по умолчанию\ntoday.setDate(today.getDate());\nreleaseDate.textContent = today.toLocaleDateString(\"ru\", options);\n\n// Обработчик на изменение даты\ndateControl.addEventListener(\"input\", function (event) {\n  document.querySelector(\"#releaseDate\").textContent =\n    event.target.value.replace(/(\\d*)-(\\d*)-(\\d*)/, \"$3.$2.$1\");\n});\n\n\n//# sourceURL=webpack://report_generate/./src/element_date/index.js?");

/***/ }),

/***/ "./src/element_date/styles.scss":
/*!**************************************!*\
  !*** ./src/element_date/styles.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/element_date/styles.scss?");

/***/ }),

/***/ "./src/element_mark/index.js":
/*!***********************************!*\
  !*** ./src/element_mark/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createMark: () => (/* binding */ createMark)\n/* harmony export */ });\n// Функция создания шеврончика\n\nconst createMark = (tmp, count, text, clname) => {\n  const tmpCount = tmp.querySelector(\".count\");\n  tmpCount.textContent = count + \" \" + text;\n\n  tmpCount.classList.add(clname);\n};\n\n\n//# sourceURL=webpack://report_generate/./src/element_mark/index.js?");

/***/ }),

/***/ "./src/element_progress_bar/index.js":
/*!*******************************************!*\
  !*** ./src/element_progress_bar/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProgress: () => (/* binding */ addProgress)\n/* harmony export */ });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/element_progress_bar/styles.scss\");\n\n\nconst icons = [\n  { img: \"🚀\", isDefault: true },\n  { img: \"💔\", isDefault: false },\n  { img: \"🎅\", isDefault: false },\n];\n\nlet iconsDefault = icons.find((icon) => icon.isDefault === true).img;\n\nconst getProgress = (done, total) => {\n  const share = done / total;\n  const segments = Math.floor(share * 10);\n  const iconSegments = \"🀰\";\n\n  return {\n    start: iconSegments.repeat(segments) + iconsDefault,\n    finish:\n      iconSegments.repeat(10 - segments) +\n      \" \" +\n      Math.round(share * 1000) / 10 +\n      \"%\",\n  };\n};\n\n// функция для отрисовки прогресса\nconst addProgress = (arr, csvArray) => {\n  const total = csvArray.length;\n  const done = arr.reduce(\n    (acc, item) =>\n      acc +\n      item.tasksActiveVersion.length +\n      Object.values(item.tasksLastVersion).reduce(\n        (acc, version) => acc + version.length,\n        0\n      ),\n    0\n  );\n  document.querySelector(\".progress_start\").textContent = getProgress(\n    done,\n    total\n  ).start;\n  document.querySelector(\".progress_finish\").textContent = getProgress(\n    done,\n    total\n  ).finish;\n};\n\n\n//# sourceURL=webpack://report_generate/./src/element_progress_bar/index.js?");

/***/ }),

/***/ "./src/element_progress_bar/styles.scss":
/*!**********************************************!*\
  !*** ./src/element_progress_bar/styles.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/element_progress_bar/styles.scss?");

/***/ }),

/***/ "./src/element_task/index.js":
/*!***********************************!*\
  !*** ./src/element_task/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTask: () => (/* binding */ createTask)\n/* harmony export */ });\n/* harmony import */ var src_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/constants */ \"./src/constants.js\");\n/* harmony import */ var src_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/helpers */ \"./src/helpers.js\");\n\n\n\n// функция создания элемента - таска\nconst createTask = (task) => {\n  const taskTemplate = (0,src_helpers__WEBPACK_IMPORTED_MODULE_1__.getTemplateInstance)(\"#taskTemplate\");\n  const tmpTaskLink = taskTemplate.querySelector(\".task_link\");\n  const tmpIcon = taskTemplate.querySelector(\".icon\");\n  const tmpName = taskTemplate.querySelector(\".task_text\");\n\n  tmpTaskLink.setAttribute(\n    \"href\",\n    `https://jira.burgdev.ru/browse/${task.taskID}`\n  );\n  tmpTaskLink.setAttribute(\"target\", \"_blank\");\n  tmpIcon.textContent = src_constants__WEBPACK_IMPORTED_MODULE_0__.icons[task.type];\n  tmpName.textContent = task.taskID + \" \" + task.name;\n\n  return taskTemplate;\n};\n\n\n//# sourceURL=webpack://report_generate/./src/element_task/index.js?");

/***/ }),

/***/ "./src/element_team/index.js":
/*!***********************************!*\
  !*** ./src/element_team/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAndRunTeam: () => (/* binding */ createAndRunTeam)\n/* harmony export */ });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/element_team/styles.scss\");\n\n\nconst team = {\n  create: () => {\n    return {\n      element: document.querySelector(\".teamName\"),\n      default: \"Gallllery\",\n      other: \"Образовательные платформы\",\n    };\n  },\n  startEvents: (teamName) => {\n    const teamNameClasses = teamName.element.classList;\n    teamName.element.addEventListener(\"click\", () => {\n      const result = teamNameClasses.toggle(\"teamNameNew\");\n      teamName.element.textContent = `${\n        result ? teamName.other : teamName.default\n      }`;\n    });\n  },\n};\n\nconst createAndRunTeam = () => {\n  const teamName = team.create();\n  team.startEvents(teamName);\n};\n\n\n//# sourceURL=webpack://report_generate/./src/element_team/index.js?");

/***/ }),

/***/ "./src/element_team/styles.scss":
/*!**************************************!*\
  !*** ./src/element_team/styles.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/element_team/styles.scss?");

/***/ }),

/***/ "./src/element_versions/index.js":
/*!***************************************!*\
  !*** ./src/element_versions/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAndRunVersionSelector: () => (/* binding */ createAndRunVersionSelector),\n/* harmony export */   versionsSelector: () => (/* binding */ versionsSelector)\n/* harmony export */ });\n/* harmony import */ var src_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/helpers */ \"./src/helpers.js\");\n/* harmony import */ var src_updateReport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/updateReport */ \"./src/updateReport.js\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ \"./src/element_versions/styles.scss\");\n\n\n\n\nconst versionsSelector = {\n  create: () => {\n    return document.querySelector(\"select[name='selectVersions']\");\n  },\n  render: (selectVersions, versions) => {\n    // наполняем селект опциями версий\n    versions.forEach((version) => {\n      const selectVersionsTemplate = (0,src_helpers__WEBPACK_IMPORTED_MODULE_0__.getTemplateInstance)(\"#optionVersion\");\n      const tmpOption = selectVersionsTemplate.querySelector(\".option\");\n\n      tmpOption.textContent = `${version}`;\n      tmpOption.setAttribute(\"name\", `${version}`);\n\n      selectVersions.appendChild(selectVersionsTemplate);\n    });\n  },\n  startEvents: (selectVersions, data, state) => {\n    selectVersions.addEventListener(\"change\", function (event) {\n      state.activeVersion = event.target.value;\n\n      (0,src_updateReport__WEBPACK_IMPORTED_MODULE_1__.updateReport)(data, state);\n    });\n  },\n};\n\nconst createAndRunVersionSelector = (data, versions, state) => {\n  const vSelector = versionsSelector.create();\n  versionsSelector.render(vSelector, versions);\n  versionsSelector.startEvents(vSelector, data, state);\n};\n\n\n//# sourceURL=webpack://report_generate/./src/element_versions/index.js?");

/***/ }),

/***/ "./src/element_versions/styles.scss":
/*!******************************************!*\
  !*** ./src/element_versions/styles.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/element_versions/styles.scss?");

/***/ }),

/***/ "./src/element_versions_last/index.js":
/*!********************************************!*\
  !*** ./src/element_versions_last/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAndRunLastVersionsSelector: () => (/* binding */ createAndRunLastVersionsSelector)\n/* harmony export */ });\n/* harmony import */ var src_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/helpers */ \"./src/helpers.js\");\n/* harmony import */ var src_updateReport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/updateReport */ \"./src/updateReport.js\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ \"./src/element_versions_last/styles.scss\");\n\n\n\n\nconst lastVersionsSelector = {\n  create: () => {\n    return document.querySelector(\".lastVersions_list\");\n  },\n  render: (selectVersions, versions) => {\n    // наполняем селект опциями версий\n    versions.forEach((version) => {\n      const selectVersionsTemplate = (0,src_helpers__WEBPACK_IMPORTED_MODULE_0__.getTemplateInstance)(\"#optionLastVersion\");\n      const tmpOption =\n        selectVersionsTemplate.querySelector(\".lastVersions_text\");\n\n      tmpOption.textContent = version;\n\n      selectVersions.appendChild(selectVersionsTemplate);\n    });\n  },\n  startEvents: (data, state) => {\n    const selectBtn = document.querySelector(\".lastVersions_select-btn\");\n    const items = document.querySelectorAll(\".lastVersions_item\");\n\n    selectBtn.addEventListener(\"click\", () => {\n      selectBtn.classList.toggle(\"open\");\n    });\n\n    items.forEach((item) => {\n      item.addEventListener(\"click\", () => {\n        item.classList.toggle(\"checked\");\n        state.lastVersions = [];\n\n        let checked = document.querySelectorAll(\".checked\"),\n          btnText = document.querySelector(\".lastVersions_btn-text\");\n\n        if (checked && checked.length > 0) {\n          // btnText.innerText = \"\";\n          // checked.forEach((el) => {\n          //   btnText.innerText += el.innerText + \", \";\n          // });\n          checked.forEach((el) => {\n            state.lastVersions.push(el.innerText);\n          });\n          btnText.innerText = `выбрано ${checked.length}`;\n        } else {\n          btnText.innerText = \"прошлые релизы\";\n          state.lastVersions = [];\n        }\n        (0,src_updateReport__WEBPACK_IMPORTED_MODULE_1__.updateReport)(data, state);\n      });\n    });\n  },\n};\n\nconst createAndRunLastVersionsSelector = (data, versions, state) => {\n  const lvSelector = lastVersionsSelector.create();\n  lastVersionsSelector.render(lvSelector, versions);\n  lastVersionsSelector.startEvents(data, state);\n};\n\n// // объект версий прошедших в рамках спринта\n// let lastVersions = [];\n\n// const addInLastVersions = (item) => {\n//   lastVersions[item] = [];\n// };\n\n// const removeFromLastVersions = (item) => {\n//   delete lastVersions[item];\n// };\n\n\n//# sourceURL=webpack://report_generate/./src/element_versions_last/index.js?");

/***/ }),

/***/ "./src/element_versions_last/styles.scss":
/*!***********************************************!*\
  !*** ./src/element_versions_last/styles.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/element_versions_last/styles.scss?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getTemplateInstance: () => (/* binding */ getTemplateInstance),\n/* harmony export */   getVersionsArr: () => (/* binding */ getVersionsArr)\n/* harmony export */ });\n// функция клонирования tmp\nconst getTemplateInstance = (templateName) => {\n  const statusTemplate = document.querySelector(templateName);\n  return statusTemplate.content.cloneNode(true);\n};\n\n//функция массива уникальных значений версий\nconst getVersionsArr = (data) => {\n  const versions = data\n    .reduce((acc, task) => acc.concat(task.version), [])\n    .filter((item) => item != \"\");\n\n  return [...new Set(versions)];\n};\n\n\n//# sourceURL=webpack://report_generate/./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_styles_stylesInputRelise_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/styles/stylesInputRelise.scss */ \"./src/styles/stylesInputRelise.scss\");\n/* harmony import */ var src_styles_stylesInputFile_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/styles/stylesInputFile.scss */ \"./src/styles/stylesInputFile.scss\");\n/* harmony import */ var src_styles_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/styles/main.scss */ \"./src/styles/main.scss\");\n/* harmony import */ var src_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app */ \"./src/app.js\");\n\n\n\n\n\n\n(0,src_app__WEBPACK_IMPORTED_MODULE_3__.startApp)();\n\n\n//# sourceURL=webpack://report_generate/./src/index.js?");

/***/ }),

/***/ "./src/result.js":
/*!***********************!*\
  !*** ./src/result.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAndFillResult: () => (/* binding */ createAndFillResult)\n/* harmony export */ });\nconst isActive = (taskVersion, activeVersion) => {\n  return taskVersion.includes(activeVersion);\n};\n\nconst isLast = (taskVersion, lastVersions) => {\n  return lastVersions.includes(taskVersion[taskVersion.length - 1]);\n  // return lastVersions.some((v) => taskVersion.includes(v));\n};\n\nconst addResultActive = (task, sector) => {\n  if (task.status === \"Готово\" || task.status === \"Done (not dev)\") {\n    sector.done.tasksActiveVersion.push(task);\n  } else if (task.status == \"Tested\" || task.status == \"in release\") {\n    sector.tested.tasksActiveVersion.push(task);\n  } else if (task.status == \"Review\") {\n    sector.review.tasksActiveVersion.push(task);\n  } else {\n    sector.correction.tasksActiveVersion.push(task);\n  }\n};\n\nconst addResultLast = (task, sector) => {\n  const lvInTask = task.version[task.version.length - 1];\n  if (task.status === \"Готово\" || task.status === \"Done (not dev)\") {\n    sector.done.tasksLastVersion[lvInTask].push(task);\n  } else if (task.status == \"Tested\" || task.status == \"in release\") {\n    sector.tested.tasksLastVersion[lvInTask].push(task);\n  } else if (task.status == \"Review\") {\n    sector.review.tasksLastVersion[lvInTask].push(task);\n  } else {\n    sector.correction.tasksLastVersion[lvInTask].push(task);\n  }\n};\n\nconst addResultBacklog = (task, sector) => {\n  if (task.priority == \"Hotfix\") {\n    sector.hotfix.tasks.push(task);\n  } else if (task.status == \"В работе\") {\n    sector.work.tasks.push(task);\n  } else if (\n    task.status == \"READY FOR TESTING\" ||\n    task.status == \"Testing\" ||\n    task.status == \"Tested\"\n  ) {\n    sector.tested.tasks.push(task);\n  } else if (task.status == \"Correction\" || task.status == \"Сделать\") {\n    sector.notInRelease.tasks.push(task);\n  } else if (task.status == \"Review\") {\n    sector.review.tasks.push(task);\n  } else if (task.status == \"On hold\") {\n    sector.onHold.tasks.push(task);\n  } else if (task.status == \"Archive\") {\n    sector.archive.tasks.push(task);\n  } else {\n    sector.whoAmI.tasks.push(task);\n  }\n};\n\nconst getLastVersionsObj = (arr) => {\n  return arr.reduce((acc, v) => {\n    acc[v] = [];\n    return acc;\n  }, {});\n};\n\nconst result = {\n  create: (lastVersions) => {\n    return {\n      prod: {\n        done: {\n          text: \"Done\",\n          tasksActiveVersion: [],\n          tasksLastVersion: getLastVersionsObj(lastVersions),\n          clname: \"done\",\n        },\n        correction: {\n          text: \"частично - требуется коррекция\",\n          tasksActiveVersion: [],\n          tasksLastVersion: getLastVersionsObj(lastVersions),\n          clname: \"correction\",\n        },\n        tested: {\n          text: \"в дополнительном тестировании\",\n          tasksActiveVersion: [],\n          tasksLastVersion: getLastVersionsObj(lastVersions),\n          clname: \"tested\",\n        },\n        review: {\n          text: \"ждёт ревью\",\n          tasksActiveVersion: [],\n          tasksLastVersion: getLastVersionsObj(lastVersions),\n          clname: \"review\",\n        },\n      },\n      backlog: {\n        hotfix: {\n          text: \"в ожидании Hotfix\",\n          tasks: [],\n          clname: \"hotfix\",\n        },\n        work: {\n          text: \"уже в работе\",\n          tasks: [],\n          clname: \"work\",\n        },\n        tested: {\n          text: \"уже на тестировании\",\n          tasks: [],\n          clname: \"tested\",\n        },\n        notInRelease: {\n          text: \"в очереди на реализацию\",\n          tasks: [],\n          clname: \"notInRelease\",\n        },\n        review: {\n          text: \"ждёт ревью\",\n          tasks: [],\n          clname: \"review\",\n        },\n        onHold: {\n          text: \"On hold\",\n          tasks: [],\n          clname: \"onHold\",\n        },\n        archive: {\n          text: \"отправили в архив\",\n          tasks: [],\n          clname: \"archive\",\n        },\n        whoAmI: {\n          text: \"КТО Я ТАКОЙ\",\n          tasks: [],\n          clname: \"archive\",\n        },\n      },\n    };\n  },\n  fill: (data, activeVersion, lastVersions, tmp) => {\n    data.forEach((task) => {\n      if (isActive(task.version, activeVersion)) {\n        addResultActive(task, tmp.prod);\n      } else if (isLast(task.version, lastVersions)) {\n        addResultLast(task, tmp.prod);\n      } else if (task.status === \"Готово\") {\n        addResultActive(task, tmp.prod);\n      } else {\n        addResultBacklog(task, tmp.backlog);\n      }\n    });\n  },\n};\n\nconst createAndFillResult = (data, activeVersion, lastVersions) => {\n  let resultTmp = result.create(lastVersions);\n  result.fill(data, activeVersion, lastVersions, resultTmp);\n\n  return resultTmp;\n};\n\n\n//# sourceURL=webpack://report_generate/./src/result.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/styles/main.scss?");

/***/ }),

/***/ "./src/styles/stylesInputFile.scss":
/*!*****************************************!*\
  !*** ./src/styles/stylesInputFile.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/styles/stylesInputFile.scss?");

/***/ }),

/***/ "./src/styles/stylesInputRelise.scss":
/*!*******************************************!*\
  !*** ./src/styles/stylesInputRelise.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://report_generate/./src/styles/stylesInputRelise.scss?");

/***/ }),

/***/ "./src/updateReport.js":
/*!*****************************!*\
  !*** ./src/updateReport.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateReport: () => (/* binding */ updateReport)\n/* harmony export */ });\n/* harmony import */ var src_result_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/result.js */ \"./src/result.js\");\n/* harmony import */ var src_element_progress_bar_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/element_progress_bar/index */ \"./src/element_progress_bar/index.js\");\n/* harmony import */ var src_block_affectedServices_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/block_affectedServices/index */ \"./src/block_affectedServices/index.js\");\n/* harmony import */ var src_block_section_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/block_section/index */ \"./src/block_section/index.js\");\n\n\n\n\n\nconst updateReport = (data, state) => {\n  const result = (0,src_result_js__WEBPACK_IMPORTED_MODULE_0__.createAndFillResult)(\n    data,\n    state.activeVersion,\n    state.lastVersions\n  );\n\n  // Наполняем блоки статусов\n  (0,src_block_section_index__WEBPACK_IMPORTED_MODULE_3__.createAndRunSection)(\"prod\", Object.values(result.prod));\n  (0,src_block_section_index__WEBPACK_IMPORTED_MODULE_3__.createAndRunSection)(\"backlog\", Object.values(result.backlog));\n\n  //!!!! отрисовка прогресса !!!!\n  (0,src_element_progress_bar_index__WEBPACK_IMPORTED_MODULE_1__.addProgress)(Object.values(result.prod), data);\n\n  //!!!!Добавляем блок с затронутыми сервисами !!!\n  (0,src_block_affectedServices_index__WEBPACK_IMPORTED_MODULE_2__.createAndRunAffectedServices)(Object.values(result.prod));\n};\n\n/////\n\n// как hotfix в рамках релиза \"название релиза\"\n\n// отчет по спринту (если указывали релизы)\n// отчет по релизу\n\n// выберите релизы для хотфиксов = смотрим на релиз и не смотрим на тип и статус == всегда хотфиксы уходят в отдельный релиз!\n\n// загрузили отчет;выбрали версию на которую ориентироваться для прода = отобразился результат =>\n// в проде нет деления на хотфиксы; надпись спринт;\n// Выбрали в селекте релизы хотфиксов = на проде разделение на релизы в соотетствующих статусах\n\n// return result = {\n//   prod: {\n//     done: {\n//       text: \"Done\",\n//       tasksActiveVersion: dataByVersion.dataActive.filter((item) => item.status == \"Готово\"),\n//       tasksLastVersion: Object.fromEntries(lastVersions.map((version) => [version, dataByVersion.lastVersions.filter((item) => item.version.includes(version) && item.status == \"Готово\")])),\n//       clname: \"done\",\n//     },\n//     correction: {\n//       text: \"частично - требуется коррекция\",\n//       tasksActiveVersion: data.filter((item) => item.version.includes(activeVersion) && (item.status == \"Correction\" ||\n//       item.status == \"Testing\" ||\n//       item.status == \"Сделать\" ||\n//       item.status == \"В работе\" ||\n//       item.status == \"READY FOR TESTING\")),\n//       tasksLastVersion: Object.fromEntries(lastVersions.map((version) => [version, data.filter((item) => item.version.includes(version) && !item.version.includes(activeVersion) && (item.status == \"Correction\" ||\n//       item.status == \"Testing\" ||\n//       item.status == \"Сделать\" ||\n//       item.status == \"В работе\" ||\n//       item.status == \"READY FOR TESTING\"))])),\n//       clname: \"correction\",\n//     },\n//     tested: {\n//       text: \"в дополнительном тестировании\",\n//       tasksActiveVersion: data.filter((item) => item.version.includes(activeVersion) && (item.status == \"Tested\" || item.status == \"in release\")),\n//       tasksLastVersion:  Object.fromEntries(lastVersions.map((version) => [version, data.filter((item) => item.version.includes(version) && !item.version.includes(activeVersion) && (item.status == \"Tested\" || item.status == \"in release\"))])),\n//       clname: \"tested\",\n//     },\n//     review: {\n//       text: \"ждёт ревью\",\n//       tasksActiveVersion: data.filter((item) => item.version.includes(activeVersion) && item.status == \"Review\"),\n//       tasksLastVersion:  Object.fromEntries(lastVersions.map((version) => [version, data.filter((item) => item.version.includes(version) && !item.version.includes(activeVersion) && item.status == \"Review\")])),\n//       clname: \"review\",\n//     },\n//   },\n//   backlog: {\n//     hotfix: {\n//       text: \"в ожидании Hotfix\",\n//       tasksActiveVersion: ,\n//       clname: \"hotfix\",\n//     },\n//     work: {\n//       text: \"уже в работе\",\n//       tasksActiveVersionersion: [],\n//       clname: \"work\",\n//     },\n//     tested: {\n//       text: \"уже на тестировании\",\n//       tasksActiveVersion: [],\n//       clname: \"tested\",\n//     },\n//     notInRelease: {\n//       text: \"в очереди на реализацию\",\n//       tasksActiveVersion: [],\n//       clname: \"notInRelease\",\n//     },\n//     review: {\n//       text: \"ждёт ревью\",\n//       tasksActiveVersion: [],\n//       clname: \"review\",\n//     },\n//     onHold: {\n//       text: \"On hold\",\n//       tasksActiveVersion: [],\n//       clname: \"onHold\",\n//     },\n//     archive: {\n//       text: \"отправили в архив\",\n//       tasksActiveVersion: [],\n//       clname: \"archive\",\n//     },\n//   },\n// };\n\n// const fillResult = (data, activeVersion, lastVersions, result) => {\n//   data.forEach((task) => {\n//     if (isActive(task.version, activeVersion)) {\n//       addResultActive(task, result.prod);\n//     } else if (isLast(task.version, lastVersions)) {\n//       addResultLast(task, result.prod);\n//     } else {\n//       addResultBacklog(task, result.backlog);\n//     }\n//   });\n// };\n\n// const createResult = (lastVersions) => {\n//   const lastVersionsObj = lastVersions.reduce((acc, v) => {\n//     acc[v] = [];\n//     return acc;\n//   }, {});\n\n//   return {\n//     prod: {\n//       done: {\n//         text: \"Done\",\n//         tasksActiveVersion: [],\n//         tasksLastVersion: { ...lastVersionsObj },\n//         clname: \"done\",\n//       },\n//       correction: {\n//         text: \"частично - требуется коррекция\",\n//         tasksActiveVersion: [],\n//         tasksLastVersion: { ...lastVersionsObj },\n//         clname: \"correction\",\n//       },\n//       tested: {\n//         text: \"в дополнительном тестировании\",\n//         tasksActiveVersion: [],\n//         tasksLastVersion: { ...lastVersionsObj },\n//         clname: \"tested\",\n//       },\n//       review: {\n//         text: \"ждёт ревью\",\n//         tasksActiveVersion: [],\n//         tasksLastVersion: { ...lastVersionsObj },\n//         clname: \"review\",\n//       },\n//     },\n//     backlog: {\n//       hotfix: {\n//         text: \"в ожидании Hotfix\",\n//         tasks: [],\n//         clname: \"hotfix\",\n//       },\n//       work: {\n//         text: \"уже в работе\",\n//         tasks: [],\n//         clname: \"work\",\n//       },\n//       tested: {\n//         text: \"уже на тестировании\",\n//         tasks: [],\n//         clname: \"tested\",\n//       },\n//       notInRelease: {\n//         text: \"в очереди на реализацию\",\n//         tasks: [],\n//         clname: \"notInRelease\",\n//       },\n//       review: {\n//         text: \"ждёт ревью\",\n//         tasks: [],\n//         clname: \"review\",\n//       },\n//       onHold: {\n//         text: \"On hold\",\n//         tasks: [],\n//         clname: \"onHold\",\n//       },\n//       archive: {\n//         text: \"отправили в архив\",\n//         tasks: [],\n//         clname: \"archive\",\n//       },\n//     },\n//   };\n// };\n\n// // функция для распределения по статусам\n// const getStatuses = (data, version) => {\n//   return {\n//     prod: [\n//       {\n//         text: \"Done\",\n//         tasks: data.filter((item) => item.status == \"Готово\"),\n//         clname: \"done\",\n//       },\n//       {\n//         text: \"частично - требуется коррекция\",\n//         tasks: data.filter(\n//           (item) =>\n//             item.version.includes(version) &&\n//             (item.status == \"Correction\" ||\n//               item.status == \"Testing\" ||\n//               item.status == \"Сделать\" ||\n//               item.status == \"В работе\" ||\n//               item.status == \"READY FOR TESTING\")\n//         ),\n//         clname: \"correction\",\n//       },\n//       {\n//         text: \"в дополнительном тестировании\",\n//         tasks: data.filter(\n//           (item) =>\n//             item.version.includes(version) &&\n//             (item.status == \"Tested\" || item.status == \"in release\")\n//         ),\n//         clname: \"tested\",\n//       },\n//       {\n//         text: \"ждёт ревью\",\n//         tasks: data.filter(\n//           (item) => item.version.includes(version) && item.status == \"Review\"\n//         ),\n//         clname: \"review\",\n//       },\n//     ],\n//     backlog: [\n//       {\n//         text: \"в ожидании Hotfix\",\n//         tasks: data.filter(\n//           (item) =>\n//             !item.version.includes(version) &&\n//             item.priority == \"Hotfix\" &&\n//             item.status != \"Готово\"\n//         ),\n//         clname: \"hotfix\",\n//       },\n//       {\n//         text: \"уже в работе\",\n//         tasks: data.filter(\n//           (item) =>\n//             !item.version.includes(version) &&\n//             item.priority != \"Hotfix\" &&\n//             item.status == \"В работе\"\n//         ),\n//         clname: \"work\",\n//       },\n//       {\n//         text: \"уже на тестировании\",\n//         tasks: data.filter(\n//           (item) =>\n//             !item.version.includes(version) &&\n//             item.priority != \"Hotfix\" &&\n//             (item.status == \"READY FOR TESTING\" ||\n//               item.status == \"Testing\" ||\n//               item.status == \"Tested\")\n//         ),\n//         clname: \"tested\",\n//       },\n//       {\n//         text: \"в очереди на реализацию\",\n//         tasks: data.filter(\n//           (item) =>\n//             !item.version.includes(version) &&\n//             item.priority != \"Hotfix\" &&\n//             (item.status == \"Correction\" || item.status == \"Сделать\")\n//         ),\n//         clname: \"notInRelease\",\n//       },\n//       {\n//         text: \"ждёт ревью\",\n//         tasks: data.filter(\n//           (item) => !item.version.includes(version) && item.status == \"Review\"\n//         ),\n//         clname: \"review\",\n//       },\n//       {\n//         text: \"On hold\",\n//         tasks: data.filter(\n//           (item) => !item.version.includes(version) && item.status == \"On hold\"\n//         ),\n//         clname: \"onHold\",\n//       },\n//       {\n//         text: \"отправили в архив\",\n//         tasks: data.filter(\n//           (item) => !item.version.includes(version) && item.status == \"Archive\"\n//         ),\n//         clname: \"archive\",\n//       },\n//     ],\n//   };\n// };\n\n\n//# sourceURL=webpack://report_generate/./src/updateReport.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;