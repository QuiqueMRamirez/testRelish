import { useState, useEffect } from "react";
import Cards from "./Components/ListCards/ListCards";
import Input from "./Components/FormInput/FormInput";
import DarkSwitch from "./Components/DarkModeSwitch/DarkSwitch";

import {
  Flex,
  Stack,
  useColorMode,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
const App = () => {
  const [data, setData] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const fetchAPI = (photo, album, email, limitv, offsetv) => {
    let urlAPI = `${process.env.REACT_APP_API_URL}${photo}${album}${email}${limitv}${offsetv}`;
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const titlePhoto = title ? `title=${title}&` : "";
    const titleAlbum = albumTitle ? `album.title=${albumTitle}&` : "";
    const emailUser = email ? `album.user.email=${email}&` : "";
    const offSetValue = offset ? `offset=${offset}&` : "";
    const limitValue = limit ? `limit=${limit}&` : "";

    fetchAPI(titlePhoto, titleAlbum, emailUser, limitValue, offSetValue);

    return () => {
      //console.log("componente destruido");
    };
  }, [title, albumTitle, email, offset, limit]);

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
          <Stack>
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <HStack mt="2">
                <Input
                  name="Album title"
                  placeholder="Search by Album Title"
                  onChange={(e) => setAlbumTitle(e.target.value)}
                />
                <Input
                  name="Title"
                  placeholder="Search by Photo Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  name="Email"
                  placeholder="Search by email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  name="Offset"
                  placeholder="Write offset value"
                  onChange={(e) => setOffset(e.target.value)}
                />
                <Input
                  name="Limit"
                  placeholder="Write limit value"
                  onChange={(e) => setLimit(e.target.value)}
                />
                <DarkSwitch isDark={isDark} toggleColorMode={toggleColorMode} />
              </HStack>
            </Flex>
            {data && data.length > 0 ? (
              <Cards elements={data} />
            ) : (
              <span>No results found</span>
            )}
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
};

export default App;
