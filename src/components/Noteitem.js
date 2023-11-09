import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import "../App.css";
import "../NoteItem.css";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { note, updateNote, showAlert } = props;
  const { deleteNote } = context;

  return (
    <div className="note-message">
      <div className="container">
        <div className="note-content">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="note-title">{note.title}</h5>
            <div className="note-buttons">
              <i
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  deleteNote(note._id);
                  showAlert("success", "Note deleted successfully");
                }}
                className="button delete-button mx-2"
              >
                Delete
              </i>
              <i
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  updateNote(note);
                  showAlert("success", "Note Updated successfully");
                }}
                className="button edit-button mx-2"
              >
                Edit
              </i>
            </div>
          </div>
          <p className="note-description">{note.description}</p>
          <small>
            <b>Tags: {"#" + note.tag}</b>
          </small>
          <br />
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
