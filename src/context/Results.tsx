// Essentials
import { createContext, useContext, useState } from "react";

// Models
import { ArtRequestForm } from "../models/ArtRequestForm";

interface ResultsContextType {
    artRequestForm: ArtRequestForm | null;
    setArtRequestForm: React.Dispatch<React.SetStateAction<ArtRequestForm | null>>;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);
const useResultsContext = () => {
    const context = useContext(ResultsContext);
    if (!context) {
        throw new Error("useResultsContext cannot be used outside of ResultsProvider.");
    }
    return context;
};

const ResultsProvider = ({ children }: { children: React.ReactNode }) => {
    const [artRequestForm, setArtRequestForm] = useState<ArtRequestForm | null>(null);

    const value = {
        artRequestForm, setArtRequestForm
    }

    return (
        <ResultsContext.Provider value={value}>
            {children}
        </ResultsContext.Provider>
    );
}

export { ResultsProvider, useResultsContext };