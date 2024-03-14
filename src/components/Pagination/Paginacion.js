import {
    Button,
    Flex,
    IconButton,
    Stack,
    Box
  } from "@chakra-ui/react";
import React from "react";

import { FiArrowLeft, FiChevronRight} from "react-icons/fi";

const Pagination = ({ total, currentPage, pageSize, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
    pages.push(i);
  }

  const status = false
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}> 
      <Stack direction={["column", "row"]} spacing="24px">
        <Box w="40px" h="40px" bg="transparent">
          <IconButton  aria-label="Delete" icon={<FiArrowLeft />} 
            isDisabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </Box>
        {status && (
          <div className="pagination-pages">
            {pages.map((page, index) => (
              
                <Button 
                  colorScheme="teal" 
                  variant={`${currentPage === page ? "solid" : "outline"}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              
            ))}
          </div>
        )}
        <Box w="40px" h="40px" bg="transparent">
          <IconButton  aria-label="Delete" icon={<FiChevronRight />} 
            isDisabled={currentPage === Math.ceil(total / pageSize)}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </Box>
      </Stack>
    </Flex>
  );
};

export default Pagination;