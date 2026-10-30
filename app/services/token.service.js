/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import * as SecureStore from "expo-secure-store";

export const tokenService = {
    setBearerToken(token) {
        SecureStore.setItem('AUTH_TOKEN', token);
    },
    getBearerToken() {
        return SecureStore.getItem('AUTH_TOKEN');
    },
    deleteBearerToken() {
        SecureStore.deleteItemAsync('AUTH_TOKEN')
    }
}