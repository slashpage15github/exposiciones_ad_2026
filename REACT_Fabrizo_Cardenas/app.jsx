function Contador() {
    // Usamos el estado para llevar la cuenta
    const [cuenta, setCuenta] = React.useState(0);

    return (
        <div style={{ 
            padding: '20px', 
            border: '2px dashed #007acc', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            marginTop: '20px'
        }}>
            <h2>Componente de React Interactivo</h2>
            <p>El botón ha sido presionado {cuenta} veces.</p>
            <button 
                onClick={() => setCuenta(cuenta + 1)}
                style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '16px' }}
            >
                Aumentar contador
            </button>
        </div>
    );
}

// Buscamos el div en el HTML y le inyectamos el componente
const nodoRaiz = document.getElementById('contenedor-react');
const root = ReactDOM.createRoot(nodoRaiz);
root.render(<Contador />);