import { useRef, useEffect, useState } from 'react'
import styles from '../styles/components/alert.module.scss'
import Button from './Button'

export default function Alert({ setFunc, desc, alertBuffer, btns }) {

    const close = () => {
        alertBuffer(null)
    }

    const setValue = (value) => {
        setFunc(value)
        close()
    }

    return (
        <section className='bgOverlay'>
            <div className={ styles.wrap }>
                <div className={ styles.top }>
                    <p
                        className={ styles.closeBtn }
                        onClick={ close }
                    >X</p>
                </div>
                <div className={ styles.mid }>
                    { desc }
                </div>
                <div className={ styles.bottom }>
                    {
                        btns.map((btn) => (
                            <Button
                                label={ btn.label }
                                onClick={ () => setValue(btn.returnValue) }
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}