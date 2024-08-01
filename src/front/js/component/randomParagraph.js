import React, { useContext, useState, useEffect } from 'react'; // Imports React and the useState hook from the React library
import '../../styles/randomParagraph.css'; // Imports the CSS module for the RandomParagraph component
import { Context } from '../store/appContext'; // Imports the Context object from the appContext module

const RandomParagraph = () => {
    // Declares a state variable named `paragraph` with an initial value of an empty string.
    // `setParagraph` is a function to update the state.
    const { store, actions } = useContext(Context); // Destructures the store and actions properties from the Context object
    const [paragraph, setParagraph] = useState('');

    // // `fetchParagraph` is an asynchronous function that fetches a random paragraph from the server.
    // const fetchParagraph = async () => {
    //     try {
    //         // Sends a request to the specified API endpoint.
    //         const response = await fetch(`${process.env.BACKEND_URL}/api/random-paragraph`);
    //         if (response.ok) {
    //             // If the response is OK (`response.ok`), the response text is read and set to the `paragraph` state.
    //             const text = await response.text();
    //             setParagraph(text);
    //             // actions.setMessage(text);
    //         } else {
    //             // If the response is not OK, an error message is logged, and the state is set to 'Failed to fetch paragraph.'
    //             console.error('Failed to fetch paragraph:', response.status);
    //             setParagraph('Failed to fetch paragraph.');
    //         }
    //     } catch (error) {
    //         // If an error occurs during the fetch operation, it is caught in the `catch` block, logged, and the state is set to 'Error fetching paragraph.'
    //         console.error('Error:', error);
    //         setParagraph('Error fetching paragraph.');
    //     }
    // };

    const fetchParagraph = () => {
        actions.fetchParagraph();
    }

    return (
        // The `return` statement specifies the JSX to render.
        <div className='randomParagraphButton'>
            {/* A `button` element with an `onClick` handler that triggers `fetchParagraph` when clicked. */}
            <button onClick={fetchParagraph}></button>
        </div>
    );
};

export default RandomParagraph; // Exports the `RandomParagraph` component as the default export of the module
