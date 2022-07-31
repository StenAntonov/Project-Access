import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = api.settings.host;

export async function getAllUsers() {
    return await api.get(host + '/users');
}

export async function inviteUser(data) {
    return await api.post(host + '/users', data);
}

export async function getUserById(id) {
    return await api.get(host + '/users/' + id);
}
