const axios = require("axios");
const { URL_USERS, URL_ALBUMS, URL_PHOTOS } = require('../utils/constants');

const requestInfoAxios = async (albumTitle, albumUserEmail, title) => {
  let userResponse = [];
  let albumResponse = [];
  let photoResponse = [];

  const urlAlbums = `${URL_ALBUMS}?`;
  const urlPhotos = `${URL_PHOTOS}?`;
  const urlUsers = `${URL_USERS}?`;


  if (title && albumUserEmail && albumTitle) {
    photoResponse = await axios.get(`${urlPhotos}title_like=${title}`);
    albumResponse = await axios.get(`${urlAlbums}title_like=${albumTitle}&${photoResponse.data.map((el) => `id=${el.albumId}`).join("&")}`);
    userResponse = await axios.get(`${urlUsers}${albumUserEmail ? `email=${albumUserEmail}` : ""}&${albumResponse.data.map((el) => `id=${el.userId}`).join("&")}`);
  } else if(title && albumTitle){
    photoResponse = await axios.get(`${urlPhotos}title_like=${title}`);
    albumResponse = await axios.get(`${urlAlbums}title_like=${albumTitle}&${photoResponse.data.map((el) => `id=${el.albumId}`).join("&")}`);
    userResponse = await axios.get(`${urlUsers}${albumResponse.data.map((el) => `id=${el.userId}`).join("&")}`);
  }else if(title && albumUserEmail){
    photoResponse = await axios.get(`${urlPhotos}title_like=${title}`);
    albumResponse = await axios.get(`${urlAlbums}${photoResponse.data.map((el) => `id=${el.albumId}`).join("&")}`);
    userResponse = await axios.get(`${urlUsers}${albumResponse.data.map((el) => `id=${el.userId}`).join("&")}`);
  }else if( albumUserEmail && albumTitle){
    albumResponse = await axios.get(`${urlAlbums}title_like=${albumTitle}`);
    photoResponse = await axios.get(`${urlPhotos}${albumResponse.data.map((el) => `albumId=${el.id}`).join("&")}`);
    userResponse = await axios.get(`${urlUsers}${albumUserEmail ? `email=${albumUserEmail}` : ""}&${albumResponse.data.map((el) => `id=${el.userId}`).join("&")}`);
  }else if (albumTitle) {
    albumResponse = await axios.get(`${urlAlbums}title_like=${albumTitle}`);
    photoResponse = await axios.get(`${urlPhotos}${albumResponse.data.map((el) => `albumId=${el.id}`).join("&")}`);
    userResponse = await axios.get(`${urlUsers}${albumResponse.data.map((el) => `id=${el.userId}`).join("&")}`);
  }else if (title) {
    photoResponse = await axios.get(`${urlPhotos}title_like=${title}`);
    albumResponse = await axios.get(`${urlAlbums}${photoResponse.data.map((el) => `id=${el.albumId}`).join("&")}`);
    userResponse = await axios.get(`${urlUsers}${albumResponse.data.map((el) => `id=${el.userId}`).join("&")}`);
  }else if (albumUserEmail) {
    userResponse = await axios.get(`${urlUsers}email=${albumUserEmail}`);
    albumResponse = await axios.get(`${urlAlbums}${userResponse.data.map((el) => `userId=${el.id}`).join("&")}`);
    photoResponse = await axios.get(`${urlPhotos}${albumResponse.data.map((el) => `albumId=${el.id}`).join("&")}`);
  }

  let albumUserMerge = albumResponse.data.map(album =>{
    const { userId, ...body} = album;
    let user = userResponse.data.filter(user => user.id === userId)[0];
    return { ...body, user }
  })

  return photoResponse.data.map(photo => {
    const { albumId, ...body } = photo;
    let album = albumUserMerge.filter(album => album.id === albumId)[0];
    return { ...body, album}
  })

};


module.exports = {
    requestInfoAxios
}