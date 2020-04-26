import React from "react"
import { Typography, useTheme, Button, Box } from "@material-ui/core"
import styled from "@emotion/styled"

import ContactForm from "../components/contactForm"

const Section = styled.section`
  margin-bottom: 40px;
  text-align: center;
`

const DownloadTools = () => {
  const theme = useTheme()
  const mode = theme.palette.type

  return (
    <>
      <Section>
        <Typography
          variant="h3"
          align="center"
          style={
            mode === "dark"
              ? { color: theme.palette.primary.light, fontWeight: `900` }
              : { color: theme.palette.primary.main, fontWeight: `900` }
          }
        >
          Download all the tools here!
        </Typography>
        <Typography
          variant="h6"
          align="center"
          gutterBottom={true}
          style={
            mode === "dark"
              ? { color: theme.palette.secondary.light, fontWeight: `600` }
              : { color: theme.palette.secondary.main, fontWeight: `600` }
          }
        >
          If you also could contribute, it would be fantastic.
        </Typography>
        <Box align="center">
          <Button
            href="https://airtable.com/shrKIvCX7rU3tY3CN"
            rel="noreferrer noopener"
            target="_blank"
            variant="outlined"
            style={{ marginLeft: `10px` }}
          >
            Contribute
          </Button>
        </Box>
      </Section>
      <Section>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shrZdXdErFwkBdOqu?backgroundColor=teal&viewControls=on"
          style={{
            background: `transparent`,
            border: `1px solid #ccc`,
            width: `90%`,
            height: `700px`,
            onmousewheel: "",
            frameborder: "0",
          }}
        ></iframe>
      </Section>
      <Section>
        <ContactForm />
      </Section>
    </>
  )
}

export default DownloadTools
