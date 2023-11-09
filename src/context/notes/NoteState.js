// import React from "react";
// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // get all notes

  const getAllNotes = async () => {
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      }
      );
      const json = await response.json();
      // console.log(json);
      setNotes(json);
  };
  
  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag })
      }
    );
  
    if (response.status === 200) {
      // Assuming your API returns the added note, add it to the existing notes state
      const addedNote = await response.json();
      setNotes([...notes, addedNote]);
    } else {
      // Handle errors if needed
      // console.log("Some errror occured");
    }

  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag})
      }
      );
      // console.log(response);
      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; 
        }
      }  
      setNotes(newNotes);
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
      }
      );
      if (response.status === 200) {
        // Remove the deleted note from the current state
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      } else {
        // console.log("Some errror occured");
      }
  }
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
