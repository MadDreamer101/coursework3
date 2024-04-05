<template>
    <div>
            <h2>Shopping Cart</h2>
            <div v-for="item in carting" :key="item.id" class="cart-item">
                <figure>
                    <img :src="item.image" width="100" height="100" alt="Product Image">
                </figure>
                <div class="product-details">
                    <h3>{{ item.title }} ({{ item.quantity }})</h3>
                    <p>Price: {{ item.price }}</p>
                    <button @click="removeItem(item)">Remove from Cart</button>
                </div>
            </div>
            <div class="input-field">
              <h3>First name:</h3><input type="text" id="firstName" @input="validateName">
            </div>
            <div class="input-field">
                <h3>Last name:</h3><input type="text" id="lastName" @input="validateName">
            </div>
            <div class="input-field">
                <h3>Phone number:</h3><input type="text" id="phoneNumber" @input="validateNumber">
            </div>
            <button @click="checkout" :disabled="carting.length === 0">Checkout</button>
        </div>
</template>

<script>
export default {
    name: "Form-Component", 
    props: ['carting'],
    data(){
        return {
            order: {
                    firstName: '',
                    number: '',
                },
        };
    },
    methods:{
        removeItem(index){
            this.$emit("removing", index);
        },
        validateName() {
            const firstNameInput = document.getElementById('firstName');
            const lastNameInput = document.getElementById('lastName');
            
            // Allow only alphabets in the first name field
            firstNameInput.value = firstNameInput.value.replace(/[^a-zA-Z]/g, '');

            // Allow only alphabets in the last name field
            lastNameInput.value = lastNameInput.value.replace(/[^a-zA-Z]/g, '');
        },
        validateNumber() {
            const phoneNumberInput = document.getElementById('phoneNumber');

            // Allow only numbers in the phone number field
            phoneNumberInput.value = phoneNumberInput.value.replace(/[^0-9]/g, '');
        },
        checkout() {
            
    
            // Check if the required fields are filled in
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const phoneNumber = document.getElementById('phoneNumber').value;

            if (!firstName || !lastName || !phoneNumber) {
                alert('Please fill in all the details before checking out.');
            } else {
                
                alert('Checkout successful! Thank you for your purchase.');
            }
        },
    }
}
</script>