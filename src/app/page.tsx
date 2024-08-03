"use client";
import { db } from "@/firebase";
import {
  Close,
  DeleteOutlineOutlined,
  Edit,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { theme } from "../theme";
import RecipeDialog from "./components/RecipeDialog";

export default function Home() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pantryData, setPantryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateData, setUpdateData] = useState(false);
  const [recipeCard, setRecipeCard] = useState(false);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "pantry"));
      const data: any = querySnapShot.docs.map((doc) => ({
        name: doc.id,
        ...doc.data(),
      }));
      setPantryData(data);
    } catch (error) {
      console.log("Error fetching collection: ", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          pt: 10,
        }}
      >
        <Container
          sx={{
            bgcolor: "background.default",
            height: "80vh",
            width: "80%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            p: 5,
            borderRadius: 5,
            boxShadow: 5,
          }}
        >
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            Welcome to the Pantry!
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <FormControl sx={{ width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Search
              </InputLabel>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="standard-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              onClick={() => {
                setOpen(!open);
                fetchCollection();
              }}
              variant="outlined"
            >
              Add new item
            </Button>
            {pantryData.length > 0 && (
              <Button
                onClick={() => {
                  setRecipeCard(!recipeCard);
                }}
                variant="outlined"
              >
                Get Recipes
              </Button>
            )}
          </div>
          {open && (
            <Dialog
              open={open}
              sx={{
                backgroundColor: "#21212192",
                height: "100%",
              }}
            >
              <Card
                name={name}
                quantity={quantity}
                setName={setName}
                setQuantity={setQuantity}
                open={open}
                setOpen={setOpen}
                updateData={updateData}
                setUpdateData={setUpdateData}
                fetchCollection={fetchCollection}
              />
            </Dialog>
          )}
          {recipeCard === true && (
            <Dialog
              open={recipeCard}
              PaperProps={{
                sx: {
                  backgroundColor: "#D6BD98",
                  height: "100%",
                  width: "100%",
                },
              }}
              maxWidth="md"
            >
              <RecipeDialog
                pantryData={pantryData}
                setRecipeCard={setRecipeCard}
              />
            </Dialog>
          )}

          <Stack
            spacing={2}
            sx={{
              width: "80%",
              overflow: "auto",
            }}
          >
            {pantryData &&
              pantryData
                .filter((item: { name: string }) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item: { name: string; quantity: number }) => (
                  <Container
                    key={item.name}
                    sx={{
                      display: "flex",
                      background: "",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      p: 2,
                      borderRadius: 5,
                      boxShadow: "0 0 8px rgba(0, 0, 0, 0.094)",
                      cursor: "pointer",
                      transitionDuration: 1000,
                      "&:hover": {
                        backgroundColor: "#304a3529",
                      },
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "40%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h4">{item.name}</Typography>
                        <Typography variant="h4">{item.quantity}</Typography>
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <Stack
                        sx={{
                          height: "50px",
                          gap: "2px",
                        }}
                      >
                        <Button
                          variant="text"
                          sx={{
                            backgroundColor: "#304a3529",
                            fontWeight: "bold",
                            color: "#9fedd0",
                            height: "48%",
                            "&:hover": {
                              backgroundColor: "#21212192",
                            },
                          }}
                          onClick={async () => {
                            await setDoc(doc(db, "pantry", item.name), {
                              quantity: item.quantity + 1,
                            });
                            fetchCollection();
                          }}
                        >
                          <KeyboardArrowUpOutlined />
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "#304a3529",
                            fontWeight: "bold",
                            color: "#9fedd0",
                            height: "48%",
                            "&:hover": {
                              backgroundColor: "#21212192",
                            },
                          }}
                          variant="text"
                          onClick={async () => {
                            await setDoc(doc(db, "pantry", item.name), {
                              quantity: item.quantity - 1,
                            });
                            fetchCollection();
                          }}
                        >
                          <KeyboardArrowDownOutlined />
                        </Button>
                      </Stack>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#098243",
                          fontWeight: "bold",
                          color: "#9fedd0",
                          "&:hover": {
                            backgroundColor: "#024e26",
                          },
                        }}
                        onClick={() => {
                          setName(item.name);
                          setQuantity(item.quantity);
                          setUpdateData(true);
                          setOpen(true);
                        }}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#9c0707",
                          fontWeight: "bold",
                          color: "#9fedd0",
                          "&:hover": {
                            backgroundColor: "#a50c0c",
                          },
                        }}
                        onClick={async () => {
                          await deleteDoc(doc(db, "pantry", item.name));
                          fetchCollection();
                        }}
                      >
                        <DeleteOutlineOutlined />
                      </Button>
                    </Box>
                  </Container>
                ))}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

type Props = {
  name: any;
  quantity: number;
  setName: any;
  setQuantity: any;
  open: boolean;
  setOpen: any;
  updateData: any;
  setUpdateData: any;
  fetchCollection: any;
};

const Card = ({
  name,
  quantity,
  setName,
  setQuantity,
  open,
  setOpen,
  updateData,
  setUpdateData,
  fetchCollection,
}: Props) => {
  const handleSubmit = async () => {
    if (name === "") {
      console.log("Please enter a name");
      return;
    }

    if (quantity === 0) {
      console.log("Please enter a quantity");
      return;
    }

    if (name) {
      const docRef = doc(db, "pantry", name);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await setDoc(docRef, {
          quantity,
        });
        console.log("Document successfully updated!");
        setUpdateData(false);
      } else {
        await setDoc(docRef, {
          quantity,
        });
        console.log("Document successfully created!");
      }
    }

    fetchCollection();
    setName("");
    setQuantity(1);
    setOpen(false);
  };

  return (
    <Container
      sx={{
        backgroundColor: "#D6BD98",
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <div
        onClick={() => {
          setUpdateData(false);
          setOpen(!open);
          setName("");
          setQuantity(1);
        }}
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          cursor: "pointer",
          padding: "5px",
        }}
      >
        <Close />
      </div>
      <Typography variant="h3" sx={{ color: "primary.main", pt: 4 }}>
        Add Inventory
      </Typography>
      {updateData ? (
        <TextField
          id="outlined-basic"
          label="Enter item name"
          variant="outlined"
          type="text"
          placeholder="Enter item name"
          value={name}
          required
          aria-readonly
        />
      ) : (
        <TextField
          id="outlined-basic"
          label="Enter item name"
          variant="outlined"
          type="text"
          placeholder="Enter item name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <Button
        variant="outlined"
        onClick={handleSubmit}
        sx={{
          width: "100%",
          marginTop: "1rem",
        }}
      >
        {updateData ? "Update" : "Add"}
      </Button>
    </Container>
  );
};
