
import query from 'samp-query';

export type ServerInfo = {
  hostname?: string;
  players?: number;
  maxplayers?: number;
  gamemode?: string;
  mapname?: string;
  language?: string;
  passworded?: boolean;
  worldtime?: string;
  isOnline: boolean;
};

export const fetchServerInfo = async (): Promise<ServerInfo> => {
  return new Promise((resolve) => {
    const serverIP = '91.121.237.128';
    const serverPort = 1958;
    
    query({ host: serverIP, port: serverPort }, (error, response) => {
      if (error) {
        console.error('Server query error:', error);
        resolve({ isOnline: false });
      } else {
        resolve({
          ...response,
          isOnline: true
        });
      }
    });
  });
};
