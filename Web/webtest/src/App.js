import { useState, useEffect } from "react";
import Cards from "./Components/ListCards/ListCards";
import Input from "./Components/FormInput/FormInput";
import Button from "./Components/Button/Button";
import {
  Flex,
  Box,
  Stack,
  HStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
const App = () => {
  const [data, setData] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);

  const fetchAPI = (photo, album, email, limitv, offsetv) =>{
      let urlAPI = `http://localhost:8081/api/photos?${photo}${album}${email}${limitv}${offsetv}`
      fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch(error => console.log(error));
    
  }
  useEffect(() => {
    const titlePhoto = title ? `title=${title}&` : '';
    const titleAlbum = albumTitle ? `album.title=${albumTitle}&` :'';
    const emailUser = email ? `album.user.email=${email}&` : '';
    const offSetValue = offset ? `offset=${offset}&` : '';
    const limitValue = limit ? `limit=${limit}&` : '';

    fetchAPI(titlePhoto, titleAlbum, emailUser, limitValue, offSetValue)

    return () => {
      //console.log("componente destruido");
    };
  }, [title,albumTitle,email,offset,limit]);

  return (
    <div className="App">
      <Flex
        flexDirection="column"
        backgroundColor={useColorModeValue("white", "gray.800")}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="teal.400" text="ATRACCIONES" />
          <Stack>
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              spacing="8"
            >
              <Input name="Album title" placeholder="Search by Album Title" onChange={(e) => setAlbumTitle(e.target.value)}/>
              <Input name="Title" placeholder="Search by Photo Title" onChange={(e) => setTitle(e.target.value)}/>
              <Input name="Email" placeholder="Search by email" onChange={(e) => setEmail(e.target.value)}/>
              <Input name="Offset" placeholder="Write offset value" onChange={(e) => setOffset(e.target.value)}/>
              <Input name="Limit" placeholder="Write limit value" onChange={(e) => setLimit(e.target.value)}/>
            </Flex>
            { data && data.length > 0 ? <Cards elements={data} /> : <span>No se encontraron resultados</span>}
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
};

export default App;
