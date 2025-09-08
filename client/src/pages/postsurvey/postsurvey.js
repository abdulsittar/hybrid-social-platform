import React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import Topbar from "../../components/topbar/Topbar.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import Feed from "../../components/feed/Feed.js";
import Rightbar from "../../components/rightbar/Rightbar.js";
import axios from "axios";
import { useParams } from 'react-router';
import { Add, Remove } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './postsurveyStyle.js';
import styled, { keyframes } from 'styled-components';
import LoadingBar from "react-top-loading-bar";

import { useMediaQuery } from 'react-responsive';
import TextField from '@material-ui/core/TextField'
import { colors } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useHistory } from "react-router";
import { ToastContainer } from 'react-toastify';
import {regSw, subscribe} from '../../helper.js';
import { Line, Circle } from 'rc-progress';
import { CSSTransition } from 'react-transition-group';
import { useScrollBy } from "react-use-window-scroll";
import { Submit_Post_Survey, post_q4_1, post_q4_2, post_q4_3, post_q4_4, post_q4_5, post_info_1, post_q2_op2,post_q2_op3, post_q2_op4,post_q3_op2 , post_q3_op3 ,post_q3_op4 ,A_user_with , post_info_4 ,post_q8_op5 , post_q4_op2 ,post_q4_op3 , post_q4_op4,post_q4_op6 ,post_q5_op2  ,post_q5_op3 ,post_q5_op4 ,post_q5_op6,
post_q6_op2 ,post_q6_op3 ,post_q6_op4 ,post_q6_op6 ,post_q7_op2 ,post_q7_op3 ,post_q7_op4 ,post_q7_op6 ,post_q8_op3 ,post_q8_op4 ,post_q8_op6 , post_q8_op7,  post_q9_op2, 
post_q9_op3,post_q9_op4 ,post_q9_op6 ,  post_info_5,post_q10_op1 ,post_q10_op2,post_q10_op3 ,post_q10_op4  ,post_q11_op2 ,post_q11_op3 ,post_q11_op4 ,_op1 ,post_info_6, post_q16_op2 ,post_q16_op3 ,post_q16_op4 , post_info_8 } from '../../constants.js';
import { post_info_3, post_info_0, post_info_2, q1_op1, q1_op2, q1_op3, q1_op4, q1_op5, q8_op7, q8_op6, disclaimor_1, dear_part_2, bitte_4, aimHEADING_5, aim_6, procedureHEADING_7, procedure_8, voluntaryHEADING_9, question0, name, voluntary_10, 
other_11, dataprotHEADING_12, dataprot_13, datasharingHEADING_14, datasharing_15, retentionHEADING_16, retention_17, furtherHEADING_18, further_19, complaints_20, best_21, nme_22, q0_info, q0, welcome2, consentHEADING_23, 
consent_24, weitere, jaa, neinn, heading_one, q1, ja2, nein2, q2, plzCon, screen, enony, note, q2_op1, q2_op2, q2_op3, q3, q3_op1, q3_op2, q3_op3, q3_op4, q3_op5, q3_op6, q3_op7, q4, q4_op1, q4_op2, q4_op3, q4_op4, q4_op5, q4_op6, q4_op7, q55, q5_op1, q5_op2,post_q13_op1,
q6, q7, q7_op1, q7_op2, q7_op3, q7_op4, q7_op5, q8, q8_op1,q8_op2,q8_op3,q8_op4, q8_op5, dank, welcome, login1, login2, infoPass, post_q1_op2, post_q5, post_q6, post_q8, post_q3, post_q10, post_q11, post_q12, post_q13, post_q14, post_q15, post_q16, post_q17, 
post_q18, post_q6_op1 ,post_q4,post_q2, post_q12_op1,post_q12_op6, postq_info_1, postq_info_2, postq_info_3, postq_info_4,  post_q6_op5 ,post_q7_op7 ,post_q9_op5 ,post_q9_op7,post_q9, post_q7_op1 ,post_q8_op1 , post_q6_op7 ,post_q4_op7 , post_q8_op2,post_q7_op5 ,post_q13_op2 , post_q13_op3,post_q13_op4 , post_q13_op5,
post_q13_op6 , post_q13_op7,post_q13_op8 , post_q13_op9,post_q13_op10,post_q15_op1, post_q15_op2, post_q15_op3, post_q15_op4,post_q15_op5 ,
post_q1,post_q14_info1, post_info_7 , post_q8_info, post_q8_in, last_info5, post_q11_info, last_info1, last_info2, last_info3, last_info4, last_info6, last_info7, last_info8, last_info9, last_info10, post_q19, post_q20, post_q21, post_q15_info1, post_q15_info2, post_q15_info3, 
post_q12_op5, post_q12_op7, post_q12_op8, post_q12_op9, post_q12_op10, post_q11_op11, post_q2_op1,post_q1_op1,post_q2_op5 ,post_q2_op6, post_q2_op7, post_q9_op1,post_q3_op1,post_q3_op5 ,post_q3_op6, post_q3_op7, post_q4_op1 ,post_q4_op5 , post_q5_op7,post_q5_op1 ,post_q5_op5 ,post_q7,
post_q119, post_q166, post_q17_op1, post_q11_op6, post_q17_op2, post_q17_op3, post_q17_op4, post_q17_op5,post_q16_op1, post_q16_op5,post_q10_op6 ,post_q10_op7 ,post_q10_op5,post_q11_op5,   post_q12_op2 ,post_q12_op3 ,post_q12_op4,post_q15_op6,
post_q15_op7, post_q11_op7, post_q11_op8, post_q11_op9, post_q11_op10, post_q13_info1, post_q13_info2, post_q13_info3, post_info_17,
post_q10_op1_1, post_q10_op2_1,post_q10_op3_1, post_q10_op4_1, post_q10_op5_1, post_q10_op6_1, post_q10_op7_1, post_q10_op1_2, post_q10_op3_2,
post_q10_op4_2, post_q10_op5_2, post_q10_op6_2, post_q10_op7_2, post_q10_op1_3, post_q10_op2_3, post_q10_op3_3, post_q10_op4_3, post_q10_op5_3, post_q14_op1, post_q14_op2, post_q14_op3, post_q14_op4, post_q14_op5,post_q11_op1,
post_q10_op6_3, post_q10_op7_3, post_q10_op2_2,last_info10_link,review_is_onward

} from '../../constants_RKI';

