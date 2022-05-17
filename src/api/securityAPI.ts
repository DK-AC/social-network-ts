import {AxiosResponse} from 'axios';

import {instanceAPI} from './instanceAPI';

export const securityAPI = {
    getCaptchaUrl() {
        return instanceAPI.get<any, AxiosResponse<{ url: string }>>('/security/get-captcha-url')
    },
};