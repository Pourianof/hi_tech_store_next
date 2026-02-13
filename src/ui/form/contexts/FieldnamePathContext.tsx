import React from "react";

const PathContext = React.createContext("");

export const FieldnamePathProvider = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  const parentPath = React.useContext(PathContext);
  const value = parentPath ? `${parentPath}.${name}` : name;

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
};

export const useFieldPath = (...name: (string | number)[]) => {
  const path = name.join(".");
  const parentPath = React.useContext(PathContext);
  return parentPath ? `${parentPath}.${path}` : path;
};
