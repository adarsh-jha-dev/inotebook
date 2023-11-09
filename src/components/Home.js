import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

function Home(props) {
  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      <Notes showAlert={props.showAlert}/>
    </div>
  );
}

export default Home;
