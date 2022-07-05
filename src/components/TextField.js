import { useState, useEffect, useRef } from 'react'
import styles from '../styles/components/textfield.module.scss'

export default function TextField(props) {

    const [ icon, setIcon ] = useState()
    const icons = {
        email: '/imgs/icons/email.png',
        person: '/imgs/icons/person.png',
        padlock: '/imgs/icons/padlock.png'
    }
    // const [ iconStyle, setIconStyle ] = useState(styles.iconPerson)
    const [ isVisible, setVisible ] = useState(true)
    // const [ passIcon, setPassIcon ] = useState(faEye)

    // const toggleVisible = () => {
    //     setVisible(!isVisible)
    //     setPassIcon(isVisible ? faEye : faEyeSlash)
    // }

    const handleChange = (e) => {
        if (props.changeFunc) {
            props.changeFunc(e.target.value)
        }
    }

    useEffect(() => {
        
        switch(props.type) {
            case 'name':
                setIcon(icons.person)
                // setIconStyle(styles.iconPerson)
                break
            case 'email':
                setIcon(icons.email)
                // setIconStyle(styles.iconEmail)
                break
            case 'password':
                setVisible(false)
                setIcon(icons.padlock)
                // setIconStyle(styles.iconPadlock)
                break
            default:
                if (props.icon) {
                    setIcon(props.icon)
                }
                else {
                    setIcon(icons.person)
                }
                break
        }
    }, [])

    return (
        <>
            <span className={`${styles.wrap} ${ props.class ? props.class : '' } ${ props.valid === false ? styles.invalid : '' } ${ props.big ? styles.bigBox : '' }`}>
                <span className={`${styles.iconWrap} ${ props.type === 'email' ? styles.email : '' }`}>
                    <img src={ icon } className={ styles.img }/>
                </span>
                {
                    !props.big &&
                    <input
                        type={ props.type ==='password' ? 'password' : 'text' }
                        className={`${ styles.input } ${ props.valid === false ? styles.invalid : '' }`}
                        placeholder={ props.placeholder ? props.placeholder : '' }
                        onChange={ (e) => props.changeFunc(e.target.value) }
                        onKeyDown={ props.onKeyDown ? props.onKeyDown : () => {} }
                        onFocus={ props.onFocus }
                    />
                }
                {
                    props.big &&
                    <textarea
                        type={ props.type ==='password' ? 'password' : 'textarea' }
                        className={`${ styles.input } ${ props.valid === false ? styles.invalid : '' } textarea`}
                        placeholder={ props.placeholder ? props.placeholder : '' }
                        onChange={ handleChange }
                        onKeyDown={ props.onKeyDown ? props.onKeyDown : () => {} }
                        onFocus={ props.onFocus }
                    />
                }

            </span>
        </>
    )
}