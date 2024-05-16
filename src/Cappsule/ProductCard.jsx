import React, { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";

const ProductCard = ({ data }) => {
  const [formSelection, setFormSelection] = useState("");
  const [strengthSelection, setStrengthSelection] = useState("");
  const [packagingSelection, setPackagingSelection] = useState("");

  const forms = Object.keys(data.salt_forms_json);
  const initialForm = forms.length > 0 ? forms[0] : "";
  const initialStrength =
    formSelection && data.salt_forms_json[formSelection]
      ? Object.keys(data.salt_forms_json[formSelection])[0]
      : "";
  const initialPackaging =
    strengthSelection &&
    data.salt_forms_json[formSelection] &&
    data.salt_forms_json[formSelection][strengthSelection]
      ? Object.keys(data.salt_forms_json[formSelection][strengthSelection])[0]
      : "";

  useEffect(() => {
    setFormSelection(initialForm);
  }, [data]);

  useEffect(() => {
    setStrengthSelection(initialStrength);
  }, [formSelection]);

  useEffect(() => {
    setPackagingSelection(initialPackaging);
  }, [strengthSelection]);

  const onClickButton = (name, type) => {
    if (type === "Form") {
      setFormSelection(name);
      setStrengthSelection(Object.keys(data.salt_forms_json[name])[0] || "");
      setPackagingSelection(
        Object.keys(
          data.salt_forms_json[name][Object.keys(data.salt_forms_json[name])[0]]
        )[0] || ""
      );
    }
    if (type === "Strength") {
      setStrengthSelection(name);
      setPackagingSelection(
        Object.keys(data.salt_forms_json[formSelection][name])[0] || ""
      );
    }
    if (type === "Packaging") {
      setPackagingSelection(name);
    }
  };

  const form = Object.keys(data.salt_forms_json);
  const strengthButtons =
    formSelection && data.salt_forms_json[formSelection]
      ? Object.keys(data.salt_forms_json[formSelection])
      : [];
  const packagingButtons =
    strengthSelection &&
    data.salt_forms_json[formSelection] &&
    data.salt_forms_json[formSelection][strengthSelection]
      ? Object.keys(data.salt_forms_json[formSelection][strengthSelection])
      : [];

  console.log(formSelection, strengthSelection, packagingSelection);

  const findLowestPrice = () => {
    if (formSelection && strengthSelection && packagingSelection) {
      const prices =
        data.salt_forms_json[formSelection][strengthSelection][
          packagingSelection
        ];

      let lowestPrice = Infinity;
      for (const productId in prices) {
        if (Array.isArray(prices[productId])) {
          prices[productId].forEach(({ selling_price }) => {
            if (selling_price && selling_price < lowestPrice) {
              lowestPrice = selling_price;
            }
          });
        }
      }
      return {
        lowestPrice: lowestPrice === Infinity ? null : lowestPrice,
      };
    }
    return {
      lowestPrice: null,
    };
  };

  const findUnavailable = () => {
    if (formSelection && strengthSelection && packagingSelection) {
      const pkgs = data.salt_forms_json[formSelection][strengthSelection];

      let unavailable = [];
      for (const pkg in pkgs) {
        if (pkgs[pkg]) {
          const notA = Object.values(pkgs[pkg]).every((value) => !value);
          if (notA) {
            unavailable.push(pkg);
          }
        }
      }
      return {
        unavailable: unavailable,
      };
    }
    return {
      unavailable: [],
    };
  };
  const { lowestPrice } = findLowestPrice();
  const { unavailable } = findUnavailable();

  console.log("unavailable", unavailable);

  return (
    <div className="card border shadow mb-3">
      <div className="card-body d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center mb-3">
            <ButtonGroup
              title="Form"
              buttons={form}
              selectedName={formSelection}
              onClickButton={(name) => onClickButton(name, "Form")}
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            <ButtonGroup
              title="Strength"
              onClickButton={(name) => onClickButton(name, "Strength")}
              buttons={strengthButtons}
              selectedName={strengthSelection}
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            <ButtonGroup
              title="Packaging"
              onClickButton={(name) => onClickButton(name, "Packaging")}
              buttons={packagingButtons}
              selectedName={packagingSelection}
              unavailable={unavailable}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center mb-3">
          <h5 className="card-title">{data.salt}</h5>
          <p className="card-text text-primary">
            {formSelection} | {strengthSelection} | {packagingSelection}
          </p>
        </div>
        <div className="d-flex flex-column align-items-center mb-3">
          {lowestPrice ? (
            <h2 className="card-title">From &#8377;{lowestPrice}</h2>
          ) : (
            <div className="alert alert-warning mt-3" role="alert">
              No stores selling this product near you.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
