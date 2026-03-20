export const calculateDriverStats = (drivers, races) => {
  const stats = {};

  // 🏁 Race points (top 10)
  const pointsTable = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

  // 🏎 Sprint points (top 8)
  const sprintPoints = [8, 7, 6, 5, 4, 3, 2, 1];

  // Initialize
  drivers.forEach((driver) => {
    stats[driver.name] = {
      points: 0,
      wins: 0,
      podiums: 0,
      dnfs: 0,
      races: 0,
      dotd: 0,
    };
  });

  races.forEach((race) => {
    const saved = JSON.parse(localStorage.getItem(`race-${race.id}`));
    if (!saved) return;

    const {
      positions = [],
      sprintPositions = [],
      dnf = [],
      driverOfTheDay,
    } = saved;

    // 🏁 Race results
    positions.forEach((driverName, index) => {
      if (!driverName || !stats[driverName]) return;

      stats[driverName].points += pointsTable[index] || 0;
      stats[driverName].races += 1;

      if (index === 0) stats[driverName].wins += 1;
      if (index < 3) stats[driverName].podiums += 1;
    });

    // 🏎 Sprint results
    sprintPositions.forEach((driverName, index) => {
      if (!driverName || !stats[driverName]) return;

      stats[driverName].points += sprintPoints[index] || 0;
    });

    // 💥 DNFs
    dnf.forEach((driverName) => {
      if (!stats[driverName]) return;

      stats[driverName].dnfs += 1;
      stats[driverName].races += 1;
    });

    // 🌟 Driver of the Day
    if (driverOfTheDay && stats[driverOfTheDay]) {
      stats[driverOfTheDay].dotd += 1;
    }
  });

  return stats;
};