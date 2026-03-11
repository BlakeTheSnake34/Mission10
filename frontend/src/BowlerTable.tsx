import { useEffect, useState } from "react";

type Bowler = {
  bowlerFirstName: string;
  bowlerMiddleInit: string | null;
  bowlerLastName: string;
  teamName: string;
  bowlerAddress: string;
  bowlerCity: string;
  bowlerState: string;
  bowlerZip: string;
  bowlerPhoneNumber: string;
};

function BowlerTable() {
  const [bowlers, setBowlers] = useState<Bowler[]>([]);

  useEffect(() => {
    fetch("http://localhost:5167/Bowlers")
      .then((response) => response.json())
      .then((data: Bowler[]) => setBowlers(data))
      .catch((error) => console.error("Error fetching bowlers:", error));
  }, []);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {bowlers.map((b, index) => (
          <tr key={index}>
            <td>
              {b.bowlerFirstName} {b.bowlerMiddleInit ? `${b.bowlerMiddleInit} ` : ""}
              {b.bowlerLastName}
            </td>
            <td>{b.teamName}</td>
            <td>{b.bowlerAddress}</td>
            <td>{b.bowlerCity}</td>
            <td>{b.bowlerState}</td>
            <td>{b.bowlerZip}</td>
            <td>{b.bowlerPhoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BowlerTable;