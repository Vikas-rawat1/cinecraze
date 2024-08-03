import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="relative">
      <select
        defaultValue="0"
        onChange={func}
        name="format"
        id="format"
        className="w-40 h-10 flex m-auto  items-center lg:w-[10vw] lg:h-[3vw] rounded-md"
      >
        <option value="0" disabled>
          {title}{" "}
          {/* <i className="text-white hover:text-[#6556CD] ri-arrow-left-line text-3xl"></i> */}
        </option>
        {options.map((o, index) => (
          <option key={index} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