function Postsurvey({ classes }) {
    
  const scrollBy = useScrollBy();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preImage, setPreImage] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [bio, setBio] = useState("");
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState("");
    const history = useHistory();
    const [usr, setUsr] = useState({});
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [relationship, setRelationship] = useState("");
    const username = useParams().username;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });
    const [followed, setFollowed] = useState([]);
    const [isProfileFetched, setIsProfileFetched] = useState(true);
    const [prevUN, setPrevUN] = useState("");
    const [percent, setPercent] = useState(0);
    const [is_TestingFeedBack_visible, setIs_TestingFeedBack_visible] = useState(false);
    const [isUserReviewing, setIsUserReviewing] = useState(false);
    
    const [day_One_Percent, setDay_One_Percent] = useState(0);
    const [thumbnail, setThumbnail] = useState('');
    const [desc, setDesc] = useState('');
    const [postSpecificText, setPostSpecificText] = useState('');
    
    
    
    const [day_Two_Percent, setDay_Two_Percent] = useState(0);
    const [day_Three_Percent, setDay_Three_Percent] = useState(0);
    const [day_Four_Percent, setDay_Four_Percent] = useState(0);
    const [day_Five_Percent, setDay_Five_Percent] = useState(0);
    const [isWideScreen, setIsWideScreen] = useState(false);

    const [passwordErr, setPasswordErr] = useState('');

    const [isVisible, setIsVisible] = useState(true);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    
    const [is_code_visible, set_Is_code_visible] = useState(false);
    const [isSurveySubmitted, setIsSurveySubmitted] = useState(false);
    
    

    const [status_msg, stStatus_msg] = useState("Sie sind nicht berechtigt, an der Nachbefragung teilzunehmen");
    const [status_msg2, stStatus_msg2] = useState("");
    
    const [One_Post, Set_One_Post] = useState("");
    
    const [value_q1, stValue_q1] = useState('');
    const [value_q2, stValue_q2] = useState('');
    const [value_q3, stValue_q3] = useState('');
    const [value_q4, stValue_q4] = useState('');
    const [value_q5, stValue_q5] = useState('');
    const [value_q6, stValue_q6] = useState('');
    const [value_q7, stValue_q7] = useState('');
    const [someelseValue, setSomeelseValue] = useState('');
    
    const [value_q8, stValue_q8] = useState('');
    const [value_q9, stValue_q9] = useState('');
    
    const [value_q10, stValue_q10] = useState('');
    const [value_q10_1, stValue_q10_1] = useState('');
    const [value_q10_2, stValue_q10_2] = useState('');
    const [value_q10_3, stValue_q10_3] = useState('');
    
    const [value_q11, stValue_q11] = useState('');
    const [value_q12, stValue_q12] = useState('');
    const [value_q12_1, stValue_q12_1] = useState('');
    
    const [value_q13_1, stValue_q13_1] = useState('');
    const [value_q13_2, stValue_q13_2] = useState('');
    const [value_q13_3, stValue_q13_3] = useState('');
    const [value_q14, stValue_q14] = useState('');
    const [value_q15, stValue_q15] = useState('');
    
    const [value_q16, stValue_q16] = useState('');
    const [value_q17, stValue_q17] = useState('');
    const [value_q18, stValue_q18] = useState('');
    
    const [value_q19, stValue_q19] = useState('');
    const [value_q20, stValue_q20] = useState('');
    
    


  const [is_Q1_b_visible, setIs_Q1_visible] = useState(true);
  const [is_Q2_visible, setIs_Q2_visible] = useState(false);
  const [is_NoSurvey_visible, setIs_NoSurvey_visible] = useState(false);
  const [is_review_is_onward, setIs_review_is_onward]     = useState(true);
  
  const [is_Q3_visible, setIs_Q3_visible] = useState(false);
  const [is_Q4_visible, setIs_Q4_visible] = useState(false);
  
  const [is_Q5_visible, setIs_Q5_visible] = useState(false);
  const [is_Q6_visible, setIs_Q6_visible] = useState(false);
  const [is_Q7_visible, setIs_Q7_visible] = useState(false);
  const [is_Q8_visible, setIs_Q8_visible] = useState(false);
  const [is_Q9_visible, setIs_Q9_visible] = useState(false);
  const [is_Q10_visible_1, setIs_Q10_visible_1] = useState(false);
  const [is_Q10_visible, setIs_Q10_visible] = useState(false);
  const [is_Q10_visible_2, setIs_Q10_visible_2] = useState(false);
  const [is_Q10_visible_3, setIs_Q10_visible_3] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  const [is_Q11_visible, setIs_Q11_visible] = useState(false);
  const [is_Q12_visible, setIs_Q12_visible] = useState(false);
  const [is_Q12_visible_1, setIs_Q12_visible_1] = useState(false);
  
  const [is_Q13_1visible, setIs_Q13_1visible] = useState(false);
  const [is_Q13_2visible, setIs_Q13_2visible] = useState(false);
  const [is_Q13_3visible, setIs_Q13_3visible] = useState(false);
  const [is_Q14_visible, setIs_Q14_visible] = useState(false);
  const [is_Q15_visible, setIs_Q15_visible] = useState(false);
  const [is_Q16_visible, setIs_Q16_visible] = useState(false);
  const [is_Q17_visible, setIs_Q17_visible] = useState(false);
  const [is_Q18_visible, setIs_Q18_visible] = useState(false);
  const [is_Q19_visible, setIs_Q19_visible] = useState(false);
  const [is_Q20_visible, setIs_Q20_visible] = useState(false);
  const [is_Q21_visible, setIs_Q21_visible] = useState(false);
  const [is_Q22_visible, setIs_Q22_visible] = useState(false);
  const [is_Q23_visible, setIs_Q23_visible] = useState(false);
    
    
  const fadeInOut = keyframes`
0% {
  opacity: 0;
  transform: translateY(-20px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

const fadeOut = keyframes`
0% {
  opacity: 1;
  transform: translateY(0);
}
100% {
  opacity: 0;
  transform: translateY(-20px);
}
`;

// Styled component with dynamic animation
const AnimatedDiv = styled.div`
&.fade-enter {
  animation: ${fadeInOut} 1s forwards;
}
&.fade-exit {
  animation: ${fadeOut} 1s forwards;
}`;

const slideIn = keyframes`
from {
opacity: 0;
transform: translateX(100%);
}
to {
opacity: 1;
transform: translateX(0);
}
`;

const slideOut = keyframes`
from {
opacity: 1;
transform: translateX(0);
}
to {
opacity: 0;
transform: translateX(-100%);
}
`;

const SlideDiv = styled.div`
&.slide-enter {
animation: ${slideIn} 1s forwards;
}
&.slide-exit {
animation: ${slideOut} 1s forwards;
}
`;





useEffect(() => {
  const token = localStorage.getItem('token');
  
  const handleResize = () => {
    setIsWideScreen(window.innerWidth >= 400); // Adjust threshold as needed
  };

  // Check initial screen width
  handleResize();
  
  const fetchUser = async () => {
    const res = await axios.get(`/users?username=${username}`, {headers: { 'auth-token': token }})
    console.log("fetch user");
    console.log(res.data)
    setUsr(res.data);
    console.log(usr);
    setPrevUN(username);
};
  fetchUser();
  fetchTimeSpent2();
  setIsProfileFetched(true);

  if(day_One_Percent > 0){
    console.log("day_One_Percent");
    setIsVisible(true);
  }

}, []);

const fetchTimeSpent = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get("/users/" + currentUser._id + "/getTimeSpent", {headers: { 'auth-token': token }})
  console.log(res.data);
  setDay_One_Percent(calculatePercentage(res.data["today"], 0));
  setDay_Two_Percent(calculatePercentage(res.data["oneDayBefore"], 0));
  setDay_Three_Percent(calculatePercentage(res.data["twoDayBefore"], 0));
  setDay_Four_Percent(calculatePercentage(res.data["threeDayBefore"], 0));
  setDay_Five_Percent(calculatePercentage(res.data["fourDayBefore"], 0));
  
};

const fetchTimeSpent2 = async () => {
  const token = localStorage.getItem('token');
    //const res = await axios.get("/users/" + currentUser._id + "/getUserActions", {headers: { 'auth-token': token }})
    //console.log(res.data);
     //  if(res.data["showAlert"] == "yes"){
      
    //    setDay_One_Percent(100);
    //    setDay_Two_Percent(100);
    //    setDay_Three_Percent(100);
    //    setDay_Four_Percent(100);
    //    setDay_Five_Percent(100);
    //    setIs_Q1_visible(true);
     //   setIs_review_is_onward(true);
        
     //   }
  
     //   if(res.data["showAlert"] == "no"){
    //      setDay_One_Percent(0);
    //      setDay_Two_Percent(0);
    //      setDay_Three_Percent(0);
     //     setDay_Four_Percent(0);
     //     setDay_Five_Percent(0);
     //     setIs_Q1_visible(true);
     //     setIs_review_is_onward(true);
     // }
      
    const post_different_version = await axios.get("/posts/" + currentUser._id + "/getUserPost", {headers: { 'auth-token': token }})
    
    if(post_different_version.data.message2){
    set_Is_code_visible(true) 
        setIsSurveySubmitted(true)
        stStatus_msg2(post_different_version.data.message);
              
        setIs_Q1_visible(false);
        setIs_review_is_onward(false);
 	      setIs_Q2_visible(false);
        setIs_Q3_visible(false);
        setIs_Q4_visible(false);
        setIs_Q5_visible(false);
        setIs_Q6_visible(false);
        setIs_Q7_visible(false);
        setIs_Q8_visible(false);
        setIs_Q9_visible(false);
        setIs_Q10_visible(false);
        setIs_Q10_visible_1(false);
        setIs_Q10_visible_2(false);
        setIs_Q10_visible_3(false);
        setIs_Q11_visible(false);
        setIs_Q12_visible(false); 
        setIs_Q12_visible_1(false); 
        setIs_Q13_1visible(false);
        setIs_Q13_2visible(false);
        setIs_Q13_3visible(false);
	      setIs_Q14_visible(false);
        setIs_Q15_visible(false); 
        setIs_Q16_visible(false); 
        setIs_Q17_visible(false);
        setIs_Q18_visible(false);
        setIs_Q19_visible(false);
        setIs_Q20_visible(false);
        setIs_Q21_visible(false);
        setIs_TestingFeedBack_visible(false);
    }else{
    const post = post_different_version.data[post_different_version.data.length - 1];
    console.log("Post Survey");
    console.log(currentUser.pool);
    console.log(post);
    if(currentUser.pool === "1" || currentUser.pool ==="2"){
      setPostSpecificText("6. Wie wahrscheinlich wäre es, dass Sie sich mit einem mRNA Impfstoff impfen lassen würden?");
      
    }else if(currentUser.pool == "3" || currentUser.pool ==="4" || currentUser.pool ==="5"){
      setPostSpecificText("6. Wie wahrscheinlich wäre es, dass Sie sich gegen Mpox (Affenpocken) impfen lassen würden?");
      
    }
    
    const handleFetchThumbnail = async () => {
      console.log(post.thumb);
        try {
          const token = localStorage.getItem('token');
            const response = await axios.post('/posts/fetch-thumbnail', { urls : post.thumb, headers: { 'auth-token': token } }); 
            setThumbnail(response.data.thumbnail);
        } catch (error) {
            console.error('Error fetching thumbnail:', error);
        }
    };
  
      handleFetchThumbnail();
    
  } 
  };


  const disableDivState = (divId) => {
    const div = document.getElementById(divId);
    
    if (div) {
      div.style.pointerEvents =  'none';  // Disable/enable interaction
      div.style.opacity =  0.5 ; // Optional: dim the content when disabled
    }
  };
  
  const enableDivState = (divId) => {
    const div = document.getElementById(divId);
    
    if (div) {
      div.style.pointerEvents =  'auto';  // Disable/enable interaction
      div.style.opacity =  1; // Optional: dim the content when disabled
    }
  };


const calculatePercentage = (numerator, denominator) => {
  // Ensure denominator is not 0 to avoid division by zero error
  if (denominator !== 0) {
    const perct = (numerator/denominator) * 100
    console.log(numerator)
    console.log(denominator)
    console.log(perct)
    if(perct > -10){
      return (100);
    }
    return (perct).toFixed(0);
  } else {
    return 'N/A';
  }
};

const handleUserNameChange = async (e) => {
    if(e.target.value != ""){
      if(e.target.value.length == 1){
        //scrollBy({ top: 700, left: 0, behavior: "smooth" })
      }
      //setIs_Q2_visible(true);
      setIs_Q3_visible(true);
      setIs_Q4_visible(true);
      setIs_Q4_visible(true);
      setIs_Q5_visible(true);
      setIs_Q6_visible(true);
      setIs_Q7_visible(true);
      setIs_Q8_visible(true);
      setIs_Q9_visible(true);
      setIs_Q10_visible(true);
      setIs_Q11_visible(true);
      setIs_Q12_visible(true);
      setIs_Q13_1visible(true);
      setIs_Q14_visible(true);
      setIs_Q15_visible(true);
      setIs_Q16_visible(true);
      setIs_Q17_visible(true);
      setIs_Q18_visible(true);

    }else{
      //setIs_Q2_visible(true);
      setIs_Q3_visible(true);
      setIs_Q4_visible(true);
      setIs_Q4_visible(true);
      setIs_Q5_visible(true);
      setIs_Q6_visible(true);
      setIs_Q7_visible(true);
      setIs_Q8_visible(true);
      setIs_Q9_visible(true);
      setIs_Q10_visible(true);
      setIs_Q11_visible(true);
      setIs_Q12_visible(true);
      setIs_Q13_1visible(true);
      setIs_Q14_visible(true);
      setIs_Q15_visible(true);
      setIs_Q16_visible(true);
      setIs_Q17_visible(true);
      setIs_Q18_visible(true);

    }
}

  const handle_Q1_Changed = async (e) => { 
    stValue_q1(e.target.value); 
    console.log(e.target.value);
    
    if(isUserReviewing == false){
    if(e.target.value == "option1"){
    setIs_Q2_visible(true);
    
    
    setIs_Q3_visible(true);
    setIs_Q4_visible(true);
    setIs_Q5_visible(true);
    setIs_Q6_visible(true);
    setIs_Q7_visible(true);
    
    setIs_Q1_visible(false);
    setIs_review_is_onward(false);
    setIs_NoSurvey_visible(false)
    
    //scrollBy({ top: 200, left: 0, behavior: "smooth" })

  } else if(e.target.value == "option2"){

    setIs_Q2_visible(false);
    setIs_Q3_visible(false);
    setIs_Q4_visible(false);
    setIs_Q5_visible(false);
    setIs_Q6_visible(false);
    setIs_Q7_visible(false);
    setIs_Q1_visible(true);
    setIs_review_is_onward(true);
    setIs_NoSurvey_visible(true)
    setIs_Q21_visible(true);
    
  } } };
  
  const handle_Q2_Changed = async (e) => { 
    console.log(e.target.value)
    stValue_q2(e.target.value); 
    if(isUserReviewing == false){
    if(e.target.value != ""){
      
    //scrollBy({ top: 200, left: 0, behavior: "smooth" })
    setIs_Q1_visible(false)
    setIs_review_is_onward(false);
    if(e.target.value != "" && value_q6 != "" && value_q5 != "" && value_q4 != "" && value_q3 != "" && value_q7 != "" ){ 
      setIs_Q8_visible(true);
      setIs_Q9_visible(true);
      setIs_Q2_visible(false);
    setIs_Q3_visible(false);
    setIs_Q4_visible(false);
    setIs_Q5_visible(false);
    setIs_Q6_visible(false);
    setIs_Q7_visible(false);
    }

    } else {
      
    }  
  }
  };
  
  const handle_Q3_Changed = async (e) => { 
  stValue_q3(e.target.value); 
  if(isUserReviewing == false){
    if(e.target.value != ""){
      
      //scrollBy({ top: 200, left: 0, behavior: "smooth" })
      if(e.target.value != "" && value_q6 != "" && value_q5 != "" && value_q4 != "" && value_q7 != "" && value_q2 != "" ){ 
        setIs_Q8_visible(true);
        setIs_Q9_visible(true);
        setIs_Q2_visible(false);
    setIs_Q3_visible(false);
    setIs_Q4_visible(false);
    setIs_Q5_visible(false);
    setIs_Q6_visible(false);
    setIs_Q7_visible(false);
      }
  
    } else {
        
    } 
  }
  };

    const handle_Q4_Changed = async (e) => { 
      stValue_q4(e.target.value); 
      
      if(isUserReviewing == false){
      if(e.target.value != ""){
      
        //scrollBy({ top: 200, left: 0, behavior: "smooth" })
        if(e.target.value != "" && value_q6 != "" && value_q5 != "" && value_q7 != "" && value_q3 != "" && value_q2 != "" ){ 
          setIs_Q8_visible(true);
          setIs_Q9_visible(true);
          setIs_Q2_visible(false);
    setIs_Q3_visible(false);
    setIs_Q4_visible(false);
    setIs_Q5_visible(false);
    setIs_Q6_visible(false);
    setIs_Q7_visible(false);
        }
        
    
      } else {
          
      } 
      /*if(e.target.value != ""){
        setIs_Q10_visible(true);
        setIs_Q11_visible(true);
        setIs_Q12_visible(true);
        setIs_Q13_visible(true);

        scrollBy({ top: 200, left: 0, behavior: "smooth" })
  
      } else {
        setIs_Q10_visible(true);
        setIs_Q11_visible(true);
        setIs_Q12_visible(true);
        setIs_Q13_visible(true);

      }*/
    }
      };

  //const handleTechnicalChange = async (e) => { stValue_b_q4(e.target.value); 

    /*if(e.target.value != ""){
      if(e.target.value.length == 1){
        scrollBy({ top: 700, left: 0, behavior: "smooth" })
      }
      
        setIs_Q4_b_visible(true);
        setIs_Q5_visible(true);
        setIs_Q6_visible(true);
        setIs_Q7_visible(true);
        setIs_Q8_visible(true);
        setIs_Q9_visible(true);

    } else {
        setIs_Q4_b_visible(true);
        setIs_Q5_visible(true);
        setIs_Q6_visible(true);
        setIs_Q7_visible(true);
        setIs_Q8_visible(true);
        setIs_Q9_visible(true);
    }  };*/
    

   /* const handle_Q4_1_Changed = async (e) => { stValue_q4_1(e.target.value); 
      if(e.target.value != ""){
        scrollBy({ top: 200, left: 0, behavior: "smooth" })
  
      } else {
        
      }  };

  const handle_Q4_2_Changed = async (e) => { stValue_q4_2(e.target.value);
    if(e.target.value != ""){
      scrollBy({ top: 200, left: 0, behavior: "smooth" })

    } else {
      
    }  };
  const handle_Q4_3_Changed = async (e) => { 
    stValue_q4_3(e.target.value); 
    if(e.target.value != ""){
      scrollBy({ top: 200, left: 0, behavior: "smooth" })
      setIs_Q8_visible(true);
      setIs_Q9_visible(true);

    } else {
      
      
    } };
    
  const handle_Q4_4_Changed = async (e) => { stValue_q4_4(e.target.value);
    if(e.target.value != ""){
      scrollBy({ top: 200, left: 0, behavior: "smooth" })
    } else {
    }   
    };
    
  const handle_Q4_5_Changed = async (e) => { stValue_q4_5(e.target.value); 
    if(e.target.value != ""){
      scrollBy({ top: 700, left: 0, behavior: "smooth" })
      setIs_Q10_visible(true);
      setIs_Q11_visible(true);
      setIs_Q12_visible(true);
      //setIs_Q13_visible(true);

    } else {
      setIs_Q10_visible(true);
      setIs_Q11_visible(true);
      setIs_Q12_visible(true);
      //setIs_Q13_visible(true);

    }  };*/
      
      const handle_Q6_Changed = async (e) => { 
        stValue_q6(e.target.value); 
        
        if(isUserReviewing == false){
        if(e.target.value != ""){
          
          //scrollBy({ top: 200, left: 0, behavior: "smooth" })
          if(e.target.value != "" && value_q7 != "" && value_q5 != "" && value_q4 != "" && value_q3 != "" && value_q2 != "" ){ 
            setIs_Q8_visible(true);
            setIs_Q9_visible(true);
            setIs_Q2_visible(false);
    setIs_Q3_visible(false);
    setIs_Q4_visible(false);
    setIs_Q5_visible(false);
    setIs_Q6_visible(false);
    setIs_Q7_visible(false);
          }
    
        } else {
          
        }}  };
        
        const handle_Q5_Changed = async (e) => { 
          stValue_q5(e.target.value); 
          
          if(isUserReviewing == false){
          if(e.target.value != ""){
            
            //scrollBy({ top: 200, left: 0, behavior: "smooth" })
            if(e.target.value != "" && value_q6 != "" && value_q7 != "" && value_q4 != "" && value_q3 != "" && value_q2 != "" ){ 
              setIs_Q8_visible(true);
              setIs_Q9_visible(true);
              setIs_Q2_visible(false);
    setIs_Q3_visible(false);
    setIs_Q4_visible(false);
    setIs_Q5_visible(false);
    setIs_Q6_visible(false);
    setIs_Q7_visible(false);
            }
      
          } else {
            
          }}  };
      
      const handle_Q7_Changed = async (e) => { 
        stValue_q7(e.target.value); 
        
        if(isUserReviewing == false){
        if(e.target.value != "" && value_q6 != "" && value_q5 != "" && value_q4 != "" && value_q3 != "" && value_q2 != "" ){ 
            setIs_Q8_visible(true);
            setIs_Q9_visible(true);
          //scrollBy({ top: 200, left: 0, behavior: "smooth" })
          
          
          setIs_Q2_visible(false);
    setIs_Q3_visible(false);
    setIs_Q4_visible(false);
    setIs_Q5_visible(false);
    setIs_Q6_visible(false);
    setIs_Q7_visible(false);
    
        } else {
          setIs_Q8_visible(false);
          setIs_Q9_visible(false);
          
        }}  };

        const handle_Q8_Changed = async (e) => { 
          stValue_q8(e.target.value); 
          
          if(isUserReviewing == false){
          if(e.target.value != "" ){
            
            //scrollBy({ top: 200, left: 0, behavior: "smooth" })
            
            if(e.target.value != "" && value_q9 != ""){
              setIs_Q10_visible(true);
            //scrollBy({ top: 200, left: 0, behavior: "smooth" })
            setIs_Q8_visible(false);
            setIs_Q9_visible(false);
            }

          } else {
            
          } } };
          
          const handle_Q9_Changed = async (e) => {                           
            stValue_q9(e.target.value); 
            if(isUserReviewing == false){
            if(e.target.value != "" && value_q8 != ""){
              setIs_Q10_visible(true);
              //scrollBy({ top: 200, left: 0, behavior: "smooth" })
              setIs_Q8_visible(false);
              setIs_Q9_visible(false);
            } else {
              setIs_Q10_visible(false);
              
            }
          }};

            const handle_Q10_Changed = async (e) => { 
              stValue_q10(e.target.value); 
              
              if(isUserReviewing == false){
              if(e.target.value != "" && value_q10_1 != "" && value_q10_2 != "" && value_q10_3 != ""){
                setIs_Q12_visible(true);
                          setIs_Q11_visible(true);
                
                setIs_Q10_visible(false);
                setIs_Q10_visible_1(false);
                setIs_Q10_visible_2(false);
                setIs_Q10_visible_3(false);
                
                //scrollBy({ top: 200, left: 0, behavior: "smooth" })
                
              } else {
                setIs_Q12_visible(false);
                setIs_Q11_visible(false);
                  
                } } };
                
                
                const handle_Q10_Changed_1 = async (e) => { 
                  stValue_q10_1(e.target.value); 
                  
                  if(isUserReviewing == false){
                  if(e.target.value != "" && value_q10_2 != "" && value_q10_3 != "" && value_q10 != ""){
                    setIs_Q12_visible(true);
                          setIs_Q11_visible(true);
                    
                    setIs_Q10_visible(false);
                    setIs_Q10_visible_1(false);
                    setIs_Q10_visible_2(false);
                    setIs_Q10_visible_3(false);
                    
                    //scrollBy({ top: 200, left: 0, behavior: "smooth" })
                    
                  } else {
                    setIs_Q12_visible(false);
                    setIs_Q11_visible(false);
                  
                }}  };
                    
                    
                    const handle_Q10_Changed_2 = async (e) => { 
                      stValue_q10_2(e.target.value); 
                      
                      if(isUserReviewing == false){
                      if(e.target.value != ""){
                        setIs_Q10_visible_3(true);
                        
                        //scrollBy({ top: 200, left: 0, behavior: "smooth" })
                        
                        if(e.target.value != "" && value_q10_1 != "" && value_q10_3 != "" && value_q10 != ""){
                          setIs_Q12_visible(true);
                          setIs_Q11_visible(true);
                          
                          setIs_Q10_visible(false);
                          setIs_Q10_visible_1(false);
                          setIs_Q10_visible_2(false);
                          setIs_Q10_visible_3(false);
                          
                          //scrollBy({ top: 200, left: 0, behavior: "smooth" })
                          
                        }
                        
                      } else {
                        setIs_Q12_visible(false);
      setIs_Q11_visible(false);
                        
                      }}  };


  const handle_Q10_Changed_3 = async (e) => { 
    stValue_q10_3(e.target.value); 
    if(isUserReviewing == false){
    if(e.target.value != "" && value_q10_1 != "" && value_q10_2 != ""  && value_q10 != ""){
      setIs_Q12_visible(true);
      setIs_Q11_visible(true);
      
      setIs_Q10_visible(false);
      setIs_Q10_visible_1(false);
      setIs_Q10_visible_2(false);
      setIs_Q10_visible_3(false);
      
      //scrollBy({ top: 200, left: 0, behavior: "smooth" })
      
    } else {
      setIs_Q12_visible(false);
      setIs_Q11_visible(false);
      
    } } };
    
  const handle_Q11_Changed = async (e) => { 
    stValue_q11(e.target.value); 
    if(isUserReviewing == false){
    if(e.target.value != ""){
      //scrollBy({ top: 200, left: 0, behavior: "smooth" })
       
      setIs_Q13_1visible(true);
      setIs_Q13_2visible(true);
      setIs_Q13_3visible(true);
      //scrollBy({ top: 200, left: 0, behavior: "smooth" })
      setIs_Q11_visible(false);
      setIs_Q12_visible(false);
       
      is_Q12_visible_1(false)
    
    } else {
      setIs_Q13_1visible(false);
      setIs_Q13_2visible(false);
      setIs_Q13_3visible(false); 
    
    } } };
    
  const handle_Q12_Changed = async (e) => { 
  stValue_q12(e.target.value);
  if(e.target.value != ""){
    if(e.target.value=="option8"){
      setIs_Q12_visible_1(true)
    }else {
      setIs_Q12_visible_1(false)
    }
    
  }
  if(isUserReviewing == false){
    if(e.target.value=="option8"){
      setIs_Q12_visible_1(true)
    
    } else if(e.target.value != ""){
      stValue_q12_1("");
      
      

    } else {
      
      stValue_q12_1("");
      
    }}  };
    
    
    const handle_Q12_Changed_1 = async (e) => { 
      if(e.target.value != ""){
        stValue_q12_1(e.target.value);
      } else {
        stValue_q12_1("");
      }
    }
    
  const handle_Q13_1Changed = async (e) => { 
    stValue_q13_1(e.target.value); 
    if(isUserReviewing == false){
    if(e.target.value != "" && value_q13_3 != "" && value_q13_2 != ""){
    
      setIs_Q14_visible(true);
      setIs_Q15_visible(true);
      
      //setIs_Q17_visible(true);
      //scrollBy({ top: 200, left: 0, behavior: "smooth" })
      setIs_Q13_1visible(false);
      setIs_Q13_2visible(false);
      setIs_Q13_3visible(false);
    } else {
       
      setIs_Q14_visible(false);
      setIs_Q15_visible(false);
      setIs_Q16_visible(false);
    } }  };
    
    const handle_Q13_2Changed = async (e) => { 
      stValue_q13_2(e.target.value); 
      if(isUserReviewing == false){
      if(e.target.value != "" && value_q13_1 != "" && value_q13_3 != ""){
    
        setIs_Q14_visible(true);
        setIs_Q15_visible(true);
        //setIs_Q16_visible(true);
        //setIs_Q17_visible(true);
        //scrollBy({ top: 200, left: 0, behavior: "smooth" })
        setIs_Q13_1visible(false);
        setIs_Q13_2visible(false);
        setIs_Q13_3visible(false);
      } else {
         
        setIs_Q14_visible(false);
        setIs_Q15_visible(false);
        setIs_Q16_visible(false);
      } }  };
      
      const handle_Q13_3Changed = async (e) => { 
        stValue_q13_3(e.target.value); 
        if(isUserReviewing == false){
        if(e.target.value != "" && value_q13_1 != "" && value_q13_2 != ""){
    
          setIs_Q14_visible(true);
          setIs_Q15_visible(true);
          //setIs_Q16_visible(true);
          setIs_Q21_visible(true);
    setIs_TestingFeedBack_visible(false);
          
          //setIs_Q17_visible(true);
          //scrollBy({ top: 200, left: 0, behavior: "smooth" })
          setIs_Q13_1visible(false);
          setIs_Q13_2visible(false);
          setIs_Q13_3visible(false);
          setIs_Q21_visible(false);
    setIs_TestingFeedBack_visible(false);
        } else {
           
          setIs_Q14_visible(false);
          setIs_Q15_visible(false);
          setIs_Q16_visible(false);
          setIs_Q21_visible(false);
    setIs_TestingFeedBack_visible(false);
        } } };
    
  const handle_Q14_Changed = async (e) => { 
    stValue_q14(e.target.value); 
    if(e.target.value != ""){
      //scrollBy({ top: 200, left: 0, behavior: "smooth" })

    } else {

    }  };
    
    
    const handle_Q15_Changed = async (e) => {
      stValue_q15(e.target.value); 
      if(isUserReviewing == false){
      if(e.target.value == "option2" ||e.target.value == "option3" ||e.target.value == "option4"||e.target.value == "option5" ){
        setIs_Q16_visible(true);
      }else{
        setIs_Q16_visible(false);
      }
      
      if(e.target.value != ""){
        setIs_Q17_visible(true);
    setIs_Q18_visible(true);
    setIs_Q19_visible(true);
    setIs_Q20_visible(true);
    setIs_Q21_visible(true);
    setIs_TestingFeedBack_visible(false);
        
        
        
        
          //scrollBy({ top: 700, left: 0, behavior: "smooth" })
        }else{
    setIs_Q17_visible(true);
    setIs_Q18_visible(true);
    setIs_Q19_visible(true);
    setIs_Q20_visible(true);
    setIs_Q21_visible(true);
    setIs_TestingFeedBack_visible(false);

      }
    } else{
    if(e.target.value == "option2" ||e.target.value == "option3" ||e.target.value == "option4"||e.target.value == "option5" ){
      setIs_Q16_visible(true);
    }else{
      setIs_Q16_visible(false);
    }
  }
  }

  
    
  const handle_Q16_Changed = async (e) => { 
    //setIs_Q14_visible(false);
    //setIs_Q15_visible(false);
    //setIs_Q21_visible(false);
    
  if(e.target.value != ""){
    stValue_q16(e.target.value);
    //setIs_Q21_visible(true);
    //setIs_Q17_visible(true);
    //setIs_Q18_visible(true);
    //setIs_Q19_visible(true);
    //setIs_Q20_visible(true);
    //setIs_Q21_visible(true);
    //setIs_TestingFeedBack_visible(true);
    
    
    
      ////scrollBy({ top: 200, left: 0, behavior: "smooth" })

    } else {
      
      //setIs_Q17_visible(false);
      //setIs_Q18_visible(false);
      //setIs_Q19_visible(false);
      //setIs_Q20_visible(false);
      //setIs_TestingFeedBack_visible(false);
    }  };
    
  const handle_Q17_Changed = async (e) => { 
  stValue_q17(e.target.value); 
  if(isUserReviewing == false){
    if(e.target.value != ""){ 
      //scrollBy({ top: 200, left: 0, behavior: "smooth" })
      setIs_Q16_visible(false);

    } else { 
    } } };
    
    
    const handle_feedback_Changed = async (e) => {
      setFeedback(e.target.value); 
  }
    
    
  const handle_Q18_Changed = async (e) => { 
    stValue_q18(e.target.value); 
    
      if(e.target.value != ""){ 
        //scrollBy({ top: 200, left: 0, behavior: "smooth" })
  
      } else { 
      }  
    };

    const handle_Q19_Changed = async (e) => { 
      stValue_q19(e.target.value); 
        if(e.target.value != ""){ 
          //scrollBy({ top: 200, left: 0, behavior: "smooth" })
    
        } else { 
        }  };
        
        const handle_Q20_Changed = async (e) => { 
          stValue_q20(e.target.value); 
          if(isUserReviewing == false){
            if(e.target.value != ""){ 
              setIs_Q21_visible(true);
              //scrollBy({ top: 200, left: 0, behavior: "smooth" })
        
            } else { 
              setIs_Q21_visible(false);
            }}  };


            const reviewButtonChanged = async (e) => { 
              e.preventDefault()
              setIsUserReviewing(true);
              
              setIs_Q1_visible(true);
              setIs_review_is_onward(true);
 	  setIs_Q2_visible(true);
    setIs_Q3_visible(true);
    setIs_Q4_visible(true);
    setIs_Q5_visible(true);
    setIs_Q6_visible(true);
    setIs_Q7_visible(true);
    setIs_Q8_visible(true);
    setIs_Q9_visible(true);
    setIs_Q10_visible(true);
    setIs_Q10_visible_1(true);
    setIs_Q10_visible_2(true);
    setIs_Q10_visible_3(true);
    setIs_Q11_visible(true);
    setIs_Q12_visible(true); 
    setIs_Q12_visible_1(true); 
    setIs_Q13_1visible(true);
    setIs_Q13_2visible(true);
    setIs_Q13_3visible(true);
	  setIs_Q14_visible(true);
    setIs_Q15_visible(true);
    if(value_q15 == "option1"){setIs_Q16_visible(false);}else{setIs_Q16_visible(true);}
    setIs_Q17_visible(true);
    setIs_Q18_visible(true);
    setIs_Q19_visible(true);
    setIs_Q20_visible(true);
    setIs_TestingFeedBack_visible(false);
                
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            };

  const handleClick = async (e) => {
      e.preventDefault()
  
  var feedback = ""
    
  try{
    feedback = document.getElementById('feedback').value;
    
  } catch (err) {
    console.log(err);
    
  }
     //window.scrollTo({ top: 0, left: 0, behavior: "auto" })
     document.querySelector('body').scrollIntoView({ behavior: 'smooth' });
     window.scroll(0, 0);
    var someelse = ""
  
    //if(username.toLowerCase() != currentUser.username.toLowerCase()){
     // toast.error("Question 1. Sie haben einen falschen Benutzernamen eingegeben!");
      //return
    //}else 
    
    if(is_NoSurvey_visible == false){
    
    if (value_q1 == ""){ 
      toast.error("Frage 1. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q2 == ""){
      toast.error("Frage 2. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q3 == ""){
      toast.error("Frage 3. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q4 == ""){
      toast.error("Frage 4. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q5 == ""){
      toast.error("Frage 5. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q6 == ""){
      toast.error("Frage 6. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q7 == ""){
      toast.error("Frage 7. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q8 == ""){
      toast.error("Frage 8. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q9 == ""){
      toast.error("Frage 9. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q10 == ""){
      toast.error("Frage 10. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q10_1 == ""){
      toast.error("Frage 10. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q10_2 == ""){
      toast.error("Frage 10. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q10_3 == ""){
      toast.error("Frage 10. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q11 == ""){
      toast.error("Frage 11. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    } else if (value_q12 == ""){
      toast.error("Frage 12. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q13_1 == ""){
      toast.error("Frage 13. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q13_2 == ""){
      toast.error("Frage 13. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q13_3 == ""){
      toast.error("Frage 13. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q14 == ""){
      toast.error("Frage 14. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q15 == ""){
      toast.error("Frage 15. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q16 == ""){
      if(value_q15 != "option1"){
      toast.error("Frage 16. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
      }
    }}
    var survey = {}
    if(is_NoSurvey_visible == false){

     survey = {
      q1: value_q1,
      q2: value_q2,
      q3: value_q3,
      q4: value_q4,
      q5: value_q5,
      q6: value_q6,
      q7: value_q7,
      q8: value_q8,
      q9: value_q9, 
      q10: value_q10,
      q10_1: value_q10_1,
      q10_2: value_q10_2,
      q10_3: value_q10_3,
      q11: value_q11,
      q12: value_q12,
      q12_1: value_q12_1,
      q13_1: value_q13_1,
      q13_2: value_q13_2,
      q13_3: value_q13_3,
      q14: value_q14,
      q15: value_q15,
      q16: value_q16,
      "feedback": feedback,
    };
  }else{
    survey = {
      "feedback": feedback,
    };
  }
    try {
      setProgress(30);
      console.log(survey)
      let uniqueId = currentUser.uniqueId;
      console.log(currentUser)
      const token = localStorage.getItem('token');
      const res = await axios.post(`/postsurvey/pstsurvey/${currentUser._id}`, {uniqueId, survey, headers: { 'auth-token': token }});

      try {
        console.log(survey)
        //const res = await axios.post(`/idstorage/getKey/${currentUser.uniqueId}`);
        //console.log(res);
        
        //const urlParts = window.location.pathname.split('/');
        //const valu = urlParts[urlParts.length-1]
        //const surveyUrl = `https://app.prolific.com/researcher/submissions/complete?cc=${res.data.message}`;
        const surveyUrl = `https://app.prolific.com/researcher/submissions/complete?cc=C101GTBB`;

        window.open(surveyUrl, '_blank');
        set_Is_code_visible(true) 
        setIsSurveySubmitted(true)
        //stStatus_msg2(res.data.message);
        stStatus_msg2("C101GTBB");
              
        setIs_Q1_visible(false);
        setIs_review_is_onward(false);
 	      setIs_Q2_visible(false);
        setIs_Q3_visible(false);
        setIs_Q4_visible(false);
        setIs_Q5_visible(false);
        setIs_Q6_visible(false);
        setIs_Q7_visible(false);
        setIs_Q8_visible(false);
        setIs_Q9_visible(false);
        setIs_Q10_visible(false);
        setIs_Q10_visible_1(false);
        setIs_Q10_visible_2(false);
        setIs_Q10_visible_3(false);
        setIs_Q11_visible(false);
        setIs_Q12_visible(false); 
        setIs_Q12_visible_1(false); 
        setIs_Q13_1visible(false);
        setIs_Q13_2visible(false);
        setIs_Q13_3visible(false);
	      setIs_Q14_visible(false);
        setIs_Q15_visible(false); 
        setIs_Q16_visible(false); 
        setIs_Q17_visible(false);
        setIs_Q18_visible(false);
        setIs_Q19_visible(false);
        setIs_Q20_visible(false);
        setIs_Q21_visible(false);
        setIs_TestingFeedBack_visible(false);
        
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setProgress(100);
        //history.push(`/register/${res.data.key}`);
      } catch (err) {
        console.log(err);
        setPasswordErr({A_user_with});
        setIsSurveySubmitted(false)
        setProgress(100);

      }

    } catch (err) {
      console.log(err);
      setPasswordErr({A_user_with});
      setIsSurveySubmitted(false)

    }

        
  };

  useEffect(() => {
      setFollowed(currentUser.followings.includes(usr._id));
        //setSelectedImage(usr.profilePicture);
        setPreImage(usr.profilePicture);
    }, []);


   return (
        <>
        <Topbar isProfile="true"/>
        <ToastContainer></ToastContainer>
        <div className={classes.profile}>
          <div className={classes.profileRight}>
            <div className={classes.profileRightTop}>
              <div className={classes.profileCover}>
                <img
                  className={classes.profileCoverImg}
                  src={usr.coverPicture ? PF+usr.coverPicture : PF+"person/noCover.png"}
                  alt=""
                />
                <img id='profileImg'
                  className={classes.profileUserImg}
                  src={usr.profilePicture ? PF + usr.profilePicture : PF+"person/noAvatar.png"}
                  alt=""
                />
              </div>
              <div className={classes.profileInfo}>
              {usr.username !== currentUser.username /*&& (
          {<button className={classes.rightbarFollowButton} onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>}
        )*/}
                <h4 className={classes.profileInfoName}>{usr.username} </h4>
                {/*<textarea style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.desc? usr.desc: "Enter your biography"} className={classes.shareInput} onChange={handleDescription}  />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.city? usr.city:"Enter the name of your City"} className={classes.shareInput} onChange={handleCity}   />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.from? usr.from:"Enter the name of your Country"} className={classes.shareInput} onChange={handleCountry}  />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.relationship? usr.relationship:"Whats is the status of your relationship?"} className={classes.shareInput} onChange={handleRelationship}  />*/}
              </div>
            </div>
        </div>
        </div>
        
        <div style={{ alignItems: "center", marginLeft: isMobileDevice && isTabletDevice && '300px', marginRight:isMobileDevice && isTabletDevice &&"300px"}}>
        {/*<h3 className={classes.progressHead}>{(day_One_Percent > -1 && day_Two_Percent > -1 && day_Three_Percent > -1)?status_msg2: status_msg}</h3>
          {/*<form className={classes.form}  noValidate autoComplete="off">
        <CSSTransition in={day_One_Percent > -1 && day_Two_Percent > -1 && day_Three_Percent > -1 && day_Four_Percent > -1 && day_Five_Percent > -1} timeout={50} classNames="slide" unmountOnExit >
      <div id='toShow'>
      <p className={classes.secon_disclaimor}>{post_info_0}</p>
      <p className={classes.secon_disclaimor}>{post_info_1}</p>
      <p className={classes.secon_disclaimor}>{post_q1}</p>
      <input id="username" onChange = {handleUserNameChange}className={classes.label2} placeholder={post_q1}/>
      <hr style={{ borderTop: '1px solid #000' }}/>
      </div>
              </CSSTransition>*/}

        <CSSTransition in={is_TestingFeedBack_visible} timeout={1000} classNames="slide" unmountOnExit > 
        <div id='feedback2'>
        <p className={classes.secon_disclaimor}>{"Please report any issues that you found"}</p>
        <textarea  className={classes.label2} id="feedback" rows={4}  onChange={handle_feedback_Changed}  value={feedback} placeholder={"Provide your feedback about the pre-survey here. A text area for feedback will also be available in the post-survey. Additionally, feel free to use these text fields to mention any other concerns or issues. You can also leave comments to highlight any problems encountered on the platform."}/>
        </div> 
        </CSSTransition>



        <CSSTransition in={is_Q1_b_visible} timeout={50} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q1'>
      <p className={classes.secon_disclaimor}>{post_info_2}</p>
      <p className={classes.secon_disclaimor}>{post_info_3}</p>

      <hr style={{ borderTop: '1px solid #000' }}/>
      
      <CSSTransition in={is_review_is_onward} timeout={1000} classNames="slide" unmountOnExit>
              <p className={classes.secon_disclaimor}>{review_is_onward}</p>
              </CSSTransition>
              
      <p className={classes.secon_disclaimor}>{One_Post}</p>
        <p className={classes.secon_disclaimor}>{post_q1}</p>
        
        <p className={classes.secon_disclaimor}  dangerouslySetInnerHTML={{ __html: desc }}></p>
        {thumbnail && (
              <div  style={{ marginTop:"20px", background: "#ffffff" }}>
                  <img src={thumbnail} alt="Thumbnail" style={{ width: '200px', cursor: 'default' }} />
              </div>
          )}
        
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q1 === 'option1'} onChange={handle_Q1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q1_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q1 === 'option2'} onChange={handle_Q1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q1_op2}</span></label></div></form>
        </div></SlideDiv>
        </CSSTransition>
        
        <CSSTransition in={is_Q2_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q2'>
        <p className={classes.secon_disclaimor}>{post_q2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q2 === 'option1'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q2 === 'option2'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q2 === 'option3'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option4"  checked={value_q2 === 'option4'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q2 === 'option5'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q2 === 'option6'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op6}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option7"  checked={value_q2 === 'option7'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op7}</span></label></div>
        </form>
        </div></SlideDiv>
        </CSSTransition>
        
        
        <CSSTransition in={is_Q3_visible} timeout={1000}  classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q3'>
        <p className={classes.secon_disclaimor}>{post_q3}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q3 === 'option1'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q3 === 'option2'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q3 === 'option3'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option4"  checked={value_q3 === 'option4'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q3 === 'option5'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q3 === 'option6'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op6}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option7"  checked={value_q3 === 'option7'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op7}</span></label></div>
        </form>
        </div></SlideDiv>
        </CSSTransition>

        <CSSTransition in={is_Q4_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q4'>  
        <p className={classes.secon_disclaimor}>{post_q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4 === 'option1'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4 === 'option2'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4 === 'option3'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4 === 'option4'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4 === 'option5'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q4 === 'option6'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op6}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option7"  checked={value_q4 === 'option7'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op7}</span></label></div>
       </form>
        </div></SlideDiv>
        </CSSTransition>

        <CSSTransition in={is_Q5_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q5'>
        <p className={classes.secon_disclaimor}>{post_q5}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q5 === 'option1'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q5 === 'option2'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q5 === 'option3'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q5 === 'option4'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q5 === 'option5'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q5 === 'option6'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q5 === 'option7'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op7}</span></label></div>
        
      </form>
        </div></SlideDiv>
        </CSSTransition>

        <CSSTransition in={is_Q6_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q6'>
        <p className={classes.secon_disclaimor}>{postSpecificText}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q6 === 'option1'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q6 === 'option2'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q6 === 'option3'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q6 === 'option4'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q6 === 'option5'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q6 === 'option6'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op6}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option7"  checked={value_q6 === 'option7'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op7}</span></label></div>
      </form>
        </div></SlideDiv>
        </CSSTransition>

        <CSSTransition in={is_Q7_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q7'>
        <p className={classes.secon_disclaimor}>{post_q7}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q7 === 'option1'} onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q7 === 'option2'} onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q7 === 'option3'} onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q7 === 'option4'} onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q7 === 'option5'} onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q7 === 'option6'} onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op6}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option7"  checked={value_q7 === 'option7'} onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op7}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
      
      </form>
        </div></SlideDiv>
        </CSSTransition>

        <CSSTransition in={is_Q8_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q8'>
        <p className={classes.secon_disclaimor}>{post_q8}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q8 === 'option1'} onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q8 === 'option2'} onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op2}</span></label></div>
        </form>
        </div>
        </SlideDiv>
        </CSSTransition>
        <CSSTransition in={is_Q9_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q9'>
        <p className={classes.secon_disclaimor}>{post_q9}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q9 === 'option1'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q9 === 'option2'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q9 === 'option3'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q9 === 'option4'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q9 === 'option5'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q9 === 'option6'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op6}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option7"  checked={value_q9 === 'option7'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op7}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div></SlideDiv>
        </CSSTransition>
        {/*<CSSTransition in={is_Q9_visible} timeout={1000} classNames="slide" unmountOnExit >
        <div id='sixBlock'> 
        <p className={classes.secon_disclaimor}>{post_q9}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q9 === 'option1'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q9 === 'option2'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q9 === 'option3'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q9 === 'option4'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q9 === 'option5'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op5}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div>
        </CSSTransition>*/}
        <CSSTransition in={is_Q10_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q10'>
        <p className={classes.secon_disclaimor}>{post_q10}</p>
        <p className={classes.secon_disclaimor}>{postq_info_1}</p>
        {<form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q10 === 'option1'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10 === 'option2'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10 === 'option3'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10 === 'option4'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q10 === 'option5'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q10 === 'option6'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q10 === 'option7'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op7}</span></label></div>
         
        </form>}
        </div></SlideDiv>
        </CSSTransition>
        <CSSTransition in={is_Q10_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q10_1'>
        <p className={classes.secon_disclaimor}>{postq_info_2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q10_1 === 'option1'} onChange={handle_Q10_Changed_1} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op1_1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10_1 === 'option2'} onChange={handle_Q10_Changed_1} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op2_1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10_1 === 'option3'} onChange={handle_Q10_Changed_1} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op3_1}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10_1 === 'option4'} onChange={handle_Q10_Changed_1} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op4_1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q10_1 === 'option5'} onChange={handle_Q10_Changed_1} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op5_1}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q10_1 === 'option6'} onChange={handle_Q10_Changed_1} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op6_1}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q10_1 === 'option7'} onChange={handle_Q10_Changed_1} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op7_1}</span></label></div>
         
        </form>
        </div></SlideDiv>
        </CSSTransition>
        
        <CSSTransition in={is_Q10_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q10_2'> 
        <p className={classes.secon_disclaimor}>{postq_info_3}</p> 
        
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q10_2 === 'option1'} onChange={handle_Q10_Changed_2} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op1_2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10_2 === 'option2'} onChange={handle_Q10_Changed_2} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op2_2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10_2 === 'option3'} onChange={handle_Q10_Changed_2} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op3_2}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10_2 === 'option4'} onChange={handle_Q10_Changed_2} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op4_2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q10_2 === 'option5'} onChange={handle_Q10_Changed_2} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op5_2}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q10_2 === 'option6'} onChange={handle_Q10_Changed_2} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op6_2}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q10_2 === 'option7'} onChange={handle_Q10_Changed_2} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op7_2}</span></label></div>
         
        </form>
        </div></SlideDiv>
        </CSSTransition>
        
        <CSSTransition in={is_Q10_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q10_3'> 
        <p className={classes.secon_disclaimor}>{postq_info_4}</p> 
        
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q10_3 === 'option1'} onChange={handle_Q10_Changed_3} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op1_3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10_3 === 'option2'} onChange={handle_Q10_Changed_3} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op2_3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10_3 === 'option3'} onChange={handle_Q10_Changed_3} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op3_3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10_3 === 'option4'} onChange={handle_Q10_Changed_3} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op4_3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q10_3 === 'option5'} onChange={handle_Q10_Changed_3} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op5_3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q10_3 === 'option6'} onChange={handle_Q10_Changed_3} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op6_3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q10_3 === 'option7'} onChange={handle_Q10_Changed_3} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op7_3}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div></SlideDiv>
        </CSSTransition>
        
        
        <CSSTransition in={is_Q12_visible} timeout={1000} classNames="slide" unmountOnExit > 
        <div id='Q12'>
        <p className={classes.secon_disclaimor}>{post_q12}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q12 === 'option1'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q12 === 'option2'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q12 === 'option3'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q12 === 'option4'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q12 === 'option5'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"   checked={value_q12 === 'option6'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op6}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option7"  checked={value_q12 === 'option7'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op7}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option8"  checked={value_q12 === 'option8'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op8}{is_Q12_visible_1 && (<textarea  className={classes.label2} id="others" rows={1} placeholder={post_q12_op8} value={value_q12_1} onChange={handle_Q12_Changed_1} />)}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option9"  checked={value_q12 === 'option9'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op9}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option10"  checked={value_q12 === 'option10'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op10}</span></label></div>
        
        </form>
        </div> 
        </CSSTransition>
        
        
        <CSSTransition in={is_Q11_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q11'>
        <p className={classes.secon_disclaimor}>{post_q11_info}</p>
        <p className={classes.secon_disclaimor}>{post_q11}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q11 === 'option1'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q11 === 'option2'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q11 === 'option3'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q11 === 'option4'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q11 === 'option5'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q11 === 'option6'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q11 === 'option7'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op7}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option8"  checked={value_q11 === 'option8'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op8}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option9"  checked={value_q11 === 'option9'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op9}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option10"  checked={value_q11 === 'option10'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op10}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option11"  checked={value_q11 === 'option11'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op11}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div></SlideDiv>
        </CSSTransition>
       
        
        
        <CSSTransition in={is_Q13_1visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q13'>
        <p className={classes.secon_disclaimor}>{post_q13}</p>
        <br />
        <p className={classes.secon_disclaimor}>{post_q13_info1}</p>
        
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q13_1 === 'option1'} onChange={handle_Q13_1Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q13_1 === 'option2'} onChange={handle_Q13_1Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q13_1 === 'option3'} onChange={handle_Q13_1Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q13_1 === 'option4'} onChange={handle_Q13_1Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q13_1 === 'option5'} onChange={handle_Q13_1Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q13_1 === 'option6'} onChange={handle_Q13_1Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q13_1 === 'option7'} onChange={handle_Q13_1Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op7}</span></label></div>
        </form>
        </div></SlideDiv>
        </CSSTransition>
        <CSSTransition in={is_Q13_2visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q13_2'>
        <p className={classes.secon_disclaimor}>{post_q13_info2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q13_2 === 'option1'} onChange={handle_Q13_2Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q13_2 === 'option2'} onChange={handle_Q13_2Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q13_2 === 'option3'} onChange={handle_Q13_2Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q13_2 === 'option4'} onChange={handle_Q13_2Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q13_2 === 'option5'} onChange={handle_Q13_2Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q13_2 === 'option6'} onChange={handle_Q13_2Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q13_2 === 'option7'} onChange={handle_Q13_2Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op7}</span></label></div>
        </form>
        </div></SlideDiv>
        </CSSTransition>
        <CSSTransition in={is_Q13_3visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q13_3'>
        <p className={classes.secon_disclaimor}>{post_q13_info3}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q13_3 === 'option1'} onChange={handle_Q13_3Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q13_3 === 'option2'} onChange={handle_Q13_3Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q13_3 === 'option3'} onChange={handle_Q13_3Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q13_3 === 'option4'} onChange={handle_Q13_3Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q13_3 === 'option5'} onChange={handle_Q13_3Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option6"  checked={value_q13_3 === 'option6'} onChange={handle_Q13_3Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q13_3 === 'option7'} onChange={handle_Q13_3Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op7}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div></SlideDiv>
        </CSSTransition>
        
        <CSSTransition in={is_Q14_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q14'>
        <p className={classes.secon_disclaimor}>{post_q14_info1}</p>
        <p className={classes.secon_disclaimor}>{post_q14}</p>
        
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q14 === 'option1'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q14 === 'option2'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q14 === 'option3'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q14 === 'option4'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q14 === 'option5'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op5}</span></label></div>
        
        </form>
        </div></SlideDiv>
        </CSSTransition>
        <CSSTransition in={is_Q15_visible} timeout={1000} classNames="slide" unmountOnExit ><SlideDiv>
        <div id='Q15'>
        <p className={classes.secon_disclaimor}>{post_q15}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q15 === 'option1'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q15 === 'option2'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q15 === 'option3'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q15 === 'option4'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q15 === 'option5'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op5}</span></label></div>
        </form>
        </div></SlideDiv>
        </CSSTransition>
        <CSSTransition in={is_Q16_visible} timeout={1000} classNames="slide" unmountOnExit > 
        <div id='Q16'>
        <p className={classes.secon_disclaimor}>{post_q16}</p>
        
        <form  className={classes.question}>
        <textarea  className={classes.label2} id="someelse" rows={4} placeholder={post_q16} value={value_q16} onChange={handle_Q16_Changed} />
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div> 
        </CSSTransition>
        
        {/*
        <CSSTransition in={is_Q17_visible} timeout={1000} classNames="slide" unmountOnExit >
        <div id='sixBlock'> 
        <p className={classes.secon_disclaimor}>{post_info_17}</p>
        <p className={classes.secon_disclaimor}>{post_q17}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q17 === 'option1'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q17 === 'option2'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q17 === 'option3'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q17 === 'option4'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q17 === 'option5'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op7}</span></label></div>
      
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q18_visible} timeout={1000} classNames="slide" unmountOnExit >
        <div id='sixBlock'> 
        <p className={classes.secon_disclaimor}>{post_q18}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q18 === 'option1'} onChange={handle_Q18_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q18 === 'option2'} onChange={handle_Q18_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q18 === 'option3'} onChange={handle_Q18_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q18 === 'option4'} onChange={handle_Q18_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q18 === 'option5'} onChange={handle_Q18_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op7}</span></label></div>
 
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q19_visible} timeout={1000} classNames="slide" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q19}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q19 === 'option1'} onChange={handle_Q19_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q19 === 'option2'} onChange={handle_Q19_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q19 === 'option3'} onChange={handle_Q19_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q19 === 'option4'} onChange={handle_Q19_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q19 === 'option5'} onChange={handle_Q19_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op7}</span></label></div>
      
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q20_visible} timeout={1000} classNames="slide" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q20}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q20 === 'option1'} onChange={handle_Q20_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q20 === 'option2'} onChange={handle_Q20_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q20 === 'option3'} onChange={handle_Q20_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q20 === 'option4'} onChange={handle_Q20_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q20 === 'option5'} onChange={handle_Q20_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op7}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div>
        </CSSTransition>*/}
        
        
        <CSSTransition in={is_Q21_visible} timeout={1000} classNames="slide" unmountOnExit >
        <SlideDiv>
        <div id='Q21'>
        
        {/*<p className={classes.secon_disclaimor}>{last_info1}</p>*/}
        <p className={classes.secon_disclaimor}>{last_info2}</p>
        <p className={classes.secon_disclaimor}>{last_info3}</p>
        <p className={classes.secon_disclaimor}>{last_info4}</p>
        
        <p className={classes.secon_disclaimor}><a href={last_info5} target={last_info5} rel="noopener noreferrer">{last_info5}</a></p>
        
        <p className={classes.secon_disclaimor}>{last_info6}</p>
        
        <p className={classes.secon_disclaimor}><a href={last_info7} target={last_info7} rel="noopener noreferrer">{last_info7}</a></p>
        
        <p className={classes.secon_disclaimor}><a href={last_info8} target={last_info8} rel="noopener noreferrer">{last_info8}</a></p>
        
        <p className={classes.secon_disclaimor}>{last_info9}</p>
        <p className={classes.secon_disclaimor}>{last_info10}</p>
        <p className={classes.secon_disclaimor}><a href={last_info10_link} target={last_info10_link} rel="noopener noreferrer">{last_info10_link}</a></p>
        
        <hr style={{ borderTop: '1px solid #000' }}/>
        </div>
        </SlideDiv>
        </CSSTransition>
        
        <CSSTransition in={is_Q21_visible} timeout={1000} classNames="slide" unmountOnExit >
        <SlideDiv>
        <div id='Q21'>
        {!is_NoSurvey_visible && (<p className={classes.secon_disclaimor}>{post_q21}</p>)}

        {!is_NoSurvey_visible && (<textarea  className={classes.label2} id="someelse2" rows={4} placeholder={post_q21}/>)}
        <p  className={classes.secon_disclaimor}>{post_info_8}</p>

        {!is_NoSurvey_visible && (<button onClick={reviewButtonChanged} disabled={isButtonDisabled} className={classes.button}>Antworten bearbeiten</button>)}
            
				<button onClick={handleClick} type="submit" className={classes.button}> {Submit_Post_Survey} </button>
        </div></SlideDiv>
        </CSSTransition>
        
        <CSSTransition in={is_code_visible} timeout={1000} classNames="slide" unmountOnExit >
        <SlideDiv>
        <div id='Q21'>
          <h1 className={classes.progressHead}>{isSurveySubmitted?"Kopieren Sie diesen Code in Prolific, um den Abschluss zu bestätigen " + status_msg2: "Your survey has not been submitted successfully, you need to refresh the application and submit the survey again until you get the Prolific code!"} </h1>
        </div>
        </SlideDiv>
        </CSSTransition>
					{/*</form>
          </div>
          <div style= {{width: 'auto', marginLeft: isMobileDevice && isTabletDevice && '300px', marginRight: isMobileDevice && isTabletDevice && "300px"}}>
        {/*<Circle percent={percent} strokeWidth={4} strokeColor="green" />*/}
</div>
        
      </>
    );
  }

export default withStyles(styles)(Postsurvey);
