// lib/data.ts
export type Student = {
  id: number;
  name: string;
  age: number;
};

// In‑memory static array (will reset on server restart)
export const students: Student[] = [];
