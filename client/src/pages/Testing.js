import { getData } from "../api/AurthenticationServices";

const Testing = () => {
  var dataPrint;
  const data = async () => {
    try {
      dataPrint = await getData();
    } catch (err) {
      console.log(err);
    }
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
