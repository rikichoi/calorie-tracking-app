import { createContext, useState } from "react";
import { useInView } from "framer-motion";

export const viewContext = createContext({
  sectionInView: "",
  homeValue: false,
  featuresValue: false,
  pricingValue: false,
  supportValue: false,
  contactValue: false,
  getHomeValue: () => {},
  getFeaturesValue: () => {},
  getPricingValue: () => {},
  getSupportValue: () => {},
  getContactValue: () => {},
});

export default function ViewContextProvider({ children }) {
  const [sectionInView, setSectionInView] = useState();
  const [homeValue, setHomeValue] = useState();
  const [featuresValue, setFeaturesValue] = useState();
  const [pricingValue, setPricingValue] = useState();
  const [supportValue, setSupportValue] = useState();
  const [contactValue, setContactValue] = useState();

  const getHomeValue = ( value ) => {
    setHomeValue(value);
  };
  const getFeaturesValue = ( value ) => {
    setFeaturesValue(value);
  };
  const getPricingValue = ( value ) => {
    setPricingValue(value);
  };
  const getSupportValue = ( value ) => {
    setSupportValue(value);
  };
  const getContactValue = ( value ) => {
    setContactValue(value);
  };

  return (
    <viewContext.Provider
      value={{
        sectionInView,
        homeValue,
        featuresValue,
        pricingValue,
        supportValue,
        contactValue,
        getContactValue,
        getFeaturesValue,
        getHomeValue,
        getPricingValue,
        getSupportValue
      }}
    >
      {children}
    </viewContext.Provider>
  );
}
