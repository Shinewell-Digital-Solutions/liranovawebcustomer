import React, { useCallback, useEffect, useState } from "react";
import ZoneContext from ".";

const ZoneProvider = (props) => {
  const [zones, setZones] = useState(() => {
    const storedZones = localStorage.getItem("zones");
    return storedZones ? JSON.parse(storedZones) : [];
  });
  const [isZoneSelected, setIsZoneSelected] = useState(false);

  // Function to update zones
  const updateZones = useCallback((newZones) => {
    setZones(newZones);
    localStorage.setItem("zones", JSON.stringify(newZones));
  }, []);

  useEffect(() => {
    const storedZones = localStorage.getItem("zones");
    if (storedZones) {
      setZones(JSON.parse(storedZones));
    }
  }, []);

  return (
    <ZoneContext.Provider value={{ zones, setZones: updateZones, isZoneSelected, setIsZoneSelected }}>
      {props.children}
    </ZoneContext.Provider>
  );
};

export default ZoneProvider;


// import React, { useCallback, useEffect, useState } from "react";
// import ZoneContext from ".";

// const ZoneProvider = (props) => {
//   // Retrieve zones as a comma-separated string and convert to array
//   const [zones, setZones] = useState(() => {
//     const storedZones = localStorage.getItem("zones");
//     return storedZones ? storedZones.split(",") : [];
//   });

//   // Function to update zones as a comma-separated string
//   const updateZones = useCallback((newZones) => {
//     const zonesString = newZones.join(","); // Convert array to comma-separated string
//     setZones(newZones);
//     localStorage.setItem("zones", zonesString); // Store as string in localStorage
//   }, []);

//   useEffect(() => {
//     const storedZones = localStorage.getItem("zones");
//     if (storedZones) {
//       setZones(storedZones.split(",")); // Split the string into an array
//     }
//   }, []);

//   return (
//     <ZoneContext.Provider value={{ zones, setZones: updateZones }}>
//       {props.children}
//     </ZoneContext.Provider>
//   );
// };

// export default ZoneProvider;
