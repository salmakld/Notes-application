import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({}) => {
  let { id } = useParams();
  let [note, setNote] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    let response = await fetch(`/api/note/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`/api/note/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/note/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    history("/");
  };

  let deleteNote = async () => {
    if (id === "new") return;
    fetch(`/api/note/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    history("/");
  };

  let handleSubmit = () => {
    if (id !== "new" && note.body === '') {
      // if note is empty and it's not a new note, delete it
      deleteNote();
    } else if (id !== "new") {
      // else update note
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    history("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}> Delete</button>
        ) : (
          <button onClick={handleSubmit}> Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      />
    </div>
  );
};

export default NotePage;
