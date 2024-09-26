import * as React from "react";
import Accordion from "./Accordion";

const NestedAccordion = () => {
    return (
        <div className="nested-accordion">
            <Accordion title="Section 1">
                <Accordion title="Subsection 1.1">
                    <p>Content for Subsection 1.1</p>
                </Accordion>
                <Accordion title="Subsection 1.2">
                    <p>Content for Subsection 1.2</p>
                </Accordion>
            </Accordion>
            <Accordion title="Section 2">
                <Accordion title="Subsection 2.1">
                    <p>Content for Subsection 2.1</p>
                </Accordion>
            </Accordion>
        </div>
    );
}

export default NestedAccordion;
