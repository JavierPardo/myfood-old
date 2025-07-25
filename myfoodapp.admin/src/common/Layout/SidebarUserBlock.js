import React from 'react';
import { Collapse } from 'reactstrap';

import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function SidebarUserBlock() {
  const { user } = useContext(UserContext);
  return (
    <Collapse id="user-block" isOpen={true}>
      <div>
        <div className="item user-block">
          <div className="user-block-info">
            <span className="user-block-name">Hello, {user.fullname}</span>
          </div>
        </div>
      </div>
    </Collapse>
  );
}
