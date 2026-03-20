export const calculateConstructorStats = (constructors, drivers, driverStats) => {
    const teamStats = {};
  
    // Initialize all teams
    constructors.forEach((team) => {
      teamStats[team.name] = {
        points: 0,
        wins: 0,
        podiums: 0,
      };
    });
  
    // Aggregate driver stats into teams
    drivers.forEach((driver) => {
      const teamName = driver.team;
      const stats = driverStats[driver.name];
  
      // Safety checks (prevent crash)
      if (!stats) return;
      if (!teamStats[teamName]) return;
  
      teamStats[teamName].points += stats.points || 0;
      teamStats[teamName].wins += stats.wins || 0;
      teamStats[teamName].podiums += stats.podiums || 0;
    });
  
    return teamStats;
  };