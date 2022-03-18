const { response, request } = require("express");
const axios = require("axios");

const { requestInfoAxios } = require('../helpers/request-axios');
const { URL_USERS, URL_ALBUMS, URL_PHOTOS } = require('../utils/constants');

const photoGetById = async (id) => {
  try {
    const responsePhoto = await axios.get(
      `${URL_PHOTOS}/${id}`
    );
    const responseAlbum = await axios.get(
      `${URL_ALBUMS}/${responsePhoto.data.albumId}`
    );
    const responseUser = await axios.get(
      `${URL_USERS}/${responseAlbum.data.userId}`
    );

    const {
      id: idPhoto,
      title: titlePhoto,
      url,
      thumbnailUrl,
    } = responsePhoto.data;

    const { id: idAlbum, title: titleAlbum } = responseAlbum.data;
    const userData = responseUser.data;

    let albumInfo = {
      id: idAlbum,
      title: titleAlbum,
      user: userData,
    };
    return {
      id: idPhoto,
      title: titlePhoto,
      url,
      thumbnailUrl,
      album: albumInfo,
    };
  } catch (err) {
    console.log(err);
    return "Error";
  }
};

const populateDataPhoto = async (req = request, res = response) => {
  const data = await photoGetById(req.params.id);

  res.json(data);
};

const photoGetInformation = async (req = request, res = response) => {
  const {
    "album.title": albumTitle,
    "album.user.email": albumUserEmail,
    title,
    limit = 25,
    offset = 0
  } = req.query;

  const data = await requestInfoAxios(albumTitle,albumUserEmail,title);
  res.json(data.slice(parseInt(offset, 10), parseInt(offset, 10)+parseInt(limit, 10)));
};

module.exports = {
  photoGetInformation,
  populateDataPhoto,
};
