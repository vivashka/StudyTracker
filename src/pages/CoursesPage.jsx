import {DataGrid, Editing, Popup, Form, FilterRow} from 'devextreme-react/data-grid';
import {courseColumns} from "../domain/CoursesGrid";
import {coursesDataStore} from "../domain/coursesDataStore";
import {Item} from "devextreme-react/form";
import {useState} from "react";
import {Button} from "devextreme-react";
import {Navigate} from "react-router-dom";
import store from "../redux/store.js";
import {logout} from "../redux/reducers/user.js";
import {TasksGrid} from "../components/TasksGrid.jsx";
import {TaskStudents} from "../components/TaskStudents.jsx";

export function CoursesPage() {


    const [currentCourse, setCurrentCourse] = useState(null);
    const user = store.getState().user;

    async function onCourseClick(course) {
        setCurrentCourse(course.data);
    }

    const hide = () => {
        setCurrentCourse([]);
    };

    function onExit(){
        store.dispatch(logout())
    }

    if (!user?.user){
        return <Navigate to="/login" />;
    }

    return <div>
        <header className={"main-header"}>
            <h1>Мои курсы</h1>
            <Button type={"danger"} onClick={onExit} text="Выход" />
        </header>

        <div>
            <DataGrid
                columns={courseColumns}
                dataSource={coursesDataStore}
                showColumnLines={false}
                showRowLines={true}
                onEditingStart={(e) => onCourseClick(e)}
            >
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowAdding={user.user.isAdmin}
                    allowDeleting={user.user.isAdmin}

                >
                    <Popup
                        title="Курс"
                        showTitle={true}
                        onHiding={hide}
                    />
                    <Form>
                        <Item itemType="group"
                              colCount={1}
                              colSpan={2}>
                            <Item dataField={"name"}/>
                            <Item dataField={"professor"}/>
                            <Item dataField={"description"}/>

                        </Item>

                        <Item caption={'Студенты'}
                            itemType="group"
                            colCount={2}
                            colSpan={2}>
                           // <TaskStudents currentCourse={currentCourse} />

                        </Item>

                        <Item itemType="group"
                              colCount={1}
                              colSpan={2}
                              caption={'Задания курса'}>
                            <TasksGrid currentCourse={currentCourse} user={user} />
                        </Item>

                    </Form>
                </Editing>
            </DataGrid>
        </div>
    </div>
}