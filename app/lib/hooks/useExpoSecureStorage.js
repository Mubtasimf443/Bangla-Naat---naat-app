/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { useState } from "react";
import * as SecureStore from 'expo-secure-store'

export const useExpoSecureStorage = (key, defaultValue) => {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const value = SecureStore.getItem(key)
            if (value) {
                return JSON.parse(value)
            } else {
                SecureStore.setItem(key, JSON.stringify(defaultValue));
                return defaultValue
            }
        } catch (error) {
            SecureStore.setItem(key, JSON.stringify(defaultValue));
            return defaultValue
        }
    })

    const setLocalStorageStateValue = (valueOrFn) => {
        let newValue;
        if (typeof valueOrFn === 'function') {
            const fn = valueOrFn;
            newValue = fn(localStorageValue)
        }
        else {
            newValue = valueOrFn;
        }
        SecureStore.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue)
    }

    return [localStorageValue, setLocalStorageStateValue]
}
