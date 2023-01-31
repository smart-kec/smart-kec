import { BiEditAlt, BiBookReader } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { BsFillPeopleFill, BsCalendarDate } from "react-icons/bs";


import {
  MdOutlineFormatListNumbered,
  MdPermContactCalendar,
  MdEmail,
} from "react-icons/md";
import { SiGoogleclassroom, SiHackerrank, SiFuturelearn } from "react-icons/si";
import { GiCircle } from "react-icons/gi";

import { img1, img4 } from "../assets/images/Display/images";
import {
  Details,
  Detailslayout,
  Detailsfront,
  Box,
  Bt,
  Wrapper,
} from "../assets/styles/style/DisplayElements";
import { useState } from "react";

const Display = () => {
  const [Edit, setEdit] = useState(false);
  const [Edit2, setEdit2] = useState(false);
  const [Edit3, setEdit3] = useState(false);
  const [Edit4, setEdit4] = useState(false);
  const [change, setchange] = useState("");

  const Handler4 = (data) => {
    setchange(data);
  };
  const submit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={submit}>
        <Box
          style={{
            backgroundImage: `url(${img4})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "40rem",
          }}
        >
          <GiCircle id="two"></GiCircle>
          <Wrapper>
            <Bt>
            
              <img id="one" src={img1} alt="a" />
            </Bt>
            <input type="file" />
          </Wrapper>

          <h1>SANJEEV BALASUBRAMANI</h1>

          <FaGraduationCap
            id="three"
            style={{ color: "#bbb7b7" }}
          ></FaGraduationCap>
          <h2 id="be">BE COMPUTER SCIENCE AND ENGINEERING</h2>
          <button
            type="submit"
            onChange={(event) => Handler4(event.target.value)}
            value={change}
          >
            UPDATE
          </button>
        </Box>
      </form>
      <Details>
        <Detailslayout>
          <Detailsfront>
            <MdOutlineFormatListNumbered id="img"></MdOutlineFormatListNumbered>

            <p>REGISTER NUMBER</p>
            <h6 id="space">20CSR185</h6>
          </Detailsfront>

          <Detailsfront>
            <BsFillPeopleFill id="img"></BsFillPeopleFill>
            <p>GENDER</p>
            <button id="gen" onClick={() => setEdit(!Edit)}>
              {" "}
              <BiEditAlt></BiEditAlt>
            </button>
            {Edit  ? ( 
              <select >
                <option >MALE</option>
                <option>FEMALE</option>
              </select>
            ) : (
              <h6>MALE</h6>
            )}
          </Detailsfront>

          <Detailsfront>
            <FaGraduationCap id="img"></FaGraduationCap>
            <p>GRADUATION YEAR</p>
            <h6 id="space">2024</h6>
          </Detailsfront>

          <Detailsfront>
            <BsCalendarDate id="img"></BsCalendarDate>

            <p>DATE OF BIRTH</p>
            <button id="gen" onClick={() => setEdit2(!Edit2)}   >
              {" "}
              <BiEditAlt></BiEditAlt>
            </button>
            {Edit2 ? <input  style={{ marginTop:"3rem"}} type="date" /> : <h6>06.05.2003</h6>}
          </Detailsfront>

          <Detailsfront>
            <SiGoogleclassroom id="img"></SiGoogleclassroom>

            <p>CLASS </p>
            <h6 id="space">CSE-C</h6>
          </Detailsfront>

          <Detailsfront>
            <MdPermContactCalendar id="img"></MdPermContactCalendar>

            <p>CONTACT NUMBER</p>
            <button id="gen" onClick={() => setEdit3(!Edit3)}>
              {" "}
              <BiEditAlt></BiEditAlt>
            </button>

            {Edit3 ? <input id="inputbox" type="text" /> : <h6>9994262242</h6>}
          </Detailsfront>
          <Detailsfront>
            <BiBookReader id="img"></BiBookReader>

            <p>SEMESTER</p>
            <h6 id="space">05</h6>
          </Detailsfront>
          <Detailsfront>
            <SiHackerrank id="img"></SiHackerrank>

            <p>HACKER RANK ID</p>
            <button id="gen" onClick={() => setEdit4(!Edit4)}>
              {" "}
              <BiEditAlt></BiEditAlt>
            </button>
            {!Edit4 ? (
              <h6>sanjubalasubramani@</h6>
            ) : (
              <input style={{}} type="text" defaultValue="sanju"></input>
            )}
          </Detailsfront>
          <Detailsfront>
            <SiFuturelearn id="img"></SiFuturelearn>
            <p>YEAR OF STUDY</p>
            <h6 id="space">03</h6>
          </Detailsfront>
          <Detailsfront>
            <MdEmail id="img"></MdEmail>

            <p>E-MAIL</p>
            <h6 id="space">sanjeevb.20cse@kongu.edu</h6>
          </Detailsfront>
        </Detailslayout>
        <Wrapper>
          <input type="file" />
        </Wrapper>
      </Details>
    </>
  );
};
export default Display;
