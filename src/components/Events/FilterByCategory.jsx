
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { EventContext } from "../EventProvider";

const FilterByCategory = ({selectedCategories, setSelectedCategories}) => {
  const { categories } = useContext(EventContext);
  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Filter by categories
      </MenuButton>
      <MenuList>
        {Object.entries(categories).map(([key, value]) => (
          <MenuItem key={key}>
            <Checkbox  
              isChecked={selectedCategories.includes(value)}
              onChange={() => handleCheckboxChange(value)} 
              key={key} 
              value={key}
            >
              {value}
            </Checkbox>
            </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterByCategory;