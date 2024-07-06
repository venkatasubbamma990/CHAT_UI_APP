import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client' 


const CreateUser = () => {
    const [username , setUsername] = useState("")
    const [loggedUser , setLoggedUser] =  useState("")
    const [message , setMessage] = useState('')
    const avatarSrc = "https://via.placeholder.com/40";
    const socket = io("http://localhost:4000")
    useEffect(()=>{
        socket.emit("session" , ({userId , username}) => {
            console.log(userId, username)
            setLoggedUser(username)
        })
    },[socket])
    const loginUser = () => {
        if(username === ""){
            alert("Please Enter Name")
        }
        else {
            setLoggedUser(username)
            socket.auth = { username : username};
            socket.connect();
            console.log(loggedUser)
        }
    }
    const HandleMessageChange = () => {
        if(message === ""){
            alert("Please Enter Message")
        }
        else {
            setMessage(message)
        }
    }

   

    return (
        <Grid align="center" >
            {
                loggedUser ?
                    <>
                    <Grid container spacing={2} my={2}>
                        <Paper elevation={5} sx={{ height: "700px" , width:"100%" , mx:3 , my:1 , border:"4px solid #406882"}} >
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Avatar alt={username} src={avatarSrc} sx={{ mr: 1 , backgroundColor : "#406882" }} /> {/* mr: margin-right */}
                            <Typography>
                                Logged in as <span style={{ fontWeight: "bold" }}>{username}</span>
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center"  alignItems="center">
                            <TextField
                            variant="outlined"
                            margin="normal"
                            label="Message"
                            placeholder="Enter Message "
                            onChange={HandleMessageChange}
                            sx={{width:"900px", marginRight : "5px"}}
                            />
                            <Button onClick={HandleMessageChange} style={{ backgroundColor: "#406882", color: "white", width: "220px", height: "55px" }}>
                                Send
                            </Button>
                        </Box>
                        </Paper>
                    </Grid>
                    </>
                    :
                    <>
                        <Typography align='center'>
                            <h1>Create User</h1>
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            label="Name"
                            placeholder="Enter Name"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Box>
                            <Button onClick={loginUser} style={{ backgroundColor: "#406882", color: "white", width: "220px", height: "40px" }}>
                                Join
                            </Button>
                        </Box>
                    </>
            }
        </Grid>
    )
}


export default CreateUser