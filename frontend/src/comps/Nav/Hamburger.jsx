import { useState } from "react";
import {
  IconButton,
  Box,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

const Options = [
  { label: "Home", link: "/" },
  { label: "Code", link: "/code" },
];

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (link) => {
    router.push(link);
  };

  const toggleDrawer = (val) => () => setOpen(val);

  return (
    <Box>
      <Tooltip title="Menu" placement="right">
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          sx={{ width: 250 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {Options.map((option) => (
              <ListItem key={option.label} disablePadding>
                <ListItemButton onClick={() => handleNavigate(option.link)}>
                  <ListItemText primary={option.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Hamburger;
