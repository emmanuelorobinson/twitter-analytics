import * as React from "react";

function SearchIcon(props) {
  return (
    <svg
      width={22}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="url(#prefix__pattern0)" d="M0 0h22v26H0z" />
      <defs>
        <pattern
          id="prefix__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#prefix__image0_1_15"
            transform="matrix(.00261 0 0 .00221 -.09 0)"
          />
        </pattern>
        <image
          id="prefix__image0_1_15"
          width={452}
          height={452}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export default SearchIcon;