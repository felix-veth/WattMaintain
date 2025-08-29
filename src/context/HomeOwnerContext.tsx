import React, { createContext, useContext, useState } from "react";

export type HomeOwnerForm = {
  name: string;
  email: string;
  purchaseDate: string;
  brand: string;
  model: string;
  location: string;
  storageSystem: boolean;
  checkupInterval: string;
  cleaningInterval: string;
  reminder: boolean;
  nextMaintenanceDate: string;
  notifications?: Notification[];
  calendarEvents?: Notification[];
};

export type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  severity?: string;
  estTime?: string;
};

const HomeOwnerContext = createContext<{
  form: HomeOwnerForm;
  setForm: React.Dispatch<React.SetStateAction<HomeOwnerForm>>;
}>({
  form: {
    name: "",
    email: "",
    purchaseDate: "",
    brand: "",
    model: "",
    location: "",
    storageSystem: false,
    checkupInterval: "",
    cleaningInterval: "",
    reminder: false,
    nextMaintenanceDate: "",
  },
  setForm: () => {},
});

export const useHomeOwner = () => useContext(HomeOwnerContext);

export const HomeOwnerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [form, setForm] = useState<HomeOwnerForm>({
    name: "",
    email: "",
    purchaseDate: "",
    brand: "",
    model: "",
    location: "",
    storageSystem: false,
    checkupInterval: "",
    cleaningInterval: "",
    reminder: false,
    nextMaintenanceDate: "",
  });

  return (
    <HomeOwnerContext.Provider value={{ form, setForm }}>
      {children}
    </HomeOwnerContext.Provider>
  );
};
