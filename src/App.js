import { useState, useEffect } from 'react';
import FlightsList from './components/FlightsList';
import Sidebar from './components/Sidebar';
import { ContextProvider } from './context';

function App() {
    const [flights, setFlight] = useState([]);

    useEffect(() => {
        fetch('flights.json')
            .then((res) => res.json())
            .then((data) => {
                setFlight(data.result.flights);
            });
    }, []);

    return (
        <div className="App">
            <ContextProvider>
                <Sidebar />
                <FlightsList flights={flights} />
            </ContextProvider>
        </div>
    );
}

export default App;
