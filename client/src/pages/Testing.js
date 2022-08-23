import { getData } from "../api/AurthenticationServices";

const Testing = () => {
  const data = async () => {
    const dataPrint = await getData();
    console.log(dataPrint);
  };
  data();
  return (
    <>
      <h1>hrllo</h1>
    </>
  );
};

export default Testing;
