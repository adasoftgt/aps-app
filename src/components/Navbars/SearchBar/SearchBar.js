import React, {useState} from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useUsers } from "contexts/UsersContext";

export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, children, ...rest } = props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "navy.800");
  
  const {
    apsSearch,setApsSearch,
  } = useUsers()
  
  const [textSearch,setTextSearch] = useState('')
  const [spinnerStatus,setSpinnerStatus] = useState(false)
  

  const handleSearch = () =>{
    setSpinnerStatus(true);
    setApsSearch(textSearch)
    setTimeout(() => {
      setSpinnerStatus(false);
    }, 200);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSpinnerStatus(true);
      setApsSearch(textSearch)
      setTimeout(() => {
        setSpinnerStatus(false);
      }, 200);
    }
  };
  return (
    <InputGroup borderRadius='8px' w='200px' {...rest}>
      <InputLeftElement
        children={
          <IconButton
            bg='inherit'
            borderRadius='inherit'
            _hover='none'
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              spinnerStatus ? (
                <Spinner />
              ) : (
                <SearchIcon color={searchIconColor} w='15px' h='15px' onClick={handleSearch} />
              )
            }
          ></IconButton>
        }
      />
      <Input
        variant='search'
        fontSize='xs'
        bg={inputBg}
        placeholder='Type here...'
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </InputGroup>
  );
}
