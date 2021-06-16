import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinCommunity } from "../../actions/CommunityActions";
import Background from "../background/Background";
import "./CommunitiesCard.css";

const CommunitiesCard = ({data=[]}) => {
  return (
    <>
    <div className='course-card-wrapper'>
      <div className='courses-card-container'>
        <div>
          {
            data.length > 0 && data.map(community => {
              return (
               <CommunityCard community={community} />
              )
            })
          }
        </div>
      </div>
    </div>
    </>
  );
};

export default CommunitiesCard;

const CommunityCard = ({community}) => {
  const [follower, setFollower] = useState(true);

   const {success} = useSelector(state => state.joinCommunity);
   const dispatch = useDispatch();

  //choose userid according to the user data in your database
  let currentUserId = 24;
   useEffect(() => {
     if(community.followers && community.followers.length > 0) {
       if(checkArray(community.followers, currentUserId)) setFollower(false);
     }
  }, [])

 function checkArray(arr, userId) { 
    const found = arr.some(el => (el.id === userId && el.followStatus.active === true))
    if(found) return true
  }
 
  const followCommunity = () => {
    dispatch(joinCommunity(currentUserId, community.id));
      setFollower(!follower);
  }

  const visitCommunity = () => {
    
  }
  return (
     <div className="community-card">
                  <Background image={community.attachment}>
                    <div className="card-1-text">
                      <div className="card-1-title">
                        <h3 className="text-1-card valign-text-middle ibmplexsans-semi-bold-quarter-spanish-white-32px">
                          {community.name}
                        </h3>
                        <p className="text-1-description">{community.description}</p>
                        <div className="address-1 valign-text-middle ibmplexsans-normal-quarter-spanish-white-16px">
                          {/* {community.followers.length} followers */}
                          {community.followers && community.followers.length} followers
                        </div>
                      </div>
                      {follower 
                      ? <button className="secondary-btn join-community-btn" onClick={followCommunity}>Join community</button>
                      : <div className="community-switch-btn-group">
                      <button className="secondary-btn unfollow-community-btn" onClick={followCommunity}>Unfollow community</button>
                      <button className="secondary-btn join-community-btn" onClick={visitCommunity}>Visit community</button>
                      </div>
                    }
                  </div>
                </Background>
                </div>
  )
}

function Button(props) {
  const { children } = props;

  return (
    <div className="button-card border-0-5px-quarter-spanish-white">
      <div className="default-i905516988 valign-text-middle ibmplexsans-semi-bold-quarter-spanish-white-16px">
        {children}
      </div>
    </div>
  );
}