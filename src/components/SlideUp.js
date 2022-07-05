import { useRef, useEffect, useState } from 'react'
import styles from '../styles/components/slideUp.module.scss'

export default function SlideUp({ children, buffer }) {

    const handleOverlayClick = (e) => {
        // e.preventDefault()

        if (e.target === e.currentTarget) {
            buffer(null)
        }
    }

    return (
        <div
            className={`bgOverlay ${ styles.container }`}
            onClick={ handleOverlayClick }
        >
            <div className={ styles.wrap }>
                {
                    children
                }
            </div>
        </div>
    )
}