import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "../css/Loading.css";

export const Loading = () => {
  return (
    <div className="Loading">
      <FontAwesomeIcon icon={faUser} size={"2x"} />
      <p style={{ fontSize: 30 }}>Loading...</p>
    </div>
  );
};
