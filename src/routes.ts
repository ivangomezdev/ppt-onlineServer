import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "@firebase/database";
import { database, dbFirestore } from "./db";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore/lite";
import { error, log } from "console";
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const APP_SERVER = "https://ppt-onlineserver.onrender.com"

//CREATE__ROOM
app.post("/createRoom", (req, res) => {
  const { email } = req.body;

  let dbIdLarge = "";
  const db = database;
  // Creo un ID aleatorio
  const dbId = Math.floor(Math.random() * 999) + 1000;

  // Creo el room y vinculo el ID de la rtdb con el de Firestore
  addDoc(collection(dbFirestore, "roomInfo"), {
    // Le paso a la db de Firestore los datos de el Room
    idRoom: dbId,
  })
    .then((docRef) => {
      console.log("Room añadido con ID: ", docRef.id);
      // Creo una ROOM en Realtime Database y le asocio un ID de Firestore
      set(ref(db, `rooms/${docRef.id}`), {
          idRoom: dbId,
        });
        dbIdLarge = docRef.id;
        res.status(200).json({ dbId: dbId, dbIdLarge: dbIdLarge });
    })
    .catch((error) => {
      console.error("Error al crear una Room: ", error);
    });
});

//JOIN__ROOM
app.post("/joinRoom", (req, res) => {
  const { idRoom, playerName } = req.body;

  //ref a rooms
  const roomsRef = ref(database, "rooms/");
  //buscar en los rooms quienes tienen un ID igual al que trae el body
  const searchById = query(
    roomsRef,
    orderByChild("idRoom"),
    equalTo(parseInt(idRoom))
  );

  //obtener el IDRoom
  get(searchById).then((snapshot) => {
    if (snapshot.exists()) {
      const value = snapshot.val();
      const IDRoom = Object.keys(value).join("");

      //Agregar player a ese IDroom
     const newUserRef = push(ref(database, `rooms/${IDRoom}/currentGame`), {
        name: playerName,
        choice: "",
        online: true,
        start: false,
    });
    res.send({ message: "Usuario añadido a la sala" ,idRoom:IDRoom,playerId:newUserRef.key});
    } else {
      console.error("No se ha encontrado un Room con ese ID", error);
    }
  });

}); // Se cerró correctamente esta función

//START__GAME

app.listen(APP_SERVER, () => {
  console.log("server corriendo");
});
