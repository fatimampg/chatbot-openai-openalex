import { useState } from "react";
import { getFullAuthorsString, getShortAuthorsString } from "../../utils";
import { Publication } from "../../types/types";
import { Typography, Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";

const PublicationAuthors = ({ publication }: { publication: Publication }) => {
  const [showFullListAuthors, setShowFullListAuthors] =
    useState<boolean>(false);
  const authorsFullList: string = getFullAuthorsString(publication);
  const authorsShortList: string = getShortAuthorsString(publication);

  return (
    <Box sx={{ color: grey[700], fontStyle: "italic" }}>
      <>
        <Typography variant="body3" data-testid="authors">
          {publication.authors.length > 3 && !showFullListAuthors
            ? authorsShortList
            : authorsFullList}
        </Typography>
        {publication.authors.length > 3 && (
          <Button
            variant="secondaryButton"
            sx={{
              fontSize: "0.8125rem",
              textDecoration: "none",
              color: grey[500],
              fontStyle: "italic",
              paddingTop: 0,
              paddingBottom: 0,
            }}
            onClick={() => {
              setShowFullListAuthors((prevState) => !prevState);
            }}
          >
            {showFullListAuthors ? "Show short list" : "Show full list"}
          </Button>
        )}
      </>
    </Box>
  );
};

export default PublicationAuthors;
