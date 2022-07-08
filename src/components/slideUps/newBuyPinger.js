import { useState, useEffect, useRef } from 'react'
import { api } from '../../funcs/apiCall'
import DropDown from '../DropDown'
import styles from '../../styles/components/slideUps/newBuyPinger.module.scss'
import TextField from '../TextField'
import Button from '../Button'

const log = console.log

export default function NewBuyPinger (props) {

    const token = useRef(localStorage.getItem('token')).current

    const [ category, setCategory ] = useState('')
    const [ name, setName ] = useState('')
    const [ url, setURL ] = useState('')
    const [ retail, setRetail ] = useState('')
    const [ resell, setResell ] = useState('')
    const [ releaseDate, setReleaseDate ] = useState('')
    const [ releaseTime, setReleaseTime ] = useState('')
    const [ img, setImg ] = useState('https://cdn.discordapp.com/attachments/871750276426649640/961933446496813056/Stockimage-01.png')
    const [ discordImg, setDiscordImg ] = useState('')
    const [ desc, setDesc ] = useState('')
    const [ sellingTime, setSellingTime ] = useState('')
    const [ returns, setReturns ] = useState('')
    const [ shipping, setShipping ] = useState('')
    const [ soldListing, setSoldListing ] = useState('')
    const [ whereToSell, setWhereToSell ] = useState('')

    const [ lastField, setLastField ] = useState('')
    const [ currentField, setCurrentField ] = useState('')
    const [ valid, setValid ] = useState({
        'Product Name': true,
        'Product URL': true,
        'Retail': true,
        'Resell': true,
        'Release Date (dd.mm.yy)': true,
        'Release Time (hh.mm)': true,
        'Image URL': true,
        'Description': true,
        'Average Selling Time': true,
        'Returns': true,
        'Shipping Cost (£)': true,
        'Ebay Sold Listing URL': true,
        'Where To Sell': true
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
            'Product Name': name,
            'Product URL': url,
            'Retail': retail,
            'Resell': resell,
            'Release Time': releaseDate,
            'Image URL': img,
            'Description': desc,
            'Average Selling Time': sellingTime,
            'Returns': returns,
            'Shipping Cost (£)': shipping,
            'Ebay Sold Listing URL': soldListing,
            'Where To Sell': whereToSell
        }

        tmp[field] = ((value[field] === '' || value[field] === null) ? false : true)
        console.log(`FIELD: ${field}\nVALUE: ${value[field]}\nVALID: ${tmp[field]}`)
        

        setValid({
            ...tmp
        })
    }

    const allFilled = () => {

        let filled = name !== '' & url !== '' & retail !== '' & resell !== '' & releaseDate !== '' & img !== '' & desc !== '' & returns !== '' & shipping !== '' & soldListing !== '' & whereToSell !== '' & sellingTime != '' & category !== ''

        setBtnActive(filled)
    }

    useEffect(() => {
        allFilled()
    }, [ name, url, retail, resell, releaseDate, img, desc, returns, shipping, soldListing, whereToSell, sellingTime, category ])

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
            icon: '/imgs/icons/person.png',
            title: 'Product Name',
            set: setName
        },
        {
            icon: '/imgs/icons/link-black.png',
            title: 'Product URL',
            set: setURL
        },
        {
            icon: '/imgs/icons/price-tag-black.png',
            title: 'Retail',
            set: setRetail
        },
        {
            icon: '/imgs/icons/price-tag-black.png',
            title: 'Resell',
            set: setResell
        },
        {
            icon: '/imgs/icons/clock.png',
            title: 'Release Date (dd.mm.yy)',
            set: setReleaseDate
        },
        {
            icon: '/imgs/icons/clock.png',
            title: 'Release Time (hh.mm)',
            set: setReleaseTime
        },
        {
            icon: '/imgs/icons/img.png',
            title: 'Image URL',
            set: setImgBuffer
        },
        {
            icon: '/imgs/icons/discord.png',
            title: 'Discord Image (URL)',
            set: setDiscordImg
        },
        {
            icon: '/imgs/icons/pencil.png',
            title: 'Description',
            set: setDesc
        },
        {
            icon: '/imgs/icons/clock.png',
            title: 'Average Selling Time',
            set: setSellingTime
        },
        {
            icon: '/imgs/icons/returns.png',
            title: 'Returns',
            set: setReturns
        },
        {
            icon: '/imgs/icons/lorry.png',
            title: 'Shipping Cost (£)',
            set: setShipping
        },
        {
            icon: '/imgs/icons/link-black.png',
            title: 'Ebay Sold Listing URL',
            set: setSoldListing
        },
        {
            icon: '/imgs/icons/store.png',
            title: 'Where To Sell',
            set: setWhereToSell
        }
    ]).current

    const textFields = fields
    // const [ open, setOpen ] = useState(false)
    const [ items, setItems ] = useState([
        { label: 'News', value: 'news' },
        { label: 'Sneakers', value: 'sneakers' },
        { label: 'Console', value: 'console' },
        { label: 'Hardware', value: 'hardware' },
        { label: 'Outdoor', value: 'outdoor' },
        { label: 'Miscellaneous', value: 'misc' },
        { label: 'Developer Testing', value: 'devtest' },
    ])

    const addNewBuy = () => {

        try {
            api.post('add_newbuy', {
                "jwttoken": token ,
                "product_name": name,
                "url": url,
                "price": retail,
                "resell_value": resell,
                "release_time": `${releaseDate} ${(releaseTime !== '') ? releaseTime : 'N/A'}`,
                "image_url":  img,
                "return_policy": returns,
                "description": desc,
                "where_to_sell": whereToSell,
                "ebay_listings": soldListing,
                "shipping_cost":  shipping,
                "selling_time": sellingTime,
                "category": category
            }).then((res) => {
                console.log(res.data)
                if(res.data.status == "success"){
                    alert("Notification Successfully Sent")
                }
            })
        }
        catch (e) {
            console.log('FAILED TO ADD NEW BUY: ', e)
        }
    }

    return (
            <div className={ styles.wrap }>
                <div className={ styles.innerWrap }>
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
                        icon={ field.icon }
                        onFocus={ () => changeField(field.title) }
                        />)
                    }
                </div>
                <Button
                    label="Send Notification"
                    disabled={ !btnActive }
                    onClick={ addNewBuy }
                />
            </div>
    )
}