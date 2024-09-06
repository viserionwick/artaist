// Essentials
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useResultsContext } from "../context/Results";

const Results: React.FC = () => {
    const { artRequestForm } = useResultsContext();
    const goTo = useNavigate();

    useEffect(() => {
        !artRequestForm && goTo("/");
    }, [artRequestForm]);

    return (
        <div className="p-Results">
            Results
        </div>
    )
}

export default Results;