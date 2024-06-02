export const ServerAddress = import.meta.env.MODE === 'development' 
  ? import.meta.env.VITE_LOCAL_FLASK_SERVER
  : import.meta.env.VITE_SERVER_ADDRESS