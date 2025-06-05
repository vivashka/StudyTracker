import {Button, Lookup} from "devextreme-react";
import {getStudentsByCourse} from "../services/getStudentsByCourse.js";
import {showModal} from "../redux/reducers/error.js";
import store from "../redux/store.js";
import {getStudents} from "../services/getStudents.js";
import {useState} from "react";
import {assignCourse} from "../services/assignCourse.js";

export const TaskStudents = ({currentCourse}) => {

    let [students, setStudents] = useState([]);
    let [allStudents, setAllStudents] = useState([]);

    const [isAdd, setIsAdd] = useState(false);

    const loadStudentsByCourse = async (opened) => {
        if (opened) {
            try {
                const request = await getStudentsByCourse(currentCourse.courseId);
                if (request.isSuccess) {
                    setStudents(request.successEntity);
                } else {
                    store.dispatch(showModal({
                        errorCode: request.errorEntity.errorCode,
                        errorMessage: JSON.stringify(request.errorEntity.errorMessage) ?? ""
                    }))
                }
            } catch (error) {
                store.dispatch(showModal({
                    errorCode: 300,
                    errorMessage: JSON.stringify(error) ?? ""
                }))
            }
        } else {
            console.log("Закрыто")
        }
    };

    const loadAllStudents = async (opened) => {
        if (opened) {
            try {
                const request = await getStudents();
                if (request.isSuccess) {
                    setAllStudents(request.successEntity);
                } else {
                    store.dispatch(showModal({
                        errorCode: request.errorEntity.errorCode,
                        errorMessage: JSON.stringify(request.errorEntity.errorMessage) ?? ""
                    }))
                    console.log(request.errorEntity)
                }
            } catch (error) {
                store.dispatch(showModal({
                    errorCode: 300,
                    errorMessage: JSON.stringify(error) ?? ""
                }))
            }
        } else {
            console.log("Закрыто")
        }
    };

    async function assignStudentOnCourse(item) {

        const response = await assignCourse(currentCourse.courseId, item.itemData.studentId);
        console.log(response)
        if (response.isSuccess) {
            console.log("Success");
        }
        else {
            console.log(response.errorEntity)
            store.dispatch(showModal({errorCode: response.errorEntity.errorCode, errorMessage: response.errorEntity.errorMessage}))
        }
    }


    return (
        <div>
            <div>
                Список текущих студентов:
                <Lookup
                    dataSource={students}
                    valueExpr={"login"}
                    displayExpr={"login"}
                    dropDownOptions={{
                        showTitle: false,
                        hideOnOutsideClick: true,
                        height: 400,
                    }}
                    onOpenedChange={loadStudentsByCourse}
                />

            </div>
            <div>
                <Button text={"Назначить"} type={"default"} onClick={() => setIsAdd(!isAdd)}/>
                {isAdd &&
                    <Lookup
                        dataSource={allStudents}
                        valueExpr={"login"}
                        dropDownOptions={{
                            showTitle: false,
                            hideOnOutsideClick: true,
                            height: 400,
                        }}
                        searchEnabled={true}
                        displayExpr={"login"}
                        onOpenedChange={loadAllStudents}
                        onItemClick={assignStudentOnCourse}
                    />}
            </div>
        </div>
    )
}