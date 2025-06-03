import {loginModel} from "../domain/loginModel.js";
import {useState} from "react";
import {Form, LoadIndicator, TextBox} from "devextreme-react";
import {ButtonItem, ButtonOptions, Item, Label, RequiredRule} from "devextreme-react/form.js";
import CryptoJS from 'crypto-js';
import {login_fail, login_success} from "../redux/reducers/user.js";
import store from "../redux/store.js";
import {useSelector} from "react-redux";
import "./pages-css.scss"

export function LoginPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({...loginModel});
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const [isRegistration, setIsRegistration] = useState(false);

    function generateHash(Tabel, Pass) {
        let secret = `${Pass}${Tabel}`;
        const hash = CryptoJS.MD5(secret);
        return hash.toString(CryptoJS.enc.Hex).toLowerCase();
    }

    async function onSubmitHandle(e) {
        setIsLoading(true)
        // let body = {
        //     login: user.login,
        //     password: generateHash(user.login, user.password)
        // }
        try {
            // const response = await authentication(body)
            // if (response.isSuccess === true) {
            //     console.log(response)
            //     store.dispatch(login_success(response.successEntity))
            // } else {
            //     store.dispatch(login_fail())
            // }
        } catch (e) {
            store.dispatch(login_fail());
        }

        setIsLoading(false)
    }

    return(
        <div>
            <div className="login-container">
                <h1>Авторизация</h1>
                <Form
                    formData={user}
                    className="login-form"
                    labelMode="floating"
                    onFieldDataChanged={(e) => setUser({...user, [e.dataField]: e.value})}>
                    <Item dataField="login">
                        <Label text={"Логин"}/>
                        <RequiredRule message={"Обязательно для заполнения"}/>
                    </Item>
                    <Item dataField="password">
                        <Label text={"Пароль"}/>
                        <RequiredRule message={"Обязательно для заполнения"}/>
                    </Item>

                    <TextBox labelMode={"floating"} placeholder={"Пароль"}/>
                    <ButtonItem>
                        <ButtonOptions
                            onClick={onSubmitHandle}
                            disabled={isLoading}
                            width={'100%'}
                            type={'default'}
                            useSubmitBehavior={true}
                        >
                            <LoadIndicator elementAttr={{borderColor: 'white', borderTopColor: "transparent"}}
                                           style={{width: '25px', height: '20px', marginRight: "5px"}}
                                           visible={isLoading} />
                            <span className="dx-button-text">
                          Войти
                        </span>
                        </ButtonOptions>
                    </ButtonItem>
                </Form>
            </div>
        </div>
    )
}