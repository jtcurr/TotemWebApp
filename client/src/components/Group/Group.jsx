import React from 'react';
import { connect } from 'react-redux';
import GroupRow from './GroupRow.jsx';
import GroupSort from './GroupSort.jsx';
import store from '../../redux/store.js';
import localStyles from './GroupStyles.css';
import styles from '../Styles.css'
import { Item } from 'semantic-ui-react'

const GroupView = ({ user, users }) => (
  <div className="custom-container">
    <div className={localStyles.sortToolbar}>
      <GroupSort />
    </div>

      {Object.keys(users).map((userKey, index) => {
        //Anchor current user info at top of view
        const friend = users[userKey];
        if (userKey === user.uid) {
          return (
            <GroupRow key={index} friend={friend} uid={userKey} />
          );
        }
      })}

      {Object.keys(users).map((userKey, index) => {
        const friend = users[userKey];
        if (userKey !== user.uid) {
          return (
            <GroupRow key={index} friend={friend} uid={userKey} />
          );
        }
      })}

    <div className="footerBtn">
      <button>Add a Friend</button>
    </div>
  </div>

);

export default connect((store) => {
  return {
    user: store.user,
    users: store.group.members
  };
})(GroupView);
