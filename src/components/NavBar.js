import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import styles from '../styles/components/nav.module.scss'
import SlideUp from './SlideUp'
import NewBuyPinger from './slideUps/newBuyPinger'
import NewGuide from './slideUps/newGuide'
import NewProduct from './slideUps/newProduct'
import RestockPinger from './slideUps/restockPinger'

const NavItem = ({ data, onClick }) => {

    return (
        <span
            className={`${ styles.item } ${ data.class ? data.class : '' }`}
            onClick={ data.onClick ? data.onClick : onClick }
        >
            {
                data.light &&
                <img
                    src={ data.current ? data.dark : data.light }
                    className={`${ styles.img } ${ data.imgClass ? data.imgClass : '' }`}
                />
            }
            {
                data.title &&
                <p className={`${ styles.title }  ${ data.current ? styles.dark : styles.light  }`}>{ data.title }</p>
            }
        </span>
    )
}

export default function NavBar({ current, slideBlur }) {

    const navigate = useNavigate()
    const [ addMenuOpen, setAddMenuOpen ] = useState()
    const [ slideUp, setSlideUp ] = useState(null)

    const toggleAddMenu = () => {
        setAddMenuOpen(!addMenuOpen)
    }

    useEffect(() => {

        slideBlur(slideUp)
    }, [ slideUp ])

    useEffect(() => {
        console.log('ADD MENU: ', addMenuOpen)
        console.log('HIYA')
    }, [ addMenuOpen ])

    const navItems = useRef([
        {
            light: '/imgs/icons/new-btn.svg',
            dark: '/imgs/icons/new-btn.svg',
            class: styles.newBtn,
            onClick: toggleAddMenu
            // current: current === 0
        },
        {
            title: 'Restocks',
            slug: 'Restocks',
            light: '/imgs/icons/restock-label-light.png',
            dark: '/imgs/icons/restock-label-dark.png',
            current: current === 0
        },
        {
            title: 'New Buys',
            slug: 'New-Buys',
            light: '/imgs/icons/new-buys-light.png',
            dark: '/imgs/icons/new-buys-dark.png',
            current: current === 1
        },
        {
            title: 'News',
            slug: 'news',
            light: '/imgs/icons/book-light.png',
            dark: '/imgs/icons/book-dark.png',
            current: current === 2
        },
        {
            title: 'Analytics',
            slug: 'analytics',
            light: '/imgs/icons/analytics-light.png',
            dark: '/imgs/icons/analytics-dark.png',
            imgClass: styles.analytics,
            current: current === 3
        },
        {
            title: 'Settings',
            slug: 'settings',
            light: '/imgs/icons/settings-light.png',
            dark: '/imgs/icons/settings-dark.png',
            current: current === 4
        }
    ]).current

    const addMenuItems = useRef([
        {
            title: 'Restock',
            onClick: () => setSlideUp(1)
        },
        {
            title: 'New Product',
            onClick: () => setSlideUp(2)
        },
        {
            title: 'New Buy',
            onClick: () => setSlideUp(3)
        },
        {
            title: 'Guides & News',
            onClick: () => setSlideUp(4)
        },
        // {
        //     title: 'Release Reminder',
        //     onClick: () => setSlideUp(5)
        // }
    ]).current

    return (
        <>
            {
                addMenuOpen &&
                <ul className={ styles.addMenu }>
                    {
                        addMenuItems.map((item) => (
                            <li onClick={ item.onClick }>
                                { item.title }
                            </li>
                        ))
                    }
                </ul>
            }
            {
                slideUp &&
                <SlideUp buffer={ setSlideUp }>
                    { slideUp === 1 && <RestockPinger /> }
                    { slideUp === 2 && <NewProduct /> }
                    { slideUp === 3 && <NewBuyPinger /> }
                    { slideUp === 4 && <NewGuide /> }
                    {/* { slideUp === 5 && <RestockPinger /> } */}
                </SlideUp>
            }
            <div className={ styles.wrap }>
                <span>
                    <img src='/imgs/icons/acronym-logo.png' className={ styles.logo }/>
                </span>
                {
                    navItems.map((item) => <NavItem data={ item } onClick={ () => navigate(`/${ item.slug }`) }/>)
                }
            </div>
        </>
    )
}