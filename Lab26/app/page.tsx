
"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  course: string;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async (): Promise<void> => {
      try {
        const response = await fetch("/api/students");

        if (!response.ok) {
          throw new Error("Failed to fetch student records");
        }

        const data: Student[] = await response.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Unable to fetch student records. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>Student Records</h1>
        <p>Loading students...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>Student Records</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>Student Records</h1>

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
