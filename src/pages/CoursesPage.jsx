import {DataGrid} from "devextreme-react";

export function CoursesPage() {

    

    const courses = () =>{
        const response = await courses();
    }

    return (<div>
        <h1>Мои курсы</h1>
        <div>
            <DataGrid
                columns={columns}

            >

            </DataGrid>
        </div>
    </div>)
}