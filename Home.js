import React, { useRef, useState } from "react";
import "./Index.css";
import ReactToPrint from "react-to-print";
import { v4 as uuidv4 } from "uuid";
import Doc from "./Doc";

function Home(props) {
  const [product, setProduct] = useState([
    { id: uuidv4, description: "", quantity: 1, rate: "", amount: "0.00" },
  ]);
  const [image, setImage] = useState("");
  const [subTotalArray, setSubTotalArray] = useState([]);
  const [extraChargeArray, setExtraChargeArray] = useState([0, 0, 0, 0]);
  const [subTotalSum, setSubTotalSum] = useState("0.00");
  const [invoiceData, setInvoiceData] = useState({});
  const [charge, setCharge] = useState([
    { discount: "0", tax: "0", shipping: "0", amountPaid: "0" },
  ]);

  const [total, setTotal] = useState(0);

  const componentRef = useRef();
  const inputImage = useRef("");
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImage = () => {
    inputImage.current.click();
  };

  const handleSddItem = () => {
    setProduct([
      ...product,
      { id: uuidv4, description: "", quantity: 1, rate: "", amount: "0.00" },
    ]);
  };
  const onChangeValue = (e, ind) => {
    const { name, value } = e.target;

    const productList = [...product];
    productList[ind][name] = value;
    if (productList[ind].quantity !== "" && product[ind].rate !== "") {
      productList[ind].amount =
        parseInt(productList[ind].quantity) * parseInt(productList[ind].rate);
    } else {
      productList[ind].amount = "0.00";
    }
    setProduct(productList);

    subTotalArray[ind] = product[ind].amount;

    let sum = 0;
    for (let i = 0; i < subTotalArray.length; i++) {
      sum = sum + parseInt(subTotalArray[i]);

      setSubTotalSum(sum);
      setTotal(sum);
    }
  };
  const removeProduct = (ind) => {
    const productList = [...product];
    productList.splice(ind, 1);
    subTotalArray.splice(ind, 1);
    setProduct(productList);

    let sum = 0;
    for (let i = 0; i < subTotalArray.length; i++) {
      sum = sum + parseInt(subTotalArray[i]);

      setSubTotalSum(sum);
      setTotal(sum);
    }
  };

  const handleDiscountInput = (e) => {
    const { name, value } = e.target;
    const chargeObj = [charge];
    if (value.length === 0) {
      chargeObj[0][name] = 0;
      setCharge(chargeObj);

      if (name === "discount" && value.length === 0) {
        extraChargeArray[0] = 0;
      } else if (value.length === 0 && name === "tax") {
        extraChargeArray[1] = 0;
      } else if (value.length === 0 && name === "shipping") {
        extraChargeArray[2] = 0;
      } else if (value.length === 0 && name === "amountPaid") {
        extraChargeArray[3] = 0;
      }
    } else {
      chargeObj[0][name] = value;
      setCharge(chargeObj);
      if (name === "discount") {
        extraChargeArray[0] = value;
      } else if (name === "tax") {
        extraChargeArray[1] = value;
      } else if (name === "amountPaid") {
        extraChargeArray[3] = value;
      } else if (name === "shipping") {
        extraChargeArray[2] = value;
      }
    }

    if (subTotalSum !== "0.00") {
      setTotal(
        subTotalSum -
          (extraChargeArray[0] * subTotalSum) / 100 +
          (extraChargeArray[1] / 100) * subTotalSum +
          parseInt(extraChargeArray[2])
      );
    }
  };

  return (
    <div className="main-container">
      <div className="top-container">
        <div onClick={handleImage}>
          <div className="upload-image">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" className="image" />
            ) : (
              <h1 className="logo">+ Add Your Logo</h1>
            )}
          </div>
          <input
            type="file"
            name="file"
            ref={inputImage}
            onChange={onChangeImage}
            style={{ display: "none" }}
          />
        </div>
        <div>
          <h1 style={{ fontSize: "140%" }}>Invoice</h1>
          <div className="id">
            <input
              placeholder="# ID"
              value={invoiceData.id}
              onChange={(e) =>
                setInvoiceData((prev) => ({ ...prev, id: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <input
              className="main-input-el"
              placeholder=" Who is this invoice from? (required)"
              value={invoiceData.invoiceFrom}
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  invoiceFrom: e.target.value,
                }))
              }
            />

            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor={invoiceData.invoiceTo}
                  style={{ margin: "10px" }}
                >
                  {" "}
                  Bill To
                </label>
                <input
                  className="main-input-el"
                  placeholder="Invoice To?"
                  value={invoiceData.invoiceTo}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      invoiceTo: e.target.value,
                    }))
                  }
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor={invoiceData.shipTo} style={{ margin: "10px" }}>
                  {" "}
                  Ship To
                </label>
                <input
                  className="main-input-el"
                  placeholder="(optional)"
                  value={invoiceData.shipTo}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      shipTo: e.target.value,
                    }))
                  }
                />
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
              <label
                htmlFor={invoiceData.date}
                style={{ width: "20px", margin: "10px" }}
              >
                {" "}
                Date
              </label>

              <input
                className="main-input-el"
                value={invoiceData.date}
                type="date"
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
              }}
            >
              <label
                style={{ width: "20px", margin: "10px" }}
                htmlFor={invoiceData.paymentTerms}
              >
                {" "}
                Payment Terms
              </label>

              <input
                className="main-input-el"
                value={invoiceData.paymentTerms}
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    paymentTerms: e.target.value,
                  }))
                }
              />
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
              <label
                style={{ width: "20px", margin: "10px" }}
                htmlFor={invoiceData.dueDate}
              >
                {" "}
                Due Date
              </label>

              <input
                className="main-input-el"
                value={invoiceData.dueDate}
                type="date"
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                margin: "10px",
                flexDirection: "row",
              }}
            >
              <label
                style={{ width: "20px", margin: "10px" }}
                htmlFor={invoiceData.pO}
              >
                {" "}
                PO
              </label>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  className="main-input-el"
                  value={invoiceData.pO}
                  onChange={(e) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      pO: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
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
            <input
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "50%",
                marginRight: "10px",
              }}
              value={pro.description}
              type="text"
              name="description"
              placeholder="Description of Service or Product"
              onChange={(e) => onChangeValue(e, ind)}
            />
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <input
                value={pro.quantity}
                name="quantity"
                placeholder="Quantity"
                type="number"
                onChange={(e) => onChangeValue(e, ind)}
              />
              <input
                value={pro.rate}
                name="rate"
                placeholder="Rate"
                type="number"
                onChange={(e) => onChangeValue(e, ind)}
              />
              <p>{pro.amount}</p>
            </div>
            {product.length > 1 && (
              <button
                onClick={() => removeProduct(ind)}
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "white",
                  marginTop: "-1%",
                }}
              >
                X
              </button>
            )}
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleSddItem}>+Add item</button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor={invoiceData.notes}> Notes</label>
          <input
            value={invoiceData.notes}
            placeholder="Notes - any relevant information not yet covered"
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
          />
          <label htmlFor={invoiceData.notes}> Terms</label>
          <input
            value={invoiceData.terms}
            placeholder="Terms and condition - late fees, payment methods,delivery schedule"
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                terms: e.target.value,
              }))
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            Sub Total Amount:{subTotalSum}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px",
            }}
          >
            <>
              <label htmlFor={charge.discount}>Discount</label>

              <input
                style={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  marginTop: "-2%",
                }}
                value={charge.discount}
                name="discount"
                type="number"
                onChange={(e) => handleDiscountInput(e)}
              />
              <p>%</p>
            </>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px",
            }}
          >
            <>
              <label htmlFor={charge.tax}>Tax</label>

              <input
                style={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  marginTop: "-2%",
                }}
                value={charge.tax}
                name="tax"
                type="number"
                onChange={(e) => handleDiscountInput(e)}
              />
              <p>%</p>
            </>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px",
            }}
          >
            <>
              <label htmlFor={charge.shipping}>Shipping</label>

              <input
                style={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  marginTop: "-2%",
                }}
                value={charge.shipping}
                name="shipping"
                type="number"
                onChange={(e) => handleDiscountInput(e)}
              />
              <p>/-</p>
            </>
          </div>
          <p
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            Total Amount :{total}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px",
            }}
          >
            <>
              <label htmlFor={charge.amountPaid}>Amount Paid</label>

              <input
                style={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  marginTop: "-2%",
                  padding: "-3%",
                }}
                value={charge.amountPaid}
                name="amountPaid"
                type="number"
                onChange={(e) => handleDiscountInput(e)}
              />
              <p>/-</p>
            </>
          </div>
          <p
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            {" "}
            Balance Due:{total - extraChargeArray[3]}
          </p>
        </div>
      </div>
      <div>
        <ReactToPrint
          trigger={() => (
            <button
              style={{
                color: "white",
                backgroundColor: "blue",
                border: "none",
              }}
            >
              Print
            </button>
          )}
          content={() => componentRef.current}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5%",
            backgroundColor: "#082501",
            color: "white",
          }}
        >
          Generated Invoice
        </div>
      </div>
      <div ref={componentRef}>
        <Doc
          invoiceData={invoiceData}
          total={total}
          charge={charge}
          product={product}
          extraChargeArray={extraChargeArray}
          subTotalSum={subTotalSum}
        />
      </div>
    </div>
  );
}

export default Home;
