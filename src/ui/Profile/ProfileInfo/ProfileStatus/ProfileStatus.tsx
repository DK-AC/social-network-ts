import React from 'react';

type PropsType = {
    aboutMe: string,
}

export const ProfileStatus: React.FC<PropsType> = ({aboutMe}) => {
    return (
        <>
            <span>{aboutMe}</span>
        </>
    );
};

