"use client";

import { useCallback, useEffect, useState } from "react";

type Point = { x: number; y: number };

const SIZE = 15;
const INITIAL_SNAKE: Point[] = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
];

function makeFood(snake: Point[]): Point {
  let food: Point;

  do {
    food = {
      x: Math.floor(Math.random() * SIZE),
      y: Math.floor(Math.random() * SIZE),
    };
  } while (snake.some((p) => p.x === food.x && p.y === food.y));

  return food;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(() =>
    makeFood(INITIAL_SNAKE)
  );
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const restart = useCallback(() => {
    setSnake(INITIAL_SNAKE.map((p) => ({ ...p })));
    setFood(makeFood(INITIAL_SNAKE));
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const keys: Record<string, string> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };

      const next = keys[e.key];
      if (!next) return;

      e.preventDefault();

      setDirection((current) => {
        if (
          (current === "UP" && next === "DOWN") ||
          (current === "DOWN" && next === "UP") ||
          (current === "LEFT" && next === "RIGHT") ||
          (current === "RIGHT" && next === "LEFT")
        ) {
          return current;
        }

        return next;
      });
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!running || gameOver) return;

    const timer = window.setInterval(() => {
      setSnake((current) => {
        const head = current[0];

        const moves: Record<string, Point> = {
          UP: { x: head.x, y: head.y - 1 },
          DOWN: { x: head.x, y: head.y + 1 },
          LEFT: { x: head.x - 1, y: head.y },
          RIGHT: { x: head.x + 1, y: head.y },
        };

        const next = moves[direction];
        const eating = next.x === food.x && next.y === food.y;
        const body = eating ? current : current.slice(0, -1);

        const collision =
          next.x < 0 ||
          next.x >= SIZE ||
          next.y < 0 ||
          next.y >= SIZE ||
          body.some((p) => p.x === next.x && p.y === next.y);

        if (collision) {
          setRunning(false);
          setGameOver(true);
          return current;
        }

        const updated = [next, ...current];

        if (eating) {
          setScore((s) => s + 1);
          setFood(makeFood(updated));
        } else {
          updated.pop();
        }

        return updated;
      });
    }, 180);

    return () => window.clearInterval(timer);
  }, [running, gameOver, direction, food]);

  return (
    <div>
      <h1>Snake Game</h1>
      <p>Score: {score}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 20px)`,
          width: "300px",
          border: "2px solid black",
        }}
      >
        {Array.from({ length: SIZE * SIZE }, (_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);

          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          const isSnake = snake.some((p) => p.x === x && p.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                background: isHead
                  ? "darkgreen"
                  : isSnake
                    ? "limegreen"
                    : isFood
                      ? "red"
                      : "white",
                boxSizing: "border-box",
                border: "1px solid #ddd",
              }}
            />
          );
        })}
      </div>

      <p>Use the arrow keys to move the snake.</p>

      <button onClick={restart}>
        {gameOver ? "Play Again" : running ? "Restart" : "Start Game"}
      </button>

      {gameOver && <h2>Game Over! Final score: {score}</h2>}
    </div>
  );
}