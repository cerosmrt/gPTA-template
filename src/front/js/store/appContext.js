import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
import getState from "./flux.js"; // Import the function to get the initial state and actions from flux.js

// Create a Context for global state management, initialized to null by default
export const Context = React.createContext(null);

// Higher-order function that injects the global store into any component
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// Initialize state with the global store and actions
		const [state, setState] = useState(
			getState({
				// Function to get the current store state
				getStore: () => state.store,
				// Function to get the current actions
				getActions: () => state.actions,
				// Function to update the store and actions
				setStore: updatedStore =>
					setState({
						// Merge the updated store with the existing state
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * The function inside useEffect runs only once when the component mounts.
			 * It’s used to perform side effects, such as AJAX requests or API calls.
			 * This is equivalent to "window.onLoad" and should be used to initialize data.
			 * Do not use setState() here to save data; use actions instead.
			 */
			state.actions.getMessage(); // Call an action function to fetch data or perform some operation
		}, []); // Empty dependency array ensures this effect runs only once

		// Provide the context with the current state, including store and actions
		// Pass the wrapped component and its props to the Context.Provider
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper; // Return the wrapper component
};

export default injectContext; // Export the higher-order function
