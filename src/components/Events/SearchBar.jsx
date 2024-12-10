import {
  Box,
  Input
} from "@chakra-ui/react";

const SearchBar = ({searchEvent, setSearchEvent}) => {

  return (
    <Box  m={4}>
      <Input
        placeholder="Search for events"
        value={searchEvent}
        onChange={(e) => setSearchEvent(e.target.value)}
        mb={4}
      />
    </Box>
  );
};

export default SearchBar;