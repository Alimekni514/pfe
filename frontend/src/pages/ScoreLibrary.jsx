import React, { useState, useEffect } from "react";
import Collection from "../Components/ScoreLibrary/Collection";
import UserScore from "../Components/ScoreLibrary/UserScore";
const token =
  "1c126a1183aaaac514653cb3555fb05953ba09aba270914c8ca6dc65709fafc822dedeecbd4459d24ad7cf12a3c0eda8f2a8ec415d453a5b47d2bb68dd598dfa";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
function ScoreLibrary() {
  //states
  const [collections, setcollections] = useState([]);
  const [userscores,setuserscores]=useState([]);
  const [userid,setuserid]=useState("");

  //UseEffect+SideEffect:Fetch the collections and the Scores
  useEffect(() => {
    //fetch the collections
    const urlcollections = "https://api.flat.io/v2/collections";
    fetch(urlcollections, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        //Filtred Collections //except the trash and shared with me
        const filteredCollections = data.filter(
          (obj) => obj.title !== "Trash" && obj.title !== "Shared with me"
        );
        console.log(filteredCollections);
        setcollections(filteredCollections);
      })
      .catch((error) => console.log(error));
    //fetch the user's scores
    //jib user id
    const currentuserlink = "https://api.flat.io/v2/me";
    fetch(currentuserlink, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
            setuserid(data.id);
        const userscores = `https://api.flat.io/v2/users/${data.id}/scores`;
        fetch(userscores, {
          headers: headers,
        })
          .then((res) => res.json())
          .then((data) => {
           setuserscores(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

        
      
      },[])

  return (
    <div>
      <h3>Scores</h3>
      <div className="bodyScore" style={{display:"flex",justifyContent:"space-between"}}>
        <table style={{width:"60%"}}>

              <thead>
                <tr>
                <td>Name</td>
                <td>Creation Date</td>
                <td>Sharing</td>
                <td></td>
                </tr>
              </thead>
              <tbody>
                {collections && collections.map(collection=> (
                  <Collection key={collection.id} collection={collection} token={token} setcollections={setcollections}/>
                ))}
                {
                  userscores && userscores.map(userscore=> (
                      <UserScore key={userscore.id} collections={collections} userscore={userscore} token={token} setuserscores={setuserscores} id={userid}/>                
                  ))
                }
              </tbody>
        </table>
        <div>
          <button>Hello</button>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}


export default ScoreLibrary;
