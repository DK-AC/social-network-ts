import styles from "./messageItem.module.css";
import React from "react";

type PropsType = { id: number, message: string }

export const MessageItem: React.FC<PropsType> = ({id, message}) => {
    return (
        <div>
                <span className={styles.messageItem}>
                                    {message}

                    <img
                        src="https://www.seekpng.com/png/full/245-2454602_tanni-chand-default-user-image-png.png"
                        alt={'userMessage'}/>
            </span>
        </div>
    )
}

