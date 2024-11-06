import { useState } from "react";
import { Publication } from "../../types/types";
import { Typography, Button } from "@mui/material";

const PublicationAbstract = ({ publication }: { publication: Publication }) => {
  const [showAbstract, setShowAbstract] = useState<boolean>(false);

  return (
    <>
      {publication.abstract && (
        <>
          <Button
            variant="secondaryButton"
            sx={{
              fontSize: "0.8125rem",
              margin: "0",
              padding: "0",
            }}
            onClick={() => setShowAbstract((prevState) => !prevState)}
          >
            {showAbstract ? "Hide Abstract" : "Show Abstract"}
          </Button>
          {showAbstract && (
            <Typography variant="body2" data-testid="abstract">
              {publication.abstract}
            </Typography>
          )}
        </>
      )}
    </>
  );
};

export default PublicationAbstract;
