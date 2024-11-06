import PublicationAbstract from "./PublicationAbstract";
import PublicationAuthors from "./PublicationAuthors";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { Publication } from "../../types/types";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Link,
  IconButton,
  Snackbar,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { grey } from "@mui/material/colors";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import lockIcon from "../../assets/icons/lock.svg";
import unlockIcon from "../../assets/icons/unlock.svg";

const PublicationList = ({ publication }: { publication: Publication }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Card
      data-testid="publications-list"
      sx={{
        width: "100%",
        color: "black",
        backgroundColor: "white",
        alignSelf: "flex-start",
        margin: "0",
        borderRadius: "0",
        borderTop: "none",
        borderBottom: "1px solid lightgrey",
        boxShadow: "none",
        padding: "0rem",
      }}
    >
      <CardContent sx={{ padding: "0rem", paddingTop: "0.8rem" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1rem",
            gap: "0.5rem",
          }}
        >
          <ArticleIcon
            fontSize="inherit"
            sx={(theme) => ({
              color: theme.palette.primary.main,
            })}
            data-testid="article-icon"
          />

          {publication.type && (
            <Typography
              variant="caption"
              sx={{ flexGrow: 1 }}
              data-testid="article-type"
            >
              {publication.type}{" "}
            </Typography>
          )}
          {publication.cited_by && (
            <Typography
              variant="body3"
              sx={{ color: grey[700] }}
              data-testid="article-citations"
            >
              {publication.cited_by} Citations
            </Typography>
          )}
          {publication.oa !== null ? (
            publication.oa ? (
              <img
                src={unlockIcon}
                alt="openAccess"
                style={{ width: "1rem" }}
              />
            ) : (
              <img
                src={lockIcon}
                alt="not-openAccess"
                style={{ width: "1rem" }}
              />
            )
          ) : null}

          <IconButton
            aria-label="copy"
            size="small"
            onClick={() => copyToClipboard(publication)}
            data-testid="copy-icon"
          >
            <ContentCopyIcon fontSize="inherit" sx={{ color: "#5CA060" }} />
          </IconButton>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isCopied}
            message="Publication information copied!"
            ContentProps={{
              sx: {
                backgroundColor: "#5CA060",
                borderRadius: "1rem",
                fontSize: "1rem",
                textAlign: "center",
              },
            }}
          />
        </Box>

        <div>
          {publication.doi !== null ? (
            publication.doi ? (
              <Typography variant="body1" data-testid="article-title">
                <Link
                  href={publication.doi}
                  underline="hover"
                  sx={{ color: "black" }}
                  data-testid="doi-link"
                >
                  {publication.title}
                </Link>
              </Typography>
            ) : (
              <Typography variant="body1">{publication.title}</Typography>
            )
          ) : (
            <Typography variant="body1">{publication.title}</Typography>
          )}
        </div>

        <Box sx={{ color: grey[700] }}>
          {publication.publication_year && (
            <Typography
              variant="body3"
              sx={{ fontWeight: "700" }}
              data-testid="article-year"
            >
              {publication.publication_year}{" "}
            </Typography>
          )}
          {publication.publication_year && publication.source && (
            <Typography variant="body3" data-testid="article-source">
              | {publication.source}{" "}
            </Typography>
          )}
        </Box>

        {publication.authors && (
          <PublicationAuthors publication={publication} />
        )}

        {publication.abstract && (
          <PublicationAbstract publication={publication} />
        )}
      </CardContent>
    </Card>
  );
};

export default PublicationList;
