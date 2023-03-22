import axios from "axios";
const getCart = async (setProceed, setCart, authToken) => {
    if (setProceed) {
        const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setCart(data);
    }
}
const getWishList = async (setProceed, setWishlistData, authToken) => {
    if (setProceed) {
        const { data } = await axios.get(`${process.env.REACT_APP_GET_WISHLIST}`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setWishlistData(data)
    }
}
const handleLogOut = (setProceed, toast, navigate, setOpenAlert) => {
    if (setProceed) {
        localStorage.removeItem('Authorization', 'totalAmount')
        toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
        navigate('/')
        setOpenAlert(false)
    }
    else {
        toast.error("User is already logged of", { autoClose: 500, theme: 'colored' })
    }
}

const handleClickOpen = (setOpenAlert) => {
    setOpenAlert(true);
};

const handleClose = (setOpenAlert) => {
    setOpenAlert(false);
};




export { getCart, getWishList, handleClickOpen, handleClose, handleLogOut }