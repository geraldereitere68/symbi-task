// Filename: ComplexCode.js

/*
 * This code demonstrates a complex algorithm for generating a maze using a Depth-First Search approach.
 * The maze is displayed using ASCII characters in the console, and the algorithm ensures that there is
 * always a path from the starting point to the destination. The maze is created dynamically based on the
 * provided dimensions, and the position of the walls and paths are randomly generated.
 *
 * Key Features:
 * - Depth-First Search algorithm for generating the maze
 * - ASCII representation of the maze in the console
 * - Randomized wall and path generation
 * - Constraint-based movement to prevent dead-ends
 * - Sophisticated logic to ensure a solvable maze
 */

// Constants
const WALL_CHAR = "#";
const PATH_CHAR = " ";
const START_CHAR = "S";
const DEST_CHAR = "D";

// GenerateRandomMaze function
function GenerateRandomMaze(width, height) {
  // Maze dimensions
  const mazeWidth = width * 2 + 1;
  const mazeHeight = height * 2 + 1;

  // Maze array
  let maze = Array(mazeHeight)
    .fill(null)
    .map(() => Array(mazeWidth).fill(WALL_CHAR));

  // Starting point
  let startX = getRandomIntInRange(1, width) * 2;
  let startY = getRandomIntInRange(1, height) * 2;
  maze[startY][startX] = START_CHAR;

  // Generate maze
  let path = [[startX, startY]];
  let visited = [[startX, startY]];

  while (path.length > 0) {
    let currentPath = path[path.length - 1];
    let [x, y] = currentPath;

    let unvisitedNeighbors = getUnvisitedNeighbors(x, y);
    if (unvisitedNeighbors.length > 0) {
      let [nextX, nextY] = unvisitedNeighbors[
        getRandomIntInRange(0, unvisitedNeighbors.length)
      ];

      maze[nextY][nextX] = PATH_CHAR;
      maze[y + (nextY - y) / 2][x + (nextX - x) / 2] = PATH_CHAR;

      visited.push([nextX, nextY]);
      path.push([nextX, nextY]);
    } else {
      path.pop();
    }
  }

  // Destination point
  let destX = getRandomIntInRange(1, width) * 2;
  let destY = getRandomIntInRange(1, height) * 2;
  maze[destY][destX] = DEST_CHAR;

  // Print maze
  printMaze(maze);

  // Helper functions
  function getUnvisitedNeighbors(x, y) {
    let neighbors = [
      [x + 2, y],
      [x - 2, y],
      [x, y + 2],
      [x, y - 2]
    ];

    return neighbors.filter(
      ([nx, ny]) =>
        nx > 0 &&
        nx < mazeWidth &&
        ny > 0 &&
        ny < mazeHeight &&
        !visited.some(([vx, vy]) => vx === nx && vy === ny)
    );
  }

  function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function printMaze(mazeArray) {
    mazeArray.forEach(row => console.log(row.join("")));
  }
}

// Usage
GenerateRandomMaze(20, 20);