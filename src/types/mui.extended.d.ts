import "@mui/material";

import React from "react";

declare module "@mui/material" {
  interface FabPropsVariantOverrides {
    square: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    secondaryButton: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}
