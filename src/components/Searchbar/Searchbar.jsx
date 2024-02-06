/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input, Button, Container, Flex } from "@mantine/core";

function Searchbar({search , setSearch}) {

    const handleSearchInputChange = (event) => {
      setSearch(event.target.value);
    };

    const handleSearchClick = () => {
      console.log(`Searching for "${search}"...`);
    };

  return ( 
    <>
      <Container  m={50}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          align="center"
          justify="center"
        >
          <Input
            placeholder="Search"
            value={search}
            onChange={handleSearchInputChange}
            radius="xl"
            w={300}
          />
          <Button onClick={handleSearchClick}  size="xs" radius="xl">
            Search
          </Button>
        </Flex>
      </Container>
    </>

 
        // <Combobox store={combobox}>
        //   <Combobox.Target>
        //   <TextInput
        //   label="Pick value or type anything"
        //   placeholder="Pick value or type anything"
        //   value={search}
        //   onChange={(event) => {
        //     setSearch(event.currentTarget.value);
        //     combobox.openDropdown();
        //     combobox.updateSelectedOptionIndex();
        //   }}
        //   onClick={() => combobox.openDropdown()}
        //   onFocus={() => combobox.openDropdown()}
        //   onBlur={() => combobox.closeDropdown()}
        // />
        //   </Combobox.Target>
    
        //   <Combobox.Dropdown>  
        //     <Combobox.Options>
        //       <Combobox.Group label="Cuisines">
        //         <Combobox.Option value="1">First</Combobox.Option>
        //         <Combobox.Option value="2">Second</Combobox.Option>
        //       </Combobox.Group>
    
        //       <Combobox.Group label="Meal Types">
        //         <Combobox.Option value="3">Third</Combobox.Option>
        //         <Combobox.Option value="4">Fourth</Combobox.Option>
        //       </Combobox.Group>
        //     </Combobox.Options>
    
        //     <Combobox.Footer>Combobox footer</Combobox.Footer>
        //   </Combobox.Dropdown>
        // </Combobox>
      );
}

export default Searchbar