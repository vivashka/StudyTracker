import CustomStore from "devextreme/data/custom_store";
import {showModal} from "../redux/reducers/error.js";
import store from "../redux/store.js";
export const coursesDataStore =  new CustomStore({
    key: 'courseId',
    load: async () => {
        try {
            const user = store.getState().user.user;
            const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_COURSES + user.studentId;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Ошибка загрузки");

            const result = await response.json();
            if (!result.isSuccess) throw new Error("Ошибка данных");

            return {
                data: result.successEntity,
                totalCount: result.successEntity.length
            };
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
                course : {
                    name: values.name,
                    professor: values.professor,
                    description: values.description,
                },
                studentId: user.studentId,
            }
            const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_COURSES_CREATE;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestModel)
            });


            return  await response.json();

        } catch (e) {
            console.error(e);
            store.dispatch(showModal({
                isSuccess: false, errorMessage: "Ошибка при добавлении", errorCode: "500"
            }));
            throw e;
        }
    },
    remove: async (values) => {
        try {
            console.log(values);
            const user = store.getState().user.user;
            const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_COURSES_DELETE + "courseId=" + values + "&studentId=" + user.studentId;

            const response = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            const result = await response.json();


            return {
                data: result.successEntity,
                totalCount: 0
            };
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
            console.log(values);
            const user = store.getState().user.user;
            const requestModel = {
                course : {
                    courseId: key,
                    name: values.name,
                    professor: values.professor,
                    description: values.description,
                },
                studentId: user.studentId,
            }
            const url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_COURSES_CREATE;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestModel)
            });


            return  await response.json();

        } catch (e) {
            console.error(e);
            store.dispatch(showModal({
                isSuccess: false, errorMessage: "Ошибка при добавлении", errorCode: "500"
            }));
            throw e;
        }
    },
});