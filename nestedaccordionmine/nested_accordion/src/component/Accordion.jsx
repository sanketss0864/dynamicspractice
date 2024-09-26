/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ShadcnAccordion = ({ accounts }) => {
  const [activeParentIndex, setActiveParentIndex] = useState(0); // Ensure the first item is active by default
  const [activeTab, setActiveTab] = useState({});

  useEffect(() => {
    if (accounts.length > 0) {
      const firstKey = Object.keys(accounts[0]).find(
        (key) => Array.isArray(accounts[0][key]) && accounts[0][key].length > 0
      );
      if (firstKey) {
        setActiveTab({ 0: firstKey });
      }
    }
  }, [accounts]);

  const toggleParentAccordion = (index) => {
    if (activeParentIndex === index) return; // Prevent collapsing the currently active accordion item
    const firstKey = Object.keys(accounts[index]).find(
      (key) => Array.isArray(accounts[index][key]) && accounts[index][key].length > 0
    );
    if (firstKey) {
      setActiveTab({ [index]: firstKey });
    } else {
      setActiveTab({});
    }
    setActiveParentIndex(index);
  };

  const selectTab = (parentIndex, tabKey) => {
    setActiveTab({ [parentIndex]: tabKey });
  };

  const renderArrayAsTab = (array, parentIndex, tabKey) => {
    if (Array.isArray(array) && array.length > 0 && typeof array[0] === 'object') {
      return (
        <TabsTrigger
          key={tabKey}
          value={tabKey}
          onClick={() => selectTab(parentIndex, tabKey)}
        >
          {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
        </TabsTrigger>
      );
    }
    return null;
  };

  const renderObjectContent = (data) => {
    if (typeof data === 'object' && !Array.isArray(data)) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data).map((key) => (
                <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {Object.keys(data).map((key) => (
                <TableCell key={key}>
                  {typeof data[key] === 'object' ? renderObjectContent(data[key]) : data[key]}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      );
    }
    return data;
  };

  const renderActiveTabContent = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((field) => (
                <TableHead key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={idx}>
                {Object.keys(item).map((field) => (
                  <TableCell key={field}>
                    {Array.isArray(item[field])
                      ? renderArrayAsTab(item[field], idx, `${field}-${idx}`)
                      : typeof item[field] === 'object' && item[field] !== null
                      ? renderObjectContent(item[field])
                      : item[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    return null;
  };

  return (
    <Accordion type="single">
      {accounts.map((account, parentIndex) => (
        <AccordionItem key={account.account_id} value={parentIndex.toString()}>
          <AccordionTrigger onClick={() => toggleParentAccordion(parentIndex)}>
            {`${account.name} (${account.industry}, ${account.location})`}
          </AccordionTrigger>
          <AccordionContent>
            {activeParentIndex === parentIndex && (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(accounts[activeParentIndex])
                        .filter((key) => !Array.isArray(accounts[activeParentIndex][key]))
                        .map((field) => (
                          <TableHead key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</TableHead>
                        ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      {Object.keys(accounts[activeParentIndex])
                        .filter((key) => !Array.isArray(accounts[activeParentIndex][key]))
                        .map((field) => (
                          <TableCell key={field}>{accounts[activeParentIndex][field]}</TableCell>
                        ))}
                    </TableRow>
                  </TableBody>
                </Table>
                <Tabs>
                  <TabsList>
                    {Object.keys(accounts[activeParentIndex]).map((key) =>
                      Array.isArray(accounts[activeParentIndex][key]) &&
                      accounts[activeParentIndex][key].length > 0 &&
                      typeof accounts[activeParentIndex][key][0] === 'object' ? (
                        renderArrayAsTab(accounts[activeParentIndex][key], activeParentIndex, key)
                      ) : null
                    )}
                  </TabsList>
                  {Object.keys(accounts[activeParentIndex]).map((key) =>
                    activeTab[activeParentIndex] === key ? (
                      <TabsContent key={key} value={key}>
                        {renderActiveTabContent(accounts[activeParentIndex][key])}
                      </TabsContent>
                    ) : null
                  )}
                </Tabs>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ShadcnAccordion;
