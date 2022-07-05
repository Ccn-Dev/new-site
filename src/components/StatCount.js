import { useState, useRef, useEffect } from 'react'
import styles from '../styles/components/statcount.module.scss'

export default function StatCount({ label, direction, value, className }) {

    return (
        <span
            className={`${ styles.wrap } ${ className ? className : '' }`}
        >
            <span className={ styles.top }>
                <svg
                    width={ 30 }
                    height={ 20 }
                    className={ styles.valueBalancer }
                >
                </svg>
                <p className={ styles.value }>{ value }</p>
                <span className={ styles.triWrap }>
                    <svg
                        width={ 30 }
                        height={ 20 }
                    >
                        {
                            direction === 'up' &&
                            <polygon
                                className={`${ styles.triangle } ${ direction === 'up' ? styles.upTri : styles.downTri }`}
                                strokeLinejoin='round'
                                viewBox=''
                                points='0,20 15,0, 30,20'
                            />
                        }
                        {
                            direction === 'down' &&
                            <polygon
                                className={`${ styles.triangle } ${ direction === 'up' ? styles.upTri : styles.downTri }`}
                                strokeLinejoin='round'
                                viewBox=''
                                points='0,0 15,20, 30,0'
                            />
                        }
                    </svg>
                </span>
            </span>
            <p className={ styles.label }>{ label }</p>
        </span>
    )
}