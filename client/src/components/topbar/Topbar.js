import React from 'react';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import {COLORS} from '../values/colors.js';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Link, useHistory, useLocation   } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withStyles } from '@material-ui/core/styles';
import { styles } from './topbarStyle';
import { useMediaQuery } from 'react-responsive';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {Searche } from '../../constants';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SimplePopover from '../popover/SimplePopover';

function Topbar({ classes, setSelectedValue, isProfile, setSearchTerm }) {
    const [fv, setFv] = useState(0); 
    const { user }    = useContext(AuthContext);
    const PF          = process.env.REACT_APP_PUBLIC_FOLDER;
    const [anchorEl, setAnchorEl] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    
    const location = useLocation();
    const history = useHistory();
    const isPostDetailPage = location.pathname.startsWith('/postdetail'); 


    
      
    useEffect(() => {
        //console.log("is Profile value");
        //console.log(isProfile);
      }, []);

    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });
    const isLaptop       = useMediaQuery({ query: "(min-device-width: 1024px)", });
    const isDesktop      = useMediaQuery({ query: "(min-device-width: 1200px)", });
    const isBigScreen    = useMediaQuery({ query: "(min-device-width: 1201px )", });

    const timeLineClick = (event) => {
        //console.log('Clicked ' + event.currentTarget)
    };

    const openProfileDetails = (event) => {
        //console.log('Clicked ' + event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function setSearchTermFunction(value) {
        setSearchTerm(value);
      }
      
      const handleBackClick = () => {
        if (isPostDetailPage) {
          history.goBack();  // Go back to the previous page if on post detail page
        } else {
          history.push('/');  // Navigate to the home page if not on post detail page
        }
      };

    const onRadioChanged = e => {
        //console.log("radio avlues")
        //console.log(e.target.value)
        setSelectedValue(e.target.value)
        //setUpdatedPosts(e.target.value)
        //try {
        //    console.log("radio avlues")
        //dispatch({ type: "RADIO", payload: e.target.value });
        //this.props.fetchPosts(e.target.value)
        //} catch (err) {
        //    console.log(err)
        //}<div className={classes.searchbar}>
        //<Search className={classes.searchIcon} />
        //<input placeholder="Search" className={classes.searchInput} />
    //</div>

    //<div className={classes.topbarCenter} style={{ 'backgroundColor': '#3e3f40', 'margin-top': (isMobileDevice || isTabletDevice) && '20px', 'display':  !isMobileDevice && !isTabletDevice && 'flex'}}  >
    // </div>
    // (isMobileDevice || isTabletDevice) &&
    };

    return (
        <div className={classes.topbarContainer} style={{ 'backgroundColor': COLORS.backgroudColor, 'display': (isMobileDevice || isTabletDevice) && 'flex' , 'height': isProfile && '40px' }}>
            
            <div className={classes.topbarLeft} style={{'width' : window.innerWidth, justifyContent: 'space-between'}}>
            
            <div style={{ alignItems: 'flex-start' }}>
          <div onClick={handleBackClick} className={classes.titleAndIcon} style={{ cursor: 'pointer' }}>
            {isPostDetailPage ?
              (<ArrowBackIcon className={classes.homeIcon} sx={{ color: COLORS.homeIconColor }} style={{ marginTop: !isMobileDevice && !isTabletDevice && '10px' }} />) :
              (<HomeIcon className={classes.homeIcon} sx={{ color: COLORS.homeIconColor }} style={{ marginTop: !isMobileDevice && !isTabletDevice && '10px' }} />)}

            {!isMobileDevice && !isTabletDevice && !isPostDetailPage && <span className={classes.logo} style={{ marginTop: !isMobileDevice && !isTabletDevice && '10px' }}>TWON</span>}
            {(isMobileDevice || isTabletDevice) && <span className={classes.logo}>TWON</span>}
          </div>
        </div>

            {!isMobileDevice && !isTabletDevice && 
            <div style={{'display': 'flex', alignItems: 'flex-end', 'margin': '5px 5px'}}>
                     <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', cursor:'default'}}>
                         <img  src={user.profilePicture? PF + user.profilePicture: PF + "person/noAvatar.png"} alt="" className={classes.topbarImg} style={{cursor:'default'}}/>
                         <p className={classes.username}>{user.username}</p>
                     </Link>
                     <KeyboardArrowDownIcon className={classes.downArrow} onClick={openProfileDetails} /> 
                     <SimplePopover anchorEl={anchorEl} handleClose={handleClose} />
            </div>}

            </div>

            {!isProfile?
            <div className={classes.topbarCenter} style={{ 'backgroundColor': COLORS.backgroudColor, 'margin-top': (isMobileDevice || isTabletDevice) && '0px', 'display':  !isMobileDevice && !isTabletDevice && 'flex'}}  >
                {/*<div className={classes.searchbar}>
                    <Search className={classes.searchIcon} />
                    <input placeholder={Searche} className={classes.searchInput} onChange={(event) => { setSearchTermFunction(event.target.value);}}/>
                </div>*/}
            </div>: <div></div>
            }

            {/*!isProfile?
            {<div className={classes.topbarRight} style={{ 'margin-top': '-10px', 'backgroundColor': COLORS.backgroudColor, 'margin-top': '0px', 'display':  'flex', 'flex':  '4', 'flex-direction':  'row' }}>
                <FormControl row={true} style={{ 'margin-left': '0', "fontSize": "10px" }}>
                    <FormLabel id="demo-radio-buttons-group-label" style={{ text: 'white', 'margin': '0' }}></FormLabel>
                    <RadioGroup style={{ 'margin': '0', "fontSize": "10px" }} aria-labelledby="demo-radio-buttons-group-label" defaultValue="0" row={true} name="radio-buttons-group" onChange={onRadioChanged}>
                        <FormControlLabel value="0" control={<Radio />} label={<span style={{ "fontSize": !isMobileDevice && !isTabletDevice && "12px"}}>{"Recommended"}</span>} />
                        <FormControlLabel value="1" control={<Radio />} label={<span style={{ "fontSize": !isMobileDevice && !isTabletDevice && "12px"}}>{"Followers"}</span>} />
                        <FormControlLabel value="2" control={<Radio />} label={<span style={{ "fontSize": !isMobileDevice && !isTabletDevice && "12px"}}>{"Followings"}</span>} />
                    </RadioGroup>
            </FormControl>}
            </div> : <div></div>to={`/profile/${user.username}`} to={`/profile/${user.username}`} 
            */}
            {(isMobileDevice || isTabletDevice) && 
            <div className={classes.topbarRight} >
                <div className={classes.userInfo} style={{ alignItems: 'flex-end' }}>
                    <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', cursor:'default' }}>
                        <img src={ user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png" } alt="" className={classes.topbarImg} style={{cursor:'default'}}/>
                        <p className={classes.username}>{user.username}</p>
                    </Link>
                     <KeyboardArrowDownIcon className={classes.downArrow} onClick={openProfileDetails} /> 
                    <SimplePopover anchorEl={anchorEl} handleClose={handleClose} />
                </div>
            </div>}
        </div>
    )
}

export default withStyles(styles)(Topbar);