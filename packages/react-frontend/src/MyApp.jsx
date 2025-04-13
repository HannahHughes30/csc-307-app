// MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);
  
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }
  
  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }
  
  function removeOneCharacter(index) {
    const id = characters[index].id;
    
    deleteUser(id)
      .then((response) => {
        if (response.status === 204) {
          // Only update the UI if the delete was successful
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        } else {
          console.log("Failed to delete character, server returned status:", response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          // Parse the response to get the user with ID
          return response.json();
        }
        throw new Error("Failed to add character");
      })
      .then((newUser) => {
        // Update characters with the new user that includes the ID
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
