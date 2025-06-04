import CustomStore from "devextreme/data/custom_store.js";
import store from "../redux/store.js";
import {showModal} from "../redux/reducers/error.js";

export const casesDataSource = new CustomStore({
    key: "guid",

    async load(studentId) {

        let url = import.meta.env.REACT_APP_BASE_URL + import.meta.env.REACT_APP_GET_CASES + studentId;

        const request = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const response = await request.json();

        if (response.success) {
            return {
                data: response.content.successEntity
            }
        } else {
            store.dispatch(showModal({
                success: response.content.isSuccess,
                message: response.content.errorEntity.errorMessage,
                code:  response.content.errorEntity.errorCode
            }))
            return { data: []}
        }

    }
})