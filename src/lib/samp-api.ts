
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
  
  // Random number of players between 100 and 150
  const randomPlayers = Math.floor(Math.random() * 51) + 100; // 100-150 range
  
  // Set maximum players to 150
  const maxPlayers = 150;
  
  // Calculate a logical world time (changes each request)
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const worldTime = `${hours}:${minutes}`;
  
  // Return simulated data for the KindreD GTA SAMP server
  return {
    isOnline: true,
    hostname: "KindreD GTA SAMP Server",
    players: randomPlayers,
    maxplayers: maxPlayers,
    gamemode: "Roleplay",
    mapname: "San Andreas",
    language: "Arabic/French",
    passworded: false,
    worldtime: worldTime
  };
};
