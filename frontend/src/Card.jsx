import { Button, Image, Input, Text, VStack, Heading, Box } from '@chakra-ui/react'
import React, { useState } from 'react'

const Card = ({ img, checkoutHandler }) => {
    const [amount, setAmount] = useState('')
    const [email, setEmail] = useState('')
    const [isAmountValid, setIsAmountValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)

    const handleCheckout = () => {
        if (!amount) setIsAmountValid(false)
        else setIsAmountValid(true)

        if (!email) setIsEmailValid(false)
        else setIsEmailValid(true)

        if (amount && email) {
            checkoutHandler(amount, email)
        }
    }

    return (
        <Box 
            boxShadow="xl" 
            borderRadius="lg" 
            overflow="hidden" 
            bg="white" 
            p={6}
            maxW="400px"
            w="full"
        >
            <VStack spacing={4} align="stretch">
                <Text fontSize="xl" fontWeight="bold" align={"center"} color="blue.600">PawsitiveMeals</Text>
                <Image src={img} borderRadius="lg" objectFit="cover" h="250px" w="full" />
                <Heading size="lg" textAlign="center" color="blue.600">Donate to Dogs</Heading>
                <Input 
                    type="number" 
                    placeholder="Amount in rupees" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    isInvalid={!isAmountValid}
                    focusBorderColor="blue.400"
                    _placeholder={{ color: 'gray.500' }}
                    borderColor="gray.300"
                    color="gray.800"
                    _hover={{borderColor: "gray.400"}}
                />
                {!isAmountValid && <Text color="red.500" fontSize="sm">Amount is required</Text>}
                <Input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    isInvalid={!isEmailValid}
                    focusBorderColor="blue.400"_placeholder={{ color: 'gray.500' }}
                    borderColor="gray.300"
                    color="gray.800"
                    _hover={{borderColor: "gray.400"}}
                />
                {!isEmailValid && <Text color="red.500" fontSize="sm">Email is required</Text>}
                <Button 
                    onClick={handleCheckout} 
                    colorScheme="blue" 
                    size="lg"
                    _hover={{ bg: "blue.500" }}
                >
                    Donate Now
                </Button>
            </VStack>
        </Box>
    )
}

export default Card
