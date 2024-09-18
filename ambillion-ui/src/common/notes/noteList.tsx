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
                        className={`d-flex flex-column ${(index + 1) % 2 === 0 ? 'align-items-end' : 'align-items-start'} mb-3`}
                        key={index + 1}
                    >
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card overflow-hidden">
                                <div className="d-flex flex-column flex-md-row">
                                    <div className="p-3 bg-info-subtle d-flex align-items-center">
                                        <h3 className="text-info box mb-0"></h3>
                                    </div>
                                    <div className="p-3">
                                        <h6
                                            className="note-title text-truncate"
                                            data-noteheading={note.created_by}
                                        >
                                            {note?.user_id === userProfile?.userprofile_id
                                                ? 'You'
                                                : `${note?.created_by} ( ${note?.user_role} )`}
                                        </h6>
                                        <p className="note-date fs-2">
                                            {new Date(note.note_created_at).toLocaleDateString()}{' '}
                                            {new Date(note.note_created_at).toLocaleTimeString()}
                                        </p>
                                        <div className="note-content">
                                            <p
                                                className="note-inner-content"
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
