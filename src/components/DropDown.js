import { useState, useEffect, useRef } from 'react'
import styles from '../styles/components/dropdown.module.scss'

const Item = ({ item, setValue, toggleOpen, setPlaceholder, parentOnPress }) => {

    return (
        <div className={ styles.item }
            onClick={ () => {
                setValue(item.value)
                setPlaceholder(item.label)
                toggleOpen()
        
                if (parentOnPress) {
                    parentOnPress()
                }
            }}
        >
            <p className={ styles.itemLabel }>{ item.label }</p>
        </div>
    )
}

export default function DropDown(props) {

    const [ open, setOpen ] = useState(false)
    const [ placeholder, setPlaceholder ] = useState(props.placeholder)

    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className={`${ styles.wrap }`}>
            <div className={ styles.topWrap }
                onClick={ toggleOpen }
            >
                <div className={ styles.left }>
                    {
                        props.icon &&
                        <div className={ styles.iconWrap }>
                            <img
                                src={ props.icon }
                                className={ styles.icon }
                            />
                        </div>
                    }
                    <p className={ styles.placeholder }>{ placeholder }</p>
                </div>
                <img
                    src='/imgs/icons/arrow_2.png'
                    className={`${ styles.arrow } ${ open ? styles.rotate : '' }`}
                />
            </div>
            {
                open &&
                <div className={ styles.itemWrap }>
                    {
                        props.items.map((item) => (
                            <Item
                                item={ item }
                                setValue={ props.setValue }
                                toggleOpen={ toggleOpen }
                                setPlaceholder={ setPlaceholder }
                                parentOnPress={ () => {
                                    if (props.onPress) {
                                        props.onPress()
                                    }
                                } }
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}