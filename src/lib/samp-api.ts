
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

// Since samp-query doesn't work in browser environment (needs Node.js dgram module),
// we'll simulate the server data for the front-end
export const fetchServerInfo = async (): Promise<ServerInfo> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return simulated data for the KindreD GTA SAMP server
  return {
    isOnline: true,
    hostname: "KindreD GTA SAMP Server",
    players: 410,
    maxplayers: 500,
    gamemode: "Roleplay",
    mapname: "San Andreas",
    language: "Arabic/French",
    passworded: false,
    worldtime: "12:30"
  };
};
