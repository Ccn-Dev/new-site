import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { api } from '../funcs/apiCall'
import styles from '../styles/login.module.scss'

const log = console.log

const ErrBox = ({ msg, setErrMsg }) => {

    const emptyErr = () => {
        setErrMsg('')
    }

    return (
        <span className={ styles.errBox }>
            <p className={ styles.msgBox }>{ msg }</p>
            <p
                className={ styles.errClose }
                onClick={ emptyErr }
            >X</p>
        </span>
    )
}

export default function Login() {

    const navigate = useNavigate()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')

    const login = async () => {

        await api.post('auth', {
            username: email,
            password: password
        }).then((res) => {
            
            if (!res.data.error) {
                localStorage.setItem('token', res.data.jwt_token)
                localStorage.setItem('userEmail', email)

                api.get2('userdata', { "jwttoken": res.data.jwt_token, }).then((res) => {

                    let name = res.data.name
                    let tmp = name.split(' ')
                    
                    tmp = tmp.map((name) => (name[0].toUpperCase() + name.slice(1)))
                    name = ''

                    for (let i=0; i<tmp.length; i++) {
                        name += tmp[i]

                        name += (i == (tmp.length - 1)) ? '' : ' '
                    }

                    localStorage.setItem('name', name)
                })
                navigate('/Restocks')
            }
            else {
                log(res)
                setErrMsg('Invalid email or password')
            }
        }).catch((e) => {
            setErrMsg('Error in request (contact the technical team')
        })
    }

    const _handleKeyDown = (e) => {

        if (e.key === 'Enter') {
            login()
        }
    }

    return (
        <div className={ styles.wrap }>
            <section className={ styles.left }>
                {
                    errMsg !== '' &&
                    <ErrBox
                        msg={ errMsg }
                        setErrMsg={ setErrMsg }
                    />
                }
                <div className={ styles.formWrap }>
                    <div className={ styles.top }>
                        <div className={ styles.headerWrap }>
                            <h1 className='bigger-title'>Log In</h1>
                            <p>Crep Chief Notify Staff Backend.</p>
                        </div>
                        <TextField
                            class={ styles.input }
                            type='email'
                            placeholder='Email'
                            changeFunc={ setEmail }
                            onKeyDown={ _handleKeyDown }
                        />
                        <TextField
                            class={ styles.input }
                            type='password'
                            placeholder='Password'
                            changeFunc={ setPassword }
                            onKeyDown={ _handleKeyDown }
                        />
                        <div className={ styles.forgottenPass }>
                            <Link to="/">Forgotten Password</Link>
                        </div>
                        <Button label='Login' onClick={ login }/>
                    </div>
                    <div className={ styles.bottom }>
                        <img src='/imgs/logos/crepchief-full-text-logo.svg' className={ styles.longLogo }/>
                    </div>
                </div>
            </section>
            <section className={ styles.right }></section>
        </div>
    )
}