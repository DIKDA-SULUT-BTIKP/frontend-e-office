import { useEffect, useState } from "react";
import FOLayout from "../../layout/FOLayout";
import axios from "axios";

const DashboardFOPage = () => {
  const [letters, setLetters] = useState([]);
  const fetchLetters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/letters");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);
  return (
    <FOLayout>
      <h1>Dashboard FO</h1>
    </FOLayout>
  );
};

export default DashboardFOPage;
