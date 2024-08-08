import React, { useEffect } from "react";

export const Chest = () => {
  // Fetch "scrolls" from the database, endpoint /scrolls
  useEffect(() => {
    fetch("/scrolls")
      .then((response) => response.json())
      .then((data) => {
        // Handle the fetched data here
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
      });
  }, []);
  return (
    <div className="homepageContainer">
      <h1>Scrolls</h1>
    </div>
  );
};
