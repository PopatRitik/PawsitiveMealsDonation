import React from 'react'
import { Box, Stack, Container } from "@chakra-ui/react"
import Card from './Card'
import axios from "axios";


const checkoutHandler = async (amount, email) => {
     const { data: { key } } = await axios.get("https://pawsitivemeals.onrender.com/api/getkey")

     const { data: { order } } = await axios.post("https://pawsitivemeals.onrender.com/api/checkout", {
          amount,
          email
     })

     const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "PawsitiveMeals",
          description: "Donation for dogs",
          image: "https://static.vecteezy.com/system/resources/thumbnails/021/334/027/small/smiling-bernese-mountain-dog-avatar-tongue-hanging-out-cute-cartoon-pet-domestic-animal-vector.jpg",
          order_id: order.id,
          callback_url: `https://pawsitivemeals.onrender.com/api/paymentVerification?email=${email}`,
          prefill: {
               name: "popri",
               email: email,
               contact: "9999999999"
          },
          notes: {
               "address": "popri Corporate Office"
          },
          theme: {
               "color": "#1A202C"
          }
     };
     const razor = new window.Razorpay(options);
     razor.open();

}


const Home = () => {
     return (
          <Box bgGradient="linear(to-r, blue.900, black)" minHeight="100vh">
               <Container maxW="container.xl" py={10}>
                    <Stack 
                         direction={["column", "row"]} 
                         spacing={8} 
                         align="center" 
                         justify="center"
                         minHeight="90vh"
                    >
                         <Card img={"https://t3.ftcdn.net/jpg/05/67/84/64/360_F_567846498_PhVBsAff0c05bF0EisNnB0NHOuM0R8Vv.jpg"} checkoutHandler={checkoutHandler} />
                    </Stack>
               </Container>
          </Box>
     )
}

export default Home
