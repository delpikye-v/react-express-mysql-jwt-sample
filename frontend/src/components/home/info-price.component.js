import React from "react";

const InfoPriceComponent = ({
    label,
    description,
    price = 0,
    unit = '$',
    backgroundColor = '#fff',
    borderColor = '#DEDEDE',
    color = '#252B42'
}) => {
    return (
        <div className="content" style={{ backgroundColor: backgroundColor, borderColor, color }}>
            <h5>{label}</h5>
            <small>{description}</small>

            <div className="amount">
                <div>{price}</div>
                <div className="amount-per">{unit}<br />Per month</div>
            </div>
        </div>
    );
};

export default InfoPriceComponent;
