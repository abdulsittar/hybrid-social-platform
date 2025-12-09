import React from 'react';
import { PermMedia, Label, Room, EmojiEmotions, Cancel, Height } from '@material-ui/icons';
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './shareStyle';
import { useMediaQuery } from 'react-responsive';
import InputEmoji from "react-input-emoji";
import SendIcon from '@mui/icons-material/Send';
import { Search } from '@material-ui/icons';
import { What_in_your_mind, Feelings } from '../../constants';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {io} from 'socket.io-client';

function Share({classes}) {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [text1, setText1] = useState('')
    const desc = useRef();
    const [file, setFile] = useState(null);
    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });
    const [socket, setSocket] = useState(null)


    useEffect(() => {
  if (socket) return; // prevent reinitialization

  try {
    // Same origin (works locally + in production)
    const SOCKET_URL = `${window.location.protocol}//${window.location.host}`;

    const newSocket = io('/', {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server:', newSocket.id);
      if (user?._id) newSocket.emit('addUser', user._id);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
    });

    newSocket.on('disconnect', (reason) => {
      console.warn('⚠️ Socket disconnected:', reason);
    });

    // Optional: Handle reconnect attempts
    newSocket.io.on('reconnect_attempt', () => {
      console.log('🔄 Attempting to reconnect...');
    });

    // cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up Share socket listeners...');
      newSocket.disconnect();
    };
  } catch (err) {
    console.error('Socket init error in Share:', err);
  }
}, []);

    /*useEffect(() => {
        socket?.emit('addUser', user?.id)
        console.log("active users ")
        socket?.on('getUsers', users => {
            console.log("active users ", users)
        })
    }, [socket])*/

    // submit a post
const submitHandler = async (e) => {
  console.log("📝 Submit Handler triggered");
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error("❌ No auth token found in localStorage");
    return;
  }

  const newPost = {
    userId: user._id,
    desc: text1,
    pool: user.pool,
    headers: { 'auth-token': token },
  };

  try {
    // --- 1️⃣ Handle file upload ---
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      await axios.post("/upload", data, {
        headers: { 'auth-token': token },
      });
    }

    // --- 2️⃣ Create post via API ---
    const response = await axios.post(`/posts/${user._id}/create`, newPost, {
      headers: { 'auth-token': token },
    });

    const createdPost = response.data;
    console.log("✅ Post created:", createdPost);

    // --- 3️⃣ Emit socket event safely ---
    if (socket && socket.connected) {
      socket.emit('sendMessage', createdPost);
      console.log("📨 Sent new post event via socket:", createdPost);
    } else {
      console.warn("⚠️ Socket not connected — skipping emit");
    }

    // --- 4️⃣ Reset form ---
    setText1("");
    setFile(null);
    // optionally refresh feed manually, e.g.:
    // fetchPosts();

  } catch (err) {
    console.error("❌ Error in submitHandler:", err);
  }
};

    function handleChange(text) {
        setText1(text)
        console.log("enter", text);
      }

      


    return (
        <div className={classes.share}>
            <div className={classes.shareWrapper}>
                <div className={classes.shareTop}>
                    <img
                        className={classes.shareProfileImg}
                        style={{height : (!isMobileDevice && !isTabletDevice)? '50px' : '50px' }}
                        src={
                        user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                    <InputEmoji
                        placeholder={What_in_your_mind + user.username + "?"}
                        className={classes.shareInput}
                        value={text1}
                        onChange={handleChange}
                        ref={desc}
                    />
                </div>
                <hr className={classes.shareHr}/>
                {file && (
                    <div className={classes.shareImgContainer}>
                        <img className={classes.shareImg} src={URL.createObjectURL(file)} alt="" />
                        <Cancel className={classes.shareCancelImg} onClick={() => setFile(null)} />
                    </div>
                )}
                <form className={classes.shareBottom} onSubmit={submitHandler}>
                    <div className={classes.shareOptions} style={{ height: "0px"}}>
                        <label htmlFor="file" className={classes.shareOption}>
                            <PermMedia htmlColor="tomato" className={classes.shareIcon} style={{ display: "none" }}/>
                            <span className={classes.shareOptionText} style={{ display: "none" }}>Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className={classes.shareOption} style={{ display: "none" }}>
                            <Label htmlColor="blue" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Tag</span>
                        </div>
                        <div className={classes.shareOption} style={{ display: "none" }}>
                            <Room  className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Location</span>
                        </div>
                        <div className={classes.shareOption} style={{ display: "none" }}>
                            <EmojiEmotions htmlColor="goldenrod" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>{"Gefühle"}</span>
                        </div>
                    </div>
                    <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<SendIcon/>} type="submit" onClick={submitHandler}> Send </Button>
            </Stack>
                </form>
            </div>
        </div>
    )
}

export default withStyles(styles)(Share);