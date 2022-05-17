import {instanceAPI} from './instanceAPI';
import {AuthUserType, AxiosResponseType, LoginUserType} from './typesAPI';

export const authAPI = {
    me() {
        return instanceAPI.get<any, AxiosResponseType<AuthUserType>, AuthUserType>('/auth/me')
    },
    login(data: LoginUserType) {
        return instanceAPI.post<any, AxiosResponseType<LoginUserType>, LoginUserType>('/auth/login', data)
    },
    logout() {
        return instanceAPI.delete<any, AxiosResponseType, ResponseType>('/auth/login')
    },
};


