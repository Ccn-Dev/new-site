import { useState, useRef, useEffect } from 'react'
import styles from '../styles/components/button.module.scss'

export default function Button(props) {

    const handleClick = () => {
        if (props.disabled) {

            if (props.disabled === false) {
                props.onClick()

                return
            }
        }
        else  {
            props.onClick()
        }
    }

    return (
        <div
            className={`${styles.wrap} ${ props.class ? props.class : '' }`}
            onClick={ props.onClick }
        >
            { props.label }
        </div>
    )
}