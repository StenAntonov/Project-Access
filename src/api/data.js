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

// export async function getAllTheaters() {
//     return await api.get(host + '/data/theaters?sortBy=_createdOn%20desc&distinct=title');
// }

// export async function getTheatreById(id) {
//     return await api.get(host + '/data/theaters/' + id);
// }

// export async function getMyTheatres(userId) {
//     return await api.get(host + `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

// export async function createTheatre(data) {
//     return await api.post(host + '/data/theaters', data);
// }

// export async function editTheatre(id, data){
//     return await api.put(host + '/data/theaters/' + id, data);
// }

// export async function deleteTheatre(id) {
//     return await api.del(host + '/data/theaters/' + id);
// }

// export async function getTheaterLikes(id) {
//     return await api.get(host + `/data/likes?where=theaterId%3D%22${id}%22&distinct=_ownerId&count`);
// }

// export async function addLike(id) {
//     return await api.post(host + '/data/likes', id);
// }

// export async function getTheaterLikeByUser(userId, id) {
//     return await api.get(host + `/data/likes?where=theaterId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// }