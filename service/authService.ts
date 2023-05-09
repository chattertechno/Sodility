import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';
import { removeLocaleData, getLocaleData } from "./localStorageService";

const storedUser = typeof window !== "undefined" && window.localStorage.getItem('user');
// const token = typeof window !== "undefined" && window.localStorage.getItem('token');
const userSubject = new BehaviorSubject(storedUser ? JSON.parse(storedUser) : null);
// const userSubject = new BehaviorSubject(typeof window !== "undefined" && JSON.parse(window.localStorage.getItem('user')));

const logout =()=> {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    removeLocaleData('user');
    removeLocaleData('token');
    userSubject.next(null);
    // Router.push('/login');
    if(typeof window !== "undefined")
        window.location.href = '/';
}

export const userService = {
    userSubject,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    logout
};