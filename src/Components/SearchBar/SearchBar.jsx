import { Container, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
const SearchBar = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_FETCH_PRODUCT);
                console.log(data);
                setData(data)


            } catch (error) {
                console.log(error);
            }
        }
        getAllProducts();
    }, [])

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        const newFilteredData = data.filter(item =>
            (item.name && item.name.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (item.type && item.type.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (item.brand && item.brand.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (item.category && item.category.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (item.author && item.author.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (item.gender && item.gender.toLowerCase().includes(event.target.value.toLowerCase()))
        );
        setFilteredData(newFilteredData);
        console.log(searchTerm);
    };

    const searchCriteria = [
        { key: "name", placeholder: "Search product by name" },
        { key: "brand", placeholder: "Search product by brand" },
        { key: "author", placeholder: "Search product by author" },
        { key: "number", placeholder: "Search product by type" },
        { key: "category", placeholder: "Search product by category" },
    ];
    const [selectedCriteria, setSelectedCriteria] = useState(searchCriteria[0].key);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentIndex = searchCriteria.findIndex((c) => c.key === selectedCriteria);
            const nextIndex = (currentIndex + 1) % searchCriteria.length;
            setSelectedCriteria(searchCriteria[nextIndex].key);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [selectedCriteria]);



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
                // label="Search"
                placeholder={searchCriteria.find((c) => c.key === selectedCriteria).placeholder}

                value={searchTerm}
                onChange={handleSearch}
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
                searchTerm.length > 0 &&
                <Box sx={{ width: { xs: 350, sm: 500, md: 800 }, overflowY: "scroll", height: "200px" }}>
                    <Stack spacing={0}>

                        {filteredData.length === 0 ?
                            <Typography variant="h6" textAlign="center" margin="25px 0">Product Not Found</Typography>
                            : filteredData.map(products => (
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
        </Container >
    )
}

export default SearchBar