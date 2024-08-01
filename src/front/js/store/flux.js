const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			paragraph: '',
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			// Added to test fetch randomline in flux.test.js
			fetchRandomLine: async () => {
				try {
					const response = await fetch("https://www.gutenberg.org/random");
					const data = await response.json();
					const lines = data.text.split("\n");
					const randomLine = lines[Math.floor(Math.random() * lines.length)];
					setStore({ message: randomLine });
				} catch (error) {
					console.error('Error fetching random line', error);
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			// `fetchParagraph` is an asynchronous function that fetches a random paragraph from the server.
			fetchParagraph: async () => {
				try {
					// Sends a request to the specified API endpoint.
					const response = await fetch(`${process.env.BACKEND_URL}/api/random-paragraph`);
					if (response.ok) {
						// If the response is OK (`response.ok`), the response text is read and set to the `paragraph` state.
						const text = await response.text();
						setStore({ paragraph: text });
						console.log(text);
						// actions.setMessage(text);
					} else {
						// If the response is not OK, an error message is logged, and the state is set to 'Failed to fetch paragraph.'
						console.error('Failed to fetch paragraph:', response.status);
						setStore({paragraph: 'Failed to fetch paragraph.'});
					}
				} catch (error) {
					// If an error occurs during the fetch operation, it is caught in the `catch` block, logged, and the state is set to 'Error fetching paragraph.'
					console.error('Error:', error);
					setStore({paragraph: 'Failed to fetch paragraph.'});
				}
			}
		}
	};
};

export default getState;
