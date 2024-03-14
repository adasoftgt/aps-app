import React, { useState } from "react";
import { Accordion, AccordionItem } from "@chakra-ui/react";

const SubItemsAccordion = ({ item, onNavigate }) => {
  if (!item.children) return null;

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <Accordion allowMultiple isOpen={isAccordionOpen} onChange={setIsAccordionOpen}>
      {item.children.map((subItem) => (
        <AccordionItem key={subItem.path} onClick={() => onNavigate(subItem.path)}>
          {subItem.icon && <Icon>{subItem.icon}</Icon>}
          {subItem.name}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SubItemsAccordion;