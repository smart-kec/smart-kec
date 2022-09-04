import {
  dob,
  semester,
  img1,
  img2,
  img3,
  img4,
  icon1,
  gender,
  graduation,
  classn,
  contact,
  hacker,
  year,
  email,
} from "../assets/images/Display/images";
import {
  Details,
  Detailslayout,
  Detailsfront,
  Box,
} from "../assets/styles/style/DisplayElements";

const Display = () => {
  return (
    <>
      <form>
        <Box
          style={{
            backgroundImage: `url(${img4})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "40rem",
          }}
        >
          <img id="one" src={img1} alt="a" />
          <img id="two" src={img3} alt="b" />
          <h1>SANJEEV BALASUBRAMANI</h1>
          <img id="three" src={img2} alt="c" />

          <button type="submit">Update</button>
        </Box>
      </form>

      <Details>
        <Detailslayout>
          <Detailsfront>
            <img src={icon1} alt="c" />
            <p>REGISTER NUMBER</p>
            <h6>20CSR185</h6>
          </Detailsfront>

          <Detailsfront>
            <img src={gender} alt="c" />

            <p>GENDER</p>

            <h6>MALE</h6>
          </Detailsfront>

          <Detailsfront>
            <img src={graduation} alt="c" />
            <p>GRADUATION YEAR</p>
            <h6>2024</h6>
          </Detailsfront>

          <Detailsfront>
            <img src={dob} alt="c" />
            <p>DATE OF BIRTH</p>
            <h6>06-05-2003</h6>
          </Detailsfront>

          <Detailsfront>
            <img src={classn} alt="c" />
            <p>CLASS </p>
            <h6>CSE-C</h6>
          </Detailsfront>

          <Detailsfront>
            <img src={contact} alt="c" />
            <p>CONTACT NUMBER</p>
            <h6>9994262242</h6>
          </Detailsfront>
          <Detailsfront>
            <img src={semester} alt="c" />
            <p>SEMESTER</p>
            <h6>05</h6>
          </Detailsfront>
          <Detailsfront>
            <img src={hacker} alt="c" />
            <p>HACKER RANK ID</p>
            <h6>sanjubalasubramani@</h6>
          </Detailsfront>
          <Detailsfront>
            <img src={year} alt="c" />
            <p>YEAR OF STUDY</p>
            <h6>03</h6>
          </Detailsfront>
          <Detailsfront>
            <img src={email} alt="c" />
            <p>E-MAIL</p>
            <h6>sanjeevb.20cse@kongu.edu</h6>
          </Detailsfront>
        </Detailslayout>
      </Details>
    </>
  );
};
export default Display;
