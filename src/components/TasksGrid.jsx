import {createAssignmentsDataStore} from "../domain/assignmentsDataStore.js";
import {assignmentsGridModels} from "../domain/assignmentsGridModels.js";
import {DataGrid, Editing, FilterRow, Form} from "devextreme-react/data-grid";
import {Item} from "devextreme-react/form";
import {taskState} from "../domain/Enums/TaskState.js";

export const TasksGrid = ({currentCourse, user}) => {
    let assignmentsStore;
    assignmentsStore = currentCourse ? createAssignmentsDataStore(currentCourse.courseId) : null;
    if (!assignmentsStore) return null;

    return (<DataGrid
        dataSource={assignmentsStore}
        columns={assignmentsGridModels}
        height={200}
        showScrollbar="always"
    >
        <FilterRow visible={true}/>
        <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={user.isAdmin}
            allowDeleting={user.isAdmin}

        >
            <Form>
                <Item dataField={"name"} caption={"Название"} editorOptions={{ readOnly: !user.isAdmin }}/>
                <Item dataField={"description"} caption={"Описание"} editorOptions={{ readOnly: !user.isAdmin }}/>
                <Item dataField={"deadLine"} caption={"Срок сдачи"} editorOptions={{ readOnly: !user.isAdmin }}/>
                <Item
                    dataField="state"
                    caption="Состояние"
                    editorType="dxSelectBox"
                    editorOptions={{
                        dataSource: taskState, displayExpr: "Name", valueExpr: "ID"
                    }}
                />
            </Form>
        </Editing>
    </DataGrid>)

};