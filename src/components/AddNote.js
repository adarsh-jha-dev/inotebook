import React, { useContext, useState } from 'react';
import '../App.css';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title : "", description : "", tag: ""});
  
  const handleClick = (e) =>{
    e.preventDefault();
    if(props.showAlert)
    {
        props.showAlert("success", "Note added successfully");
    }
    addNote(note.title, note.description, note.tag);
  }
  const onChange = (e) =>{
    setNote({...note, [e.target.name] : e.target.value});   
  }

  return (
    <div className="add-note-container">
      <h1 className="add-note-title">Add Note</h1>
      <form className='add-note-form'>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={onChange}
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="description"
            minLength={5}
            id="description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="tag"
            id="tag"
            required
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="button"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  )
}

export default AddNote
