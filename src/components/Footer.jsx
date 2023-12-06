import {
  BottomNavigation,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsGithub, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa";

const developers = [
  {
    name: "Neel Poriya",
    profile: "NeelPoriya",
  },
  {
    name: "Vrutik Prajapati",
    profile: "vrutik2809",
  },
  {
    name: "Kishan Sangani",
    profile: "kishan1265",
  },
  {
    name: "Harsh Patel",
    profile: "Harshpatel2910",
  },
  {
    name: "Darshan Kheni",
    profile: "darshankheni",
  },
  {
    name: "Achyut Shah",
    profile: "Achyut-1412",
  },
  {
    name: "Param Mistry",
    profile: "parammistry",
  },
];

function getCurrentDate() {
  const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
  ];

  const currentDate = new Date();
  const monthName = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${monthName} ${day}, ${year}`;
  return formattedDate;
}

const Disclaimer = (
  <Box
    sx={{textAlign: 'center'}}
  >
    <Box sx={{
      textAlign: "center",
      verticalAlign: "middle",
      display: "flex",
      alignItems: "center",
    }}>
      <FaRegCopyright style={{ marginRight: ".5rem" }} />
      <Typography>
        This website is a part of the{" "}
        <Link href="https://guptalab.org">Gupta Lab</Link> and is not intended
        for professional use.
      </Typography>
    </Box>
    <Box>
      <Typography sx={{'textAlign':'left'}}>
      Disclaimer: The information provided on the webpage is for educational and research purposes. The webpage contains links to third-party website and we are not responsible for the privacy practices or content of these websites or the data that they provide. Please use it at your own risk. Last updated on {getCurrentDate()}. For any further information or suggestion you may reach to us at dnaresource@guptalab.org. We are thankful to DNA Storage Alliance (link).
      </Typography>
    </Box>
  </Box>
);

const Footer = () => {
  const lg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const numberOfDevelopersColumns = sm ? 1 : md ? 2 : lg ? 3 : 3;

  return (
    <Box marginTop={2}>
      <Box
        sx={{
          backgroundColor: "#3333",
          width: "100%",
          height: ".2rem",
          borderRadius: "2rem",
        }}
      >
        &nbsp;
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(251, 251, 251, .7)",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            borderRadius: "1rem",
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo Column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: "1rem",
              // flexGrow: '.5',
              userSelect: "none",
            }}
          >
            <Image
              src={"/gupta-lab-logo.png"}
              width={75}
              height={75}
              alt="Gupta Lab Logo"
            />
            <Link href={"https://guptalab.org"}>
              <Typography
                variant="h4"
                fontWeight={"600"}
                sx={{
                  textTransform: "uppercase",
                  marginTop: "2rem",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                GuptaLab
              </Typography>
            </Link>
            <Box sx={{ marginTop: "1rem" }}>
              <Typography variant="body1">
                Laboratory of Natural Information Processing
              </Typography>
              <Typography>
                <b>Contact</b>:{" "}
                <Link target="blank" href={`mailto:dnaresource@guptalab.org`}>
                  dnaresource@guptalab.org
                </Link>
              </Typography>
            </Box>
          </Box>
          {/* Team Column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: "1rem",
              // flexGrow: '1',
            }}
          >
            <Typography
              variant="h5"
              fontWeight={"600"}
              sx={{ userSelect: "none" }}
            >
              Team
            </Typography>
            <Box
              sx={{
                display: "flex",
              }}
            >
              {[...Array(numberOfDevelopersColumns).keys()].map(
                (column, index) => (
                  <List key={index}>
                    {developers
                      .slice(
                        Math.ceil(
                          developers.length / numberOfDevelopersColumns
                        ) * index,
                        Math.ceil(
                          developers.length / numberOfDevelopersColumns
                        ) *
                          (index + 1)
                      )
                      .map((developer, index) => (
                        <ListItem key={index}>
                          <Link
                            href={`https://github.com/${developer.profile}`}
                            target="blank"
                          >
                            <Typography
                              sx={{
                                "&:hover": {
                                  color: "#aaa",
                                },
                              }}
                              variant="body1"
                            >
                              {developer.name}
                            </Typography>
                          </Link>
                        </ListItem>
                      ))}
                  </List>
                )
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: "1rem",
              // flexGrow: '.5'
            }}
          >
            <Typography
              variant="h5"
              fontWeight={"600"}
              sx={{ userSelect: "none" }}
            >
              Social
            </Typography>
            <Box sx={{ display: "flex" }}>
              <List>
                <ListItem>
                  <Link href="https://twitter.com/guptalab" target="blank">
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                        "&:hover": {
                          color: "primary.main",
                        },
                        textTransform: "capitalize",
                      }}
                    >
                      <BsTwitter style={{ marginRight: ".4rem" }} />
                      Twitter
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://www.linkedin.com/company/guptalab/"
                    target="blank"
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#0077b5",
                        },
                        textTransform: "capitalize",
                      }}
                    >
                      <BsLinkedin style={{ marginRight: ".4rem" }} />
                      LinkedIn
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://www.youtube.com/c/ManishGuptamankg"
                    target="blank"
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#ff0000",
                        },
                        textTransform: "capitalize",
                      }}
                    >
                      <BsYoutube style={{ marginRight: ".4rem" }} />
                      YouTube
                    </Typography>
                  </Link>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <Link href="https://github.com/guptalab" target="blank">
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#333",
                        },
                        textTransform: "capitalize",
                      }}
                    >
                      <BsGithub style={{ marginRight: ".4rem" }} />
                      Github
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Disclaimer}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
