import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Image } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function GoToLogin() {
    const navigate = useNavigate();
    navigate('login')
}
const theme = createTheme({
    status: {
        danger: '#17223A',
    },
});
export default function WelcomePage() {
    const navigate = useNavigate();
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        axios.get(`https://api.crepchiefnotify.com/api/v1/checkauth?&jwttoken=${token}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.admin == "true" || res.data.admin == true) {
                navigate("/Restocks")
            } else {
                navigate("/Login")
            }
        })
    })

    return (
        <div className='App' >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: "50%",
                            alignItems: 'center',
                            verticalAlign: 'middle',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"


                        }}
                    >

                        <img src="https://media.discordapp.net/attachments/871750276426649640/940203773643608074/notify_long-01.png?width=2268&height=353" />

                        <Box component="form" noValidate sx={{ mt: 1 }}>

                            <Button
                                onClick={() => { navigate('login') }}
                                fullWidth

                                sx={[{ mt: 3, mb: 2, paddingLeft: 10, paddingRight: 10, backgroundColor: theme.status.danger, color: 'white' }]}

                            >
                                Login
                            </Button>
                            <Grid container>

                                <Grid item>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        </div>
    );
}