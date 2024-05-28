import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import { getApi } from "../../../api/api";
import Table_Periodo_List from "../../../hooks/Table/Table_Periodo_List";

const Page_ReservaList = () => {
  const name = "Lista de reservas";

  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    try {
      const booksData = await getApi("http://localhost:8080/api/book/books");
      setBooks(booksData.book);
      console.log(booksData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Admin>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ borderBottom: "2px solid black", width: "100%" }}
              >
                {name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Table_Periodo_List books={books} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Admin>
  );
};

export default Page_ReservaList;
