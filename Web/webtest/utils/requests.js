

const buildUrlAPI = (photo, album, email) => {
    let url = '';
    if(photo && album && email){
        url = `${photo}&${album}&${email}`;
    }
}

export default buildUrlAPI;