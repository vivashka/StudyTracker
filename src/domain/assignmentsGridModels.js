import {taskState} from "./Enums/TaskState.js";

export const assignmentsGridModels = [{
    "visible": true,
    "dataField": "name",
    "dataType": "string",
    "caption": "Название",
    "alignment": "left"
},
    {
        "visible": true,
        "dataField": "description",
        "dataType": "string",
        "caption": "Описание",
        "alignment": "left"
    },
    {
        "visible": true,
        "dataField": "state",
        "caption": "Состояние",
        "alignment": "left",
        lookup: {
            dataSource: taskState,
            valueExpr: "ID",
            displayExpr: "Name"
        }

    },
    {
        "visible": true,
        "dataField": "deadLine",
        "dataType": "datetime",
        "caption": "Срок сдачи",
        "alignment": "left",
        calculateDisplayValue: function(rowData) {
            return rowData.deadLine ? new Date(rowData.deadLine).toLocaleDateString() : "Не назначен";
        }
    }
]