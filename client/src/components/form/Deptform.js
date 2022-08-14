import "./Deptform.css";
const Deptform = ({}) => {
  return (
    <div class="container-div">
      <div class="title">Department Details</div>
      <div class="content">
        <form action="#">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Department Full Name</span>
              <input
                type="text"
                placeholder="Enter Department Name"
                required
              ></input>
            </div>
            <div class="input-box">
              <span class="details">Department Alias Name</span>
              <input
                type="text"
                placeholder="Enter Alias Name"
                required
              ></input>
            </div>
            <div class="input-box">
              <span class="details"> Department Email</span>
              <input
                type="text"
                placeholder="Enter Department Email"
                required
              ></input>
            </div>

            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                required
              ></input>
            </div>
            <div class="input-box">
              <span class="details">Number of Semesters</span>
              <input
                type="number"
                placeholder="Enter no of Semesters"
                required
              ></input>
            </div>
            <div class="input-box">
              <span class="details"> HOD Email</span>
              <input type="text" placeholder="Enter HOD Email" required></input>
            </div>
            <div class="input-box">
              <span class="details">No of Faculties</span>
              <input
                type="number"
                placeholder="Enter no of Faculties"
                required
              ></input>
            </div>
            <div class="input-box">
              <span class="details">No of Students</span>
              <input
                type="number"
                placeholder="Enter no of Students"
                required
              ></input>
            </div>
            {/* <div class="input-box">
              <span class="details">Year-Incharge Name</span>
              <input
                type="text"
                placeholder="Enter Year-Incharge Name"
                required
              ></input>
            </div> */}
          </div>

          <div class="button">
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Deptform;
