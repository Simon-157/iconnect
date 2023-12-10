import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD3dBKUl0_UnUit5XhDrOZ5pG6amqjI8xg",
  authDomain: "iconnect-406316.firebaseapp.com",
  projectId: "iconnect-406316",
  storageBucket: "iconnect-406316.appspot.com",
  messagingSenderId: "910991037902",
  appId: "1:910991037902:web:0d506e3a0bd93519eb079f"
};


firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const useFirebaseStorage = () => {
  const [imageUrl, setImageUrl] = useState('');

  const uploadImage = async (file) => {
    try {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${file.name}`);
      await imageRef.put(file);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const getImageUrl = async (imageName) => {
    try {
      const imageRef = storage.ref().child(`images/${imageName}`);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url);
    } catch (error) {
      console.error('Error getting image URL: ', error);
    }
  };

  return { imageUrl, uploadImage, getImageUrl };
};

export default useFirebaseStorage;
