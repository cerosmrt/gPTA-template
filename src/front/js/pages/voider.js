import React from 'react'; // Import React library
import InputBox from '../component/inputBox'; // Import InputBox component
import styles from "../../styles/voider.css"; // Import CSS styles for this component

export const Voider = () => { // Define the Voider component
    return (
        <div id="circle"> 
            <InputBox /> {/* Render the InputBox component inside the circle */}
        </div>
    );
};
