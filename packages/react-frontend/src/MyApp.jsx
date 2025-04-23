// src/MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from "./Form.jsx";

function MyApp(){
    const [characters, setCharacters] = useState([]);

    function fetchUsers(){
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
    
    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
                .then((json) => setCharacters(json["users_list"]))
                .catch((error) => { console.log(error); });
    }, [] );

    function removeOneCharacter(id){
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (res.status === 204) {
                    setCharacters(prevCharacters =>
                        prevCharacters.filter(character => character.id !== id));
                } else {
                    throw new Error("Error deleting user");
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            })
    }

    function updateList(person){
        postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                } else {
                    throw new Error("Error adding user");
                }
            })
            .then((newUser) => {
                setCharacters([...characters, newUser]);
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    }

    function postUser(person){
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        });
        return promise;
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