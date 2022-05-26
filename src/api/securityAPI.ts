import {AxiosResponse} from 'axios'

import {apiConfig} from './apiConfig'

export const securityAPI = {
    getCaptchaUrl() {
        return apiConfig.get<any, AxiosResponse<{ url: string }>>('/security/get-captcha-url')
    },
}
