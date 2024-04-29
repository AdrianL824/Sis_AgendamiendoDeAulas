import { Admin } from "../../../components/layout/admin/Admin";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CardsHome from "./utils/CardsHome";
import { ChartsHome } from "./utils/ChartsHome";
import { MoreHome } from "./utils/MoreHome";

// import ChartsHome from "./helps/ChartsHome";

const Home = () => {
  return (
    <Admin>
      <CssBaseline />
      <CardsHome />
      <Box mt={1} />
      <ChartsHome />
      <Box mt={1} />
      <MoreHome />
    </Admin>
  );
};

export default Home;
