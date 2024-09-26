import * as React from "react";
import "./Accordion.css"; // Add your CSS styles here

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleAccordion = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        // const { title, children } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="accordion-item">
                <div className="accordion-title" onClick={this.toggleAccordion}>
                    {/* <h3>{title}</h3> */}
                    <span>{isOpen ? "-" : "+"}</span>
                </div>
                {isOpen && (
                    <div className="accordion-content">
                        {/* {children} */}
                    </div>
                )}
            </div>
        );
    }
}

export default Accordion;
