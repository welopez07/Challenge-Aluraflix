import { VideoProvider } from './components/VideoProvider/VideoProvider'
import { useVideo } from './components/Context/VideoContext'
import Alert from './components/Alert/Alert'
import Home from "./Pages/Home";
import "normalize.css"

function AppContent() {
    const { alert, setAlert } = useVideo();

    return (
        <div style={{
            height: '100%',
            backgroundColor: "#000",
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            overflowX: 'hidden'
        }}>
            <Home />
            {alert && alert.message && (
                <Alert
                    open={!!alert}
                    onClose={() => setAlert(null)}
                    message={alert.message}
                    type={alert.type || 'success'}
                    position={alert.position || { vertical: 'bottom', horizontal: 'left' }}
                />
            )}
        </div>
    );
}

function App() {
    return (
        <VideoProvider>
            <AppContent />
        </VideoProvider>
    );
}
export default App;