const sendTextToBackend = async (text) => {
    try {
      // Make an API request to the backend
      const response = await fetch(`${process.env.BACKEND_URL}/api/submit-text`, {
        method: 'POST', // HTTP method for the request
        headers: {
          'Content-Type': 'application/json', // Indicate the content type of the request
        },
        body: JSON.stringify({ text }), // Convert the text into JSON format for the request body
      });
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw an error if the response is not okay
      }
  
      // Parse the response data as JSON
      const data = await response.json();
      console.log('Success:', data); // Log the response data
    } catch (error) {
      console.error('Error:', error); // Log any errors that occurred
    }
  };
  