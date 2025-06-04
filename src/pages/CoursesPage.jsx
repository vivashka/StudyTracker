import {DataGrid, Editing, Popup, Form} from 'devextreme-react/data-grid';
import {courseColumns} from "../domain/CoursesGrid";
import {coursesDataStore} from "../domain/coursesDataStore";
import {Item} from "devextreme-react/form";
import {useState} from "react";
import {taskState} from "../domain/Enums/TaskState.js";
import {assignmentsGridModels} from "../domain/assignmentsGridModels.js";
import {createAssignmentsDataStore} from "../domain/assignmentsDataStore.js";

export function CoursesPage() {
    const [tasks, setTasks] = useState([]);

    const [currentCourse, setCurrentCourse] = useState(null);

    async function onCourseClick(course) {
        setCurrentCourse(course.data);
    }

    const hide = () => {
        setTasks([])
    };

    const TasksGrid = () => {
        const assignmentsStore = currentCourse
            ? createAssignmentsDataStore(currentCourse.courseId)
            : null;

        if (!assignmentsStore) return null;

        return (
            <DataGrid
                dataSource={assignmentsStore}
                columns={assignmentsGridModels}
                height={200}
                showScrollbar="always"
            >
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}

                >
                    <Form>
                        <Item dataField={"name"} caption={"Название"}/>
                        <Item dataField={"description"} caption={"Описание"}/>
                        <Item
                            dataField="state"
                            caption="Состояние"
                            editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: taskState,
                                displayExpr: "Name",
                                valueExpr: "ID"
                            }}
                        />
                        <Item dataField={"deadLine"} caption={"Срок сдачи"}
                              customizeText={(e) =>
                                  e.value ? new Date(e.value).toLocaleDateString() : 'не назначен'
                              } />
                    </Form>
                </Editing>
            </DataGrid>
        );
    };

    return <div>
        <h1>Мои курсы</h1>
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
                    allowAdding={true}
                    allowDeleting={true}

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

                        <Item itemType="group"
                              colCount={1}
                              colSpan={2}
                              caption={'Задания курса'}>
                            {tasks && <TasksGrid/>}
                        </Item>
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    </div>
}