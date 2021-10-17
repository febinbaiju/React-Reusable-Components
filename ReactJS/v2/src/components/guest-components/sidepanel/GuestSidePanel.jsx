import login from "../../../assets/img/login.png";

export default function GuestSidePanel(props) {
  return (
    <div className="col-md-8 pr-md-0">
      <div className="log-right">
        <div className="right-wraper">
          <img alt="" src={login} className="img-fluid" />
          <h2 className="text-white font-weight-bolder">
            With data collection, <br />
            ‘the sooner the better’ <br />
            is always the best answer.
          </h2>
        </div>
      </div>
    </div>
  );
}
