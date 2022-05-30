export {
    setAppError,
    isAppInitialized,
    setAppStatus,
    appSlices,
    appReducer,
} from './appReducer'

export {
    getCaptchaURL,
    logout,
    login,
    authMe,
    authReducer,
    authSlices,
    getMyPhoto,
    setMyPhoto,
} from './authReducer'

export {dialogsReducer, dialogSlices, sendMessage} from './dialogsReducer'

export {
    updateProfileUserStatus,
    getProfileUserStatus,
    addPost,
    savePhoto,
    saveProfile,
    setProfileUser,
    profileSlices,
    deletePost,
    profileReducer,
} from './profileReducer'
