import React from "react";
import "./profile.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function Profile(props) {
    const {
        user_name, 
        user_bio,
        user_email,
        user_photo,
        blurBackground,
        getBackFromEditProfile,
    } = props;     
    return(
        <div id="createProfile" className="container-fluid rounded shadow-lg">
            <div>
                <div className="card ms-4 align-items-end">
                    <button className="btn btn-lg card-item x-btn"
                            onClick={() => {
                                blurBackground();
                                getBackFromEditProfile()
                            }}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
            </div>
            <hr />
            <div className="card-item">
              <div>
                <p>
                  <b>Email:</b>
                </p>
                <p className="text-secondary">{user_email}</p>
              </div>
            </div>
            <hr />
            <div className="card-item">
              {user_bio == "null" ? (
                <div>
                  <p>
                    <b>Bio:</b>
                  </p>
                  <p className="text-secondary">Nothing to show.</p>
                </div>
              ) : (
                <p>
                  <b>Bio: {user_bio}</b>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
