import React from 'react';
import {Posts} from "./Posts/Posts";


export const Profile = () => {
    return (
        <div>
            <div>
                <img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                     alt="img"/>
            </div>
            <div>ava + description</div>
            <Posts/>
        </div>
    );
};