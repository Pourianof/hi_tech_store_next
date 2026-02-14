import React from "react";

const PathContext = React.createContext("");

export const FieldnamePathProvider = ({
  name,
  children,
}: {
  name: (string | number) | (string | number)[];
  children: React.ReactNode;
}) => {
  const parentPath = React.useContext(PathContext);
  const path = Array.isArray(name) ? name.join(".") : name.toString();
  const value = parentPath ? `${parentPath}.${path}` : path;

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
};

export const useFieldPath = (...name: (string | number)[]) => {
  const path = name.join(".");
  const parentPath = React.useContext(PathContext);
  return parentPath ? `${parentPath}.${path}` : path;
};
