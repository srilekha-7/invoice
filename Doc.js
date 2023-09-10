import React from "react";

const Doc = (props) => {
  const { invoiceData, total, product, extraChargeArray } = props;

  return (
    <div className="main-container">
      <div className="top-container"></div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            {invoiceData.invoiceFrom && (
              <p style={{ fontWeight: "bold", margin: "10px" }}>
                {invoiceData.invoiceFrom}
              </p>
            )}

            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {invoiceData.invoiceTo && (
                  <>
                    <p style={{ margin: "10px" }}>
                      {" "}
                      Bill To:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.invoiceTo}
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {invoiceData.shipTo && (
                  <>
                    <p style={{ margin: "10px" }}>
                      {" "}
                      Ship To:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.shipTo}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
              }}
            >
              {invoiceData.date && (
                <div style={{ display: "flex" }}>
                  <p style={{ margin: "10px" }}> Date: {invoiceData.date}</p>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
              }}
            >
              {invoiceData.paymentTerms && (
                <>
                  <p style={{ margin: "10px" }}>
                    {" "}
                    Payment Terms: {invoiceData.paymentTerms}
                  </p>
                </>
              )}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
              }}
            >
              {invoiceData.dueDate && (
                <>
                  <p style={{ margin: "10px" }}>
                    {" "}
                    Due Date: {invoiceData.dueDate}
                  </p>
                </>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
              }}
            >
              <p
                style={{
                  margin: "10px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {" "}
                Balance Due: {total - extraChargeArray[3]}
              </p>
            </div>
          </div>
        </div>
        <div className="items">
          <p
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "50%",
              marginRight: "10px",
            }}
          >
            Item
          </p>

          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <p style={{ paddingRight: "20px" }}>Quantity</p>
            <p style={{ paddingRight: "20px" }}>Rate</p>

            <p>Amount</p>
          </div>
        </div>
        <div style={{ margin: "1%" }}>
          {product.map((pro, ind) => (
            <div
              key={ind}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1%",
              }}
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "50%",
                  marginRight: "10px",
                }}
              >
                {pro.description}
              </p>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ marginRight: "10px", marginLeft: "-20px" }}>
                  {pro.quantity}
                </p>
                <p style={{ paddingRight: "20px" }}>{pro.rate}</p>

                <p>{pro.amount}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {invoiceData.notes && (
              <>
                <p> Notes:</p>
                <p>{invoiceData.notes}</p>
              </>
            )}

            {invoiceData.terms && (
              <>
                <p> Notes:</p>
                <p>{invoiceData.terms}</p>
              </>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px",
              }}
            >
              {extraChargeArray[0] !== "0" && (
                <p>Discount: {extraChargeArray[0]}</p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px",
              }}
            >
              {extraChargeArray[1] !== "0" && <p>Tax: {extraChargeArray[1]}</p>}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px",
              }}
            >
              {extraChargeArray[2] !== "0" && (
                <p>Shipping: {extraChargeArray[2]}</p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px",
              }}
            >
              {extraChargeArray[3] !== "0" && (
                <p>Amount Paid: {extraChargeArray[3]}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doc;
