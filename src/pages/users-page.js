import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Select, MenuItem, InputLabel } from '@mui/material';
import { Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import NavBar from '../components/NavBar';
import { SupervisedUserCircleOutlined, SupervisedUserCircleRounded } from '@mui/icons-material';

export default function UsersPage() {
    const theme = createTheme();
    const navigate = useNavigate();
    const [token, setToken] = useState("")
    const [category, setCategory] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [buttonTitle, setButtonTitle] = useState("Select a file")

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      setToken(token)
      axios.get(`https://api.crepchiefnotify.com/api/v1/checkauth?&jwttoken=${token}`,{
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }).then((res) => {
        console.log(res.data)
        if(res.data.admin == "true" || res.data.admin == true){
          
        }else{
          navigate("/login")
        }
      })
    }) 
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
        setButtonTitle(event.target.files[0].name)
		setIsFilePicked(true);
	};
    const ImageThumb = ({ image }) => {
        return <img src={URL.createObjectURL(image)} alt={image.name} />;
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log(data.get('image_selector'))
        const token = localStorage.getItem("token");   
        const product_title = data.get('product_title')
        const product_image = selectedFile
        const userEmail = localStorage.getItem('userEmail')
        console.log(selectedFile.size)
        const dataArray = new FormData();
        dataArray.append("name", product_title);
        dataArray.append("jwttoken", token);
        dataArray.append("image", selectedFile);
        if(selectedFile.size <= 10000000){
          console.log("Image is greater")
        
        try{
            axios.post("https://api.crepchiefnotify.com/api/v1/addimage", dataArray,{
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              }
            }
               ).then((res) => {
                console.log(res.data)
                if (res.data.status == "success"){
                    setMessage(`${product_title} has been added!`)
                    axios.post("https://discord.com/api/webhooks/950692942140559390/qKUKdeUXyVjSYg5HR5z0zhQ36bvtMlOsbrcimkVRwCnJqwMjfHjra-fCRie4GNcLf4rQ", 
                        {
                            "content": null,
                            "embeds": [
                                {
                                  "title": "New Product Added",
                                  "color": 10609016,
                                  "fields": [
                                    {
                                        "name": "Product Title:",
                                        "value": product_title
                                      },
                                    {
                                      "name": "Added By:",
                                      "value": userEmail
                                    }
                                  ]
                                }
                              ],
                        }
                    )
                    setStatus("success")
                }else{
                    setMessage("An unknown error occurred, please try again later")
                    setStatus("error")
                }
            })
        }catch(error) {
            console.log(error)
            setMessage("An unknown error occurred, please try again later")
            setStatus("error")
            
        }
      }else{
        setMessage("Image is too large")
        setStatus("error")
      }
      };
    return(
        <div className='App'>
        <ThemeProvider theme={theme}>
            <NavBar />

          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SupervisedUserCircleRounded />
              </Avatar>
              <Typography component="h1" variant="h5">
               Crep Chief Notify Users
              </Typography>
              <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="product_title"
                  label="Search For User"
                  name="product_title"
                  
                  autoFocus
                 
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                 
                >
                  Search
                </Button>
                <Container component="main" maxWidth="md">
                    <Box>
                        
                    </Box>
                </Container>
                <Alert severity={status}>{message}</Alert>
              </Box>
            </Box>
           
          </Container>
        </ThemeProvider>
        </div>
    )
}