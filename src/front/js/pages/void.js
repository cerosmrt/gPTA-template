import React, { useState, useEffect } from 'react'; // Importa useState y useEffect de React
import styles from '../../styles/void.css'; // Importa los estilos CSS para este componente

export const Void = () => {
    const [lines, setLines] = useState([]); // Estado para almacenar las líneas recuperadas

    useEffect(() => {
        // Función para obtener las líneas almacenadas desde el backend
        const fetchLines = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/voided-lines`); // Realiza una solicitud GET al backend
                if (response.ok) { // Verifica si la respuesta es exitosa
                    const data = await response.json(); // Convierte la respuesta a formato JSON
                    setLines(data); // Actualiza el estado con las líneas recuperadas
                } else {
                    console.error('Failed to fetch lines'); // Muestra un error si la respuesta no es exitosa
                }
            } catch (error) {
                console.error('Error fetching lines:', error); // Muestra un error si hay un problema con la solicitud
            }
        };

        fetchLines(); // Llama a la función para obtener las líneas al montar el componente
    }, []); // El array vacío indica que este useEffect se ejecuta solo una vez al montar el componente

    return (
        <div className={styles.voidPage}> {/* Aplica estilos a la página completa */}
            <h1>Stored Lines</h1> {/* Título de la página */}
            <div className={styles.document}> {/* Aplica estilos al documento */}
                {lines.map((line, index) => (
                    <p key={index}>{line.text}</p> // Muestra cada línea almacenada como un párrafo
                ))}
            </div>
        </div>
    );
};


