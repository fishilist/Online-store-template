import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    let role = email === 'admin@mail.ru' ? 'ADMIN' : 'USER'
    /*let role = 'USER';
    if (email === 'admin@mail.ru') { role = 'ADMIN' }*/
    const {data} = await $host.post('api/user/registration', {email, password, role: role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const deleteUser = async (id) => {
    const {data} = await $host.delete('api/user/' + id)
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
