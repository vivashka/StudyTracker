import {DataGrid, Editing, Popup, Form, FilterRow} from 'devextreme-react/data-grid';
import {courseColumns} from "../domain/CoursesGrid";
import {coursesDataStore} from "../domain/coursesDataStore";
import {Item} from "devextreme-react/form";
import {useEffect, useState} from "react";
import {Button} from "devextreme-react";
import {Navigate, useNavigate} from "react-router-dom";
import store from "../redux/store.js";
import {logout} from "../redux/reducers/user.js";
import {TasksGrid} from "../components/TasksGrid.jsx";
import {TaskStudents} from "../components/TaskStudents.jsx";

export function CoursesPage() {


    const [currentCourse, setCurrentCourse] = useState(null);
    const user = store.getState().user.user;

    const navigate = useNavigate();

    async function onCourseClick(course) {
        setCurrentCourse(course.data);
    }

    const hide = () => {
        setCurrentCourse([]);
    };

    function onExit(){
        store.dispatch(logout())
        navigate("/login")
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
                    allowAdding={user.isAdmin}
                    allowDeleting={user.isAdmin}

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
                            <Item dataField={"name"} editorOptions={{ readOnly: !user.isAdmin }}/>
                            <Item dataField={"professor"} editorOptions={{ readOnly: !user.isAdmin }}/>
                            <Item dataField={"description"} editorOptions={{ readOnly: !user.isAdmin }}/>

                        </Item>

                        {user.isAdmin && <Item caption={'Студенты'}
                               itemType="group"
                               colSpan={2}>
                            <TaskStudents currentCourse={currentCourse}/>

                        </Item>}

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