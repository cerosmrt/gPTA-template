import React, { useState, useRef, useEffect } from "react"; // Importa los hooks necesarios desde React
// import "../../styles/inputBox.css";

const InputBox = () => {
  const [text, setText] = useState(""); // Estado para almacenar el texto ingresado en el input
  const inputRef = useRef(null); // Referencia para acceder directamente al elemento input

  // Función para enviar el texto al backend
  const sendTextToBackend = async (text) => {
    try {
      // Realiza una solicitud POST al endpoint del backend
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/voided-lines`, // URL del endpoint
        {
          method: "POST", // Método HTTP para enviar datos
          headers: {
            "Content-Type": "application/json", // Indica que el cuerpo de la solicitud es JSON
          },
          body: JSON.stringify({ text }), // Convierte el texto a formato JSON para el cuerpo de la solicitud
        }
      );

      if (!response.ok) {
        // Verifica si la respuesta no es OK
        throw new Error("Network response was not ok"); // Lanza un error si la respuesta no es válida
      }

      const data = await response.json(); // Analiza la respuesta como JSON
      console.log("Text submitted:", data); // Registra los datos de respuesta en la consola
    } catch (error) {
      console.error("Error submitting text:", error); // Registra cualquier error en la consola
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Verifica si la tecla presionada es Enter
      e.preventDefault(); // Previene el comportamiento predeterminado de Enter (ej. enviar formulario)
      if (text.trim()) {
        // Verifica si el texto no está vacío
        sendTextToBackend(text); // Llama a la función para enviar el texto al backend
        setText(""); // Limpia el campo de entrada después de enviar
      }
    }
  };

  return (
    <div>
      <input
        id="entry" // ID del campo de entrada
        ref={inputRef} // Asigna la referencia al campo de entrada
        type="text" // Tipo de entrada (texto)
        value={text} // Valor del campo de entrada, vinculado al estado
        onChange={(e) => setText(e.target.value)} // Actualiza el estado cuando cambia el valor del campo
        onKeyDown={handleKeyDown} // Asocia el manejador de eventos para la tecla presionada
        placeholder="" // Texto de marcador de posición (vacío en este caso)
        className="entry-input" // Clase CSS para estilos del campo de entrada
      />
    </div>
  );
};

export default InputBox; // Exporta el componente para su uso en otras partes de la aplicación
