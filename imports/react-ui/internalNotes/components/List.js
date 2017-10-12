import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { NameCard } from '/imports/react-ui/common';
import Form from './Form';

const propTypes = {
  notes: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
};

function List({ notes, remove, create }) {
  return (
    <div>
      <Form create={create} />

      <div className="internal-notes-list">
        {notes.map(note => (
          <div key={note._id} className="item">
            <div className="topbar">
              <NameCard user={note.createdUser} avatarSize={50} />
              <div className="date">{moment(note.createdDate).fromNow()}</div>
              <div className="clearfix" />
            </div>
            <div className="text">{note.content}</div>

            {note.createdUserId === Meteor.userId()
              ? <i
                  className="delete ion-trash-a"
                  role="button"
                  onClick={() => {
                    if (confirm('Are you sure to delete this note?')) {
                      remove(note._id);
                    }
                  }}
                />
              : null}
          </div>
        ))}
      </div>
    </div>
  );
}

List.propTypes = propTypes;

export default List;