"use client"
import { useState } from "react";
import styles from "./Letter.module.css";

interface props{
    letter:string
    className:string
}

const Letter = (props:props) => {
    return(
        <div className={styles[props.className]}>
            {props.letter}
        </div>
    )
}

export default Letter;