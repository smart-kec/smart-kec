import { getData } from "../api/AurthenticationServices";

const Testing = () => {
  var dataPrint;
  const data = async () => {
    dataPrint = await getData();
    console.log(dataPrint);
  };
  data();
  return (
    <>
      <h1>hrllo</h1>
      <p></p>
    </>
  );
};

export default Testing;
