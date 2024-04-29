import AddIcon from "@mui/icons-material/Add";

import { Grid, Button } from "@mui/material";
import PropTypes from "prop-types";

const ButtonProducts = ({ openDrawer }) => {
  const handleclick = () => {
    openDrawer();
  };
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Button
            variant="contained"
            color="success"
            endIcon={<AddIcon />}
            onClick={handleclick}
            sx={{ borderRadius: 3, marginTop: 2, marginRight: 1 }}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

ButtonProducts.propTypes = {
  handleChange: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
};

export default ButtonProducts;
