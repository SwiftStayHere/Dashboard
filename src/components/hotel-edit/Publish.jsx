export default function Publish({ isSuccess, errorType }) {
  return (
    <>
      {(isSuccess && (
        <div className="publish">
          <div className="success-animation">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <h4>Hotel Pubblicato Correttamente</h4>
        </div>
      )) ||
        (errorType && (
          <div className="publish">
            <div className="ui-error">
              <svg
                viewBox="0 0 87 87"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="Group-2" transform="translate(2.000000, 2.000000)">
                    <circle
                      id="Oval-2"
                      stroke="#FF0000"
                      strokeWidth="4"
                      cx="41.5"
                      cy="41.5"
                      r="41.5"
                    ></circle>
                    <circle
                      className="ui-error-circle"
                      stroke="#FF0000"
                      strokeWidth="4"
                      cx="41.5"
                      cy="41.5"
                      r="41.5"
                    ></circle>
                    <path
                      className="ui-error-line1"
                      d="M22.244224,22 L60.4279902,60.1837662"
                      id="Line"
                      stroke="#F74444"
                      strokeWidth="3"
                      strokeLinecap="square"
                    ></path>
                    <path
                      className="ui-error-line2"
                      d="M60.755776,21 L23.244224,59.8443492"
                      id="Line"
                      stroke="#F74444"
                      strokeWidth="3"
                      strokeLinecap="square"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <h4
              style={{
                color: "red",
              }}
            >
              Hotel non Pubbicato
            </h4>
            <p>
              {(errorType &&
                errorType === "ERR_NETWORK" &&
                "Assicurati di essere connesso a internet prima di pubblicare l'hotel") ||
                `Ci deve essere un'errore con Google, ricarica la pagina o contatta Alphard Labs inviando questa stringa: ${
                  errorType || "ENTERNAL SERVER ERROR"
                }`}
            </p>
          </div>
        ))}
    </>
  );
}
