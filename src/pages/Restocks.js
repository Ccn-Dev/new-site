import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Alert from '../components/Alert'
import Page from '../components/layouts/Page'
import SlideUp from '../components/SlideUp'
import StatCount from '../components/StatCount'
import { api } from '../funcs/apiCall'
import styles from '../styles/appfeed.module.scss'

const RestockItem = ({ item, loadNotis, setAlert }) => {

    const [ title, setTitle ] = useState(item.title)
    const token = useRef(localStorage.getItem('token')).current
    const [ remove, setRemove ] = useState(false)
    const alertBuffer = (val) => setAlert(val)
    
    useEffect(() => {
        if (remove) {
            deleteItem(item)
        }
    }, [ remove ])

    const deleteHandler = () => {
        api.get2('userdata', { "jwttoken": token }).then((res) => {

            let admin = res.data.admin_perms.can_delete

            if (admin === true) {
                setAlert({
                    desc: 'Delete Notification',
                    setFunc: setRemove,
                    btns: [
                        {
                            label: 'Cancel',
                            returnValue: false
                        },
                        {
                            label: 'Delete',
                            returnValue: true
                        },
                    ]
                })
            }
        })
    }
    
    const deleteItem =  async (item) => {

        // EXPO TOKEN NEEDS TO BE REMOVED FROM ENDPOINT PARAMETERS

        let tmpRes = {}

        console.log(`jwttoken: ${token}\nnotifid: ${item.id}`)
        
        api.get2('notificationdelete', { "jwttoken": token, "notifid": item.id}).then((res) => {
            
            tmpRes = res

            if (res.data.status === 'deleted') {
                // alert('Notification Deleted!')
                
                axios.post("https://discord.com/api/webhooks/946788182450663425/sWO5t8nQTXFT05W93eboSnmrWLId5pPwOmyjv8epGKO1NcCcr51K_Rt2B-r4Gr2puMGL",
                    {
                    "content": null,
                    "embeds": [
                        {
                        "title": "Notification Deleted",
                        "color": 10609016,
                        "fields": [
                            {
                            "name": "Item:",
                            "value": item.title
                            },
                            {
                            "name": "Notification Ping Time:",
                            "value": item.time
                            },
                            {
                            "name": "Deleted By:",
                            "value": localStorage.getItem('name')
                            },

                        ],
                        "thumbnail": {
                            "url": item.image
                        }
                        }
                    ],
                    }
                )
                loadNotis()
            }
            else {
                // alert(res.data.error)
            }
        }).catch((e) =>{
            console.log(e)
            console.log(tmpRes)
        })
    }

    useEffect(() => {

        setTitle(item.title.slice(0,26).trim() + '...')
    }, [])
 
    return (
        <li
            className={`${ styles.restockItem } ${ styles.restockTable }`}
            onClick={ () => window.open(item.store_link, '_blank') }
        >
            <span className={ styles.imgWrap }>
                <img src={ item.image }/>
            </span>
            <p>{ title }</p>
            <p>{ item.store }</p>
            <p>[ Name ]</p>
            <p>[ Time ]</p>
            <p>[ Date ]</p>
            <div className={ styles.iconWrap }>
                <img
                    src='/imgs/icons/bin.png'
                    className={ styles.icon }
                    onClick={ deleteHandler }
                />
            </div>
        </li>
    )
}

export default function Restocks({ setOverlay }) {

    const [ notis, setNotis ] = useState([])
    const [ alert, setAlert ] = useState(null)
    // const [ slideUp, setSlideUp ] = useState(null)

    const loadNotis = async () => {

        await api.get2('notificationhistory', { jwttoken: localStorage.getItem('token') }).then((res) => {
            setNotis(res.data)
        }).catch((e) => {
            console.log('ERROR: ', e)
            setNotis([])
        })
    } 

    useEffect(() => {
        loadNotis()
    }, [])

    useEffect(() => {
        console.log(notis)
    }, [ notis ])

    return (
        <>
            <Page
                title='Latest Restock Feed'
                current={ 0 }
                blur={ alert }
                alert={ alert }
                alertBuffer={ setOverlay }
            >
                <section className='stat2'>
                    <StatCount
                        label='Restocks This Week'
                        value={ 29 }
                        direction='up'
                    />
                    <StatCount
                        label='Restock Link Clicks'
                        value={ 2141 }
                        direction='down'
                    />
                </section>
                <section className={ styles.restockFeedWrap }>
                    <ul className={`${ styles.restockTitles } ${ styles.restockTable }`}>
                        <li>Image</li>
                        <li>Title</li>
                        <li>Store</li>
                        <li>Published By</li>
                        <li>Time</li>
                        <li>Date</li>
                    </ul>
                    <ul className={`${ styles.restockFeed }`}>
                        {
                            notis &&
                            notis.map((item) => (<RestockItem item={ item } loadNotis={ loadNotis } setAlert={ setAlert }/>))
                        }
                    </ul>
                </section>
            </Page>
        </>
    )
}