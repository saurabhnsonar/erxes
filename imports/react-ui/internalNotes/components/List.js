import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

      <ul className="customers-internal-notes-list">
        {notes.map(note => (
          <li key={note._id}>
            <div className="note">{note.content}</div>
            <div className="meta">
              <div className="pull-left">
                <span className="who">
                  {note.createdUser.details.fullName} /{' '}
                </span>
                {' '}
                <span className="when">{moment(note.createdDate).fromNow()}</span>
              </div>
              <div className="pull-right">
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

List.propTypes = propTypes;

export default List;
