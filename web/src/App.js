import EgorsContainer from './components/EgorsContainer';
import ArtemsContainer from './components/ArtemsContainer';

function App() {
    return (
        <>
            <input type="checkbox" id="theme-switch" />
            <div id="page">
                <EgorsContainer></EgorsContainer>
                <ArtemsContainer></ArtemsContainer>
            </div>
        </>
    );
}

export default App;
