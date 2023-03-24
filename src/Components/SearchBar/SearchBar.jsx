import { Container, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import {  useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState([])
    const [customTimeOut, setCustomTimeOut] = useState("");
    const [productNotFound, setProductNotFound] = useState(false)

    const sendQuery = async (query) => {
        if (query.length > 0) {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_SEARCH_PRODUCT}/${query}`)
                data.length > 0 ? setResults(data) : setProductNotFound(true)
            } catch (error) {
                // console.log(error.response.data);
                setProductNotFound(true)
            }
        }
    };
    const handleChange = (e) => {
        clearTimeout(customTimeOut)
        setInputValue(e.target.value)
        const timeOut = setTimeout(() => sendQuery(inputValue), 500)
        setCustomTimeOut(timeOut);
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Container style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 5 }}>
            <TextField
                id="search"
                type="search"
                label="Search"
                onChange={handleChange}
                sx={{ width: { xs: 350, sm: 500, md: 800 }, }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AiOutlineSearch />
                        </InputAdornment>
                    ),
                }}
            />
            {
                (inputValue.length > 0 && results.length > 0) &&
                <Box sx={{ width: { xs: 350, sm: 500, md: 800 }, overflowY: "scroll", height: 300 }}>
                    <Stack spacing={0}>

                        {
                            results.map(products => (
                                <Link to={`/Detail/type/${products.type}/${products._id}`} key={products._id}>
                                    <Item sx={{ borderRadius: 0, display: 'flex', justifyContent: 'space-between', padding: "2px 15px", alignItems: 'center' }}>
                                        <Typography variant="body2"> {products.name.slice(0, 35)}</Typography>
                                        <img src={products.image} alt={products.name} style={{ width: 55, height: 65 }} />
                                    </Item>
                                </Link>
                            ))}
                    </Stack>
                </Box>
            }
            {(results.length <= 0 && inputValue.length > 0) &&
                <h1>Product not found</h1>
            }
        </Container >
    )
}

export default SearchBar