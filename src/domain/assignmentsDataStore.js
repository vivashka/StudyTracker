import CustomStore from "devextreme/data/custom_store";
import store from "../redux/store.js";
import {showModal} from "../redux/reducers/error.js";
import {getAssignments} from "../services/getAssignments.js";
import {createAssignment} from "../services/createAssignments.js";

export function createAssignmentsDataStore(courseId) {
    return new CustomStore({
        key: 'assignmentId',
        load: async () => {
            try {
                const user = store.getState().user.user;

                const response = await getAssignments(user.studentId, courseId);
                console.log(response);
                return response.successEntity;
            } catch (e) {
                console.error(e);
                store.dispatch(showModal({
                    isSuccess: false, errorMessage: "Ошибка загрузки данных", errorCode: "500"
                }));
                return { data: [], totalCount: 0 };
            }
        },
        insert: async (values) => {
            try {
                const user = store.getState().user.user;
                const requestModel = {
                    assignments: {
                        assignmentId : values.assignmentId,
                        name: values.name,
                        description: values.description,
                        courseId: courseId,
                        state: values.state,
                        deadLine: values.deadLine
                    },
                    studentId : user.studentId
                }
                console.log(values)
                const response = await createAssignment(requestModel);
                console.log(response);
                return response.successEntity;
            } catch (e) {
                console.error(e);
                store.dispatch(showModal({
                    isSuccess: false, errorMessage: "Ошибка загрузки данных", errorCode: "500"
                }));
                return { data: [], totalCount: 0 };
            }
        },
        update: async (key, values) => {
            try {

                const user = store.getState().user.user;
                const requestModel = {
                    assignments: {
                        assignmentId : key,
                        name: values.name,
                        description: values.description,
                        courseId: courseId,
                        state: values.state,
                        deadLine: values.deadLine,
                    },
                    studentId : user.studentId
                }

                const response = await createAssignment(requestModel);
                console.log(response);
                return response.successEntity;
            } catch (e) {
                console.error(e);
                store.dispatch(showModal({
                    isSuccess: false, errorMessage: "Ошибка загрузки данных", errorCode: "500"
                }));
                return { data: [], totalCount: 0 };
            }
        },
        remove: async (key) => {
            try {
                const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_ASSIGNMENTS + "assignmentId=" + key;

                const response = await fetch(url, {
                    method: 'DELETE', headers: {
                        'Content-Type': 'application/json',
                    }
                })

                return await response.json()
            } catch (err) {
                return {
                    isSuccess: false, errorMessage: err.message, errorCode: "500"
                }
            }
        }
    });
}
