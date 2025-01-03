import { localStorageKey } from 'constants/common';
import React from 'react';
import { NoteProps } from 'reduxSaga/modules/product-module/type/types';
import { getLocalStorage } from 'utils/localStorage';

type NoteListProps = {
    notesList: NoteProps[] | null; // 'notesList' can be an array of NoteProps or null
};

/**
 * A functional component that displays a list of notes.
 *
 * @param {NoteListProps} props - The component props containing the notesList.
 * @returns {JSX.Element} The note list component displaying individual notes.
 */
const NoteList: React.FC<NoteListProps> = ({ notesList }) => {
    // Check if notesList is not null and contains elements
    const hasNotes = notesList && notesList.length > 0;
    // Retrieve user profile from localStorage
    const userProfile = getLocalStorage(localStorageKey.USER_PROFILE) || {};
    return (
        <div className="d-flex flex-column">
            {hasNotes ? (
                notesList.map((note, index) => (
                    <div
                        className={`d-flex flex-column ${(index + 1) % 2 === 0 ? 'align-items-end' : 'align-items-start'}`}
                        key={index + 1}
                    >
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card overflow-hidden">
                                <div className="d-flex flex-column flex-md-row">
                                    <div className="p-2 bg-info-subtle d-flex align-items-center"></div>
                                    <div className="p-1 w-100">
                                        <div className="d-flex justify-content-between p-1">
                                            <h6
                                                className="note-title text-truncate mb-1"
                                                data-noteheading={note.created_by}
                                            >
                                                {note?.user_id === userProfile?.userprofile_id
                                                    ? 'You'
                                                    : `${note?.created_by} ( ${note?.user_role} )`}
                                            </h6>
                                            <p className="note-date fs-2 mb-1">
                                                {new Date(
                                                    note.note_created_at
                                                ).toLocaleDateString()}{' '}
                                                {new Date(
                                                    note.note_created_at
                                                ).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className="note-content">
                                            <p
                                                className="note-inner-content ms-1 mb-1"
                                                data-notecontent={note.note_description}
                                            >
                                                {note.note_description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No notes available</p>
            )}
        </div>
    );
};

export default NoteList;
