import React from "react";
import Background from "../Background/Background";
import "./communities-card.css";

const CommunitiesCard = ({data=[]}) => {
  return (
    <>
    <div className='course-card-wrapper'>
      <div className='courses-card-container'>
        <div>
          {
            data.length > 0 && data.map(community => {
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
                      <button className="secondary-btn join-community-btn">Join community</button>
                  </div>
                </Background>
                </div>
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