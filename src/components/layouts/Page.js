import { useState, useEffect, useRef } from 'react'
import NavBar from '../NavBar'
import styles from '../../styles/layouts/page.module.scss'
import Alert from '../Alert'

export default function Page({ children, current, title, blur, alert, alertBuffer }) {
    
    const [ slideBlur, setSlideBlur ] = useState(false)

    return (
        <>
            {
                alert  &&
                <Alert
                    desc={ alert.desc }
                    setFunc={ alert.setFunc }
                    alertBuffer={ alertBuffer }
                    btns={ alert.btns }
                />
            }
            <div
                className={`${ styles.wrap }`}
            >
                <NavBar
                    current={ current }
                    slideBlur={ setSlideBlur }
                />
                <section className={`${ styles.right } ${ blur || slideBlur ? 'blurLock blur' : '' }`}>
                    <header className={ styles.header }>
                        <p className={ styles.title }>{ title }</p>
                        <p className={ styles.name }>{ localStorage.getItem('name') }</p>
                    </header>
                    <main>
                        { children }
                    </main>
                </section>
            </div>
        </>
    )
}