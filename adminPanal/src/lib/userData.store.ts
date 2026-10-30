/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { create } from "zustand";

interface IUserDetailsField {
    name : string;
    email : string;
    role : 'admin' | 'moderator'
}

interface IUserDetails extends IUserDetailsField {
    setLoginData : (data : IUserDetailsField) => void;
    isLoggedIn : boolean
    loggout : () => void
}

export const useUserDetailsStore = create<IUserDetails>((set) => ({
    name: '',
    email : '',
    role : 'moderator',
    isLoggedIn : false,
    setLoginData({name , email , role}) {
        set({name , email, role, isLoggedIn : true})
    },
    loggout() {
        set({ name : '', email: '', role : 'moderator', isLoggedIn : false})
    }
}));