
"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  course: string;
};

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/pg-students");

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data: Student[] = await response.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch PostgreSQL records.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>PostgreSQL Student Records</h1>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Course</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={cellStyle}>{student.id}</td>
                <td style={cellStyle}>{student.name}</td>
                <td style={cellStyle}>{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

const cellStyle: React.CSSProperties = {
  border: "1px solid #999",
  padding: "10px",
};