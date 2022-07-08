import { useState, useRef, useEffect} from 'react'
import { api } from '../../funcs/apiCall'
import Button from '../Button'
import TextField from '../TextField'

export default function NewGuide() {

    const [ title, setTitle ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ url, setURL ] = useState('')
    const [ imgURL, setImgURL ] = useState('')
    const [ desc, setDesc ] = useState('')
    const token = useRef(localStorage.getItem('token')).current

    const [ valid, setValid ] = useState({
        title: true,
        category: true,
        url: true,
        imgURL: true,
        desc: true
    })

    const fields = [
        {
            name: 'Title',
            set: setTitle,
            valid: valid.title,
            icon: ''
        },
        {
            name: 'Category',
            set: setCategory,
            valid: valid.category,
            icon: '/imgs/icons/link-black.png'
        },
        {
            name: 'Image URL',
            set: setImgURL,
            valid: valid.imgURL,
            icon: '/imgs/icons/img.png'
        },
        {
            name: 'Article',
            set: setDesc,
            valid: valid.desc,
            icon: '/imgs/icons/pencil.png',
            big: true
        },
    ]

    const uploadGuide = () => {

        console.log({
            "jwttoken": token,
            "title": title,
            "image_url": imgURL,
            "article": desc,
            "category": category
        })

        api.post('add_guide_news', {
            "jwttoken": token,
            "title": title,
            "image_url": imgURL,
            "article": desc,
            "category": category
        }).then((res) => {
            console.log(res)
        })
    }

    return (
        <>
            {
                fields.map((field) => (
                    <TextField
                        placeholder={ field.name }
                        icon={ field.icon }
                        valid={ field.valid }
                        big={ field.big ? true : false }
                        changeFunc={ field.set }
                    />
                ))
            }
            <Button
                label='Send Notification'
                onClick={ uploadGuide }
            />
        </>
    )
}