import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import adjetivos from "./components/adjetivos";
import Comment from "./components/Comment";

const gerarAdjetivo = () => {
  return adjetivos[Math.floor(Math.random() * adjetivos.length)];
};

const App = () => {
  const [comments, setComments] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    if (isLoaded) return;
    axios
      .get("https://randomuser.me/api/?results=10&gender=male")
      .then(response => {
        let users = [];
        response.data.results.forEach(user => {
          user = {
            username: user.login.username,
            profilePic: user.picture.medium,
            commentLikes: Math.floor(Math.random() * 200) + 1,
            message: `Simplesmente o ${gerarAdjetivo()} do entretenimento`,
            createdAt: `há ${Math.floor(Math.random() * 23) + 1} horas atrás`
          };
          users.push(user);
        });
        setComments(users);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [comments, isLoaded]);

  return (
    <div>
      {comments.sort((a,b) => b.commentLikes-a.commentLikes).map(user => (
        <Comment key={comments.indexOf(user)} info={user} />
      ))}
    </div>
  );
};

export default App;
