import {Lookup} from "devextreme-react";
import {useState} from "react";
import {getStudentsByCourse} from "../services/getStudentsByCourse.js";
import {showModal} from "../redux/reducers/error.js";
import store from "../redux/store.js";

export const TaskStudents = async (currentCourse) =>{

    let students, setStudents;
    [students, setStudents] = useState([]);

    const loadStudents = async (opened) => {
        if (opened) {
            try {
                const request = await getStudentsByCourse(currentCourse);
                if (request.isSuccess) {
                    setStudents(request.content);
                } else {
                    store.dispatch(showModal({
                        errorCode: request.errorCode,
                        errorMessage: JSON.stringify(request.errorMessage) ?? ""
                    }))
                }
            } catch (error) {
                store.dispatch(showModal({
                    code: 300,
                    message: JSON.stringify(error) ?? "",
                    notes: ""
                }))
            }
        } else {
            store.dispatch(showModal({
                code: 300,
                message: "Непредвиденная ошибка"
            }))
        }
    };

    return (
        <div>
            <div>
                Список текущих студентов:
                <Lookup
                    dataSource={students}
                    valueExpr={"login"}
                    dropDownOptions={{
                        showTitle: false,
                        hideOnOutsideClick: true,
                        height: 400,
                    }}
                    onOpenedChange={loadStudents}
                />
            </div>

        </div>
    )
}