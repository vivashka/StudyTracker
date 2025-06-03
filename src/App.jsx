import ruMessages from "devextreme/localization/messages/ru.json";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {loadMessages, locale} from "devextreme/localization";
import {LoginPage} from "./pages/LoginPage.jsx";
import 'devextreme/dist/css/dx.light.css';
import {CoursesPage} from "./pages/CoursesPage.jsx";
import {TasksPage} from "./pages/TasksPage.jsx";

const routerProvider = createBrowserRouter([
    {
        path: "/tasks",
        element: <TasksPage />,
    },
    {
        path: "/courses",
        element: <CoursesPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "*",
        element: <LoginPage />,
    }
])

const App = () => {
    loadMessages(ruMessages);
    locale(navigator.language);

    return (
        <RouterProvider router={routerProvider}/>
    );
};

export default App;
