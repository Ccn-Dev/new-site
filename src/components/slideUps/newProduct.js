import { useState, useEffect, useRef  } from 'react'
import Button from '../Button'
import TextField from '../TextField'
import styles from '../../styles/components/slideUps/newProduct.module.scss'
import { api } from '../../funcs/apiCall'

export default function NewProduct() {

    const defaultImg = useRef('https://cdn.discordapp.com/attachments/889814604190978108/961213852706570330/Icon_material-file-upload3x.png').current
    const token = useRef(localStorage.getItem('token')).current
    const [ name, setName ] = useState('')
    const [ resellValue, setResellValue ] = useState('')
    const [ img, setImg ] = useState(defaultImg)
    const [ parsedImg, setParsedImg ] = useState()

    const [ valid, setValid ] = useState({
        name: true,
        resell: true
    })

    const changeHandler = (e) => {

        setImg(e.target.files[0])
        setParsedImg(URL.createObjectURL(e.target.files[0]))
        setName(e.target.files[0].name)
    }

    const changeField = (field) => {

        if (field === 'name') {

        }

        if (field === 'resell') {
            
        }
    }

    const addImg = () => {

        const data = new FormData()

        data.append("name", name)
        data.append("jwttoken", token )
        data.append("image", img)
        data.append("resell_value", resellValue)

        try {
            api.post('addimage', data).then((res) => {
                console.log(res)
            })
        }
        catch (e) {
            console.log('ERROR: ', e)
        }
    }

    useEffect(() => {
        console.log(img)
    }, [ img ])

    return (
        <>
            <div className={ styles.wrap }>
                <div
                    className={ styles.imgWrap }
                    onClick={ () => document.getElementById('img-selector').click() }
                >
                    {
                        img === defaultImg &&
                        <img src={ defaultImg } className={ styles.img }/>
                    }
                    {
                        img !== defaultImg &&
                        <img src={ parsedImg } className={ styles.img }/>
                    }
                </div>
                <input
                    type='file'
                    id='img-selector'
                    hidden
                    accept='image/png, image/gif, image/jpeg'
                    onChange={ changeHandler }
                />
                {
                    console.log(img)
                }
                <TextField
                    class={ styles.textInput }
                    placeholder="Product Name"
                    changeFunc={ setName }
                    valid={ valid.name }
                    onFocus={ () => changeField('name') }
                />
                <TextField
                    placeholder="Resell Value"
                    changeFunc={ setResellValue }
                    icon='/imgs/icons/price-tag-black.png'
                    valid={ valid.resell }
                    onFocus={ () => changeField('resell') }
                />
                <Button
                    label='Add Product'
                    onClick={ addImg }
                />  
            </div>
        </>
    )
}