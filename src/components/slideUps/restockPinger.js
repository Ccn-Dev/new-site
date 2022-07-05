import { useState, useEffect, useRef } from 'react'
import { api } from '../../funcs/apiCall'
import Button from '../Button'
import TextField from '../TextField'
import styles from '../../styles/components/slideUps/restockPinger.module.scss'
import DropDown from '../DropDown'


export default function RestockPinger(props) {
    
    const token = useRef(localStorage.getItem('token')).current

    const [ category, setCategory ] = useState('')
    const [ url, setURL ] = useState('')
    const [ name, setName ] = useState('')
    const [ store, setStore ] = useState('')
    const [ img, setImg ] = useState('https://cdn.discordapp.com/attachments/871750276426649640/961933446496813056/Stockimage-01.png')
    const [ price, setPrice ] = useState(null)

    const [ lastField, setLastField ] = useState('')
    const [ currentField, setCurrentField ] = useState('')
    const [ valid, setValid ] = useState({
        'Product Category': true,
        'Product URL': true,
        'Product Name': true,
        'Store': true,
        'Image URL': true,
        'Price': true,
    })

    const [ btnActive, setBtnActive ] = useState(false)

    const changeField = (field) => {
        validate(currentField)
        setLastField(currentField)
        setCurrentField(field)
    }

    const validate = (field) => {

        let tmp = {
            ...valid
        }

        let value = {
            'Product Category': category,
            'Product URL': url,
            'Product Name': name,
            'Store': store,
            'Image URL': img,
            'Price': price,
        }

        tmp[field] = ((value[field] === '' || value[field] === null) ? false : true)
        console.log(`FIELD: ${field}\nVALUE: ${value[field]}\nVALID: ${!tmp[field]}`)
        

        setValid({
            ...tmp
        })
    }
    
    const allFilled = () => {

        let filled = category !== '' & url !== '' & name !== '' & store !== '' & img !== '' & price !== '' & price !== null

        setBtnActive(filled)
    }

    useEffect(() => {
        allFilled()
    }, [ category, url, name, store, img, price ])

    const setImgBuffer = (value) => {
        
        if (value === '' || value === ' ') {
            setImg('https://cdn.discordapp.com/attachments/871750276426649640/961933446496813056/Stockimage-01.png')
        }
        else {
            setImg(value)
        }
    }

    const fields = useRef([
        {
            icon: '',
            title: 'Product Category',
            set: setCategory
        },
        {
            icon: '/imgs/icons/link-black.png',
            title: 'Product URL',
            set: setURL
        },
        {
            icon: '',
            title: 'Product Name',
            set: setName
        },
        {
            icon: '/imgs/icons/store.png',
            title: 'Store',
            set: setStore
        },
        {
            icon: '/imgs/icons/img.png',
            title: 'Image URL',
            set: setImgBuffer
        },
        {
            icon: '/imgs/icons/price-tag-black.png',
            title: 'Price',
            set: setPrice
        }
    ]).current

    const textFields = fields.slice(1)
    
    const [ items, setItems ] = useState([
        { label: 'News', value: 'news' },
        { label: 'Sneakers', value: 'sneakers' },
        { label: 'Console', value: 'console' },
        { label: 'Hardware', value: 'hardware' },
        { label: 'Outdoor', value: 'outdoor' },
        { label: 'Miscellaneous', value: 'misc' },
        { label: 'Developer Testing', value: 'devtest' },
    ])

    const sendNoti = () => {
        if (btnActive) {
            api.post('notificationadd', {
                "title": name,
                "url": url,
                "image": img,
                "store": store,
                "price": price,
                "category": category,
                "jwttoken": token
            }).then((res) => {
                console.log(res.data)
                if(res.data.status == "success"){
                    alert("Notification Successfully Sent")
                }
            })
        }
        else {
            console.log('Yo')
        }
    }

    return (
        <div className={ styles.wrap }>
            <div>
                <DropDown
                    items={ items }
                    setValue={ setCategory }
                    icon='/imgs/icons/file.png'
                    placeholder='Product Category'
                />
                {
                    textFields.map((field) => <TextField
                        changeFunc={ field.set }
                        valid={ valid[field.title] }
                        placeholder={ field.title }
                        // type="custom"
                        icon={ field.icon }
                        onFocus={ () => changeField(field.title) }
                    />)
                }
                <Button
                    label="Send Notification"
                    onClick={ sendNoti }
                    class={ styles.sendBtn }
                    disabled={ !btnActive }
                />
            </div>
        </div>
    )
}