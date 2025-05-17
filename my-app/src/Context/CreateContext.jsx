import React, { useState, createContext, useEffect } from "react";

const CreateContext = createContext();

const CreateProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showForm]);

  return (
    <CreateContext.Provider value={{ showForm, setShowForm }}>
      {children}
    </CreateContext.Provider>
  );
};

export { CreateProvider };

export { CreateContext };
