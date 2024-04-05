<template>
    <div>
                <div class="product-container" v-for="product in presentProducts" :key="product.id">
                    <figure>
                        <img :src="product.image" width="250" height="250" alt="Product Image">
                    </figure>
                    <div class="product-details">
                        <h2>{{ product.title }}</h2>
                        <p>Price: {{ product.price }}</p>
                        <p>Slots: {{ product.stock - getCartItemQuantity(product.id) }}</p>
                        <button @click="addingCart(product)" :disabled="!canAddToCart(product)"
                            :class="{ 'disabled-button': !canAddToCart(product) }">
                            Add to cart
                        </button>
                        <span v-if="product.availableSlots === getCartItemQuantity(product.id)">
                            All slots are full
                        </span>
                        <span v-else>
                            BUY NOW!!
                        </span>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
    name: "ProductsList",
    props: ["presentProducts", "cartProducts"],
    data() {
        return{
            products: [
                {
                    "id": 1001, 
                    "title": "Cat Food, 25lb bag",
                    "description": "A 25 pounds bag of <em> irresisteble </em>, organic goodness for your cat.",
                    "price": 20.00, 
                    "image": "catfood.jpeg",
                    "availableInventory": 10,
                    "rating": 2
                },
                {
                    "id": 1002, 
                    "title": "Cat Food, 50lb bag",
                    "description": "A 50 pounds bag of <em> irresisteble </em>, organic goodness for your cat.",
                    "price": 50.00, 
                    "image": "catfood.jpeg",
                    "availableInventory": 15,
                    "rating": 2
                },
                {
                    "id": 1003, 
                    "title": "Kitty Food, 10lb bag",
                    "description": "A 10 pounds bag of <em> irresisteble </em>, organic goodness for your cat.",
                    "price": 30.00, 
                    "image": "kittyfood.png",
                    "availableInventory": 28,
                    "rating": 4
                },
                {
                    "id": 1004, 
                    "title": "Meow Meow, 15lb bag",
                    "description": "A 15 pounds bag of <em> irresisteble </em>, organic goodness for your cat.",
                    "price": 25.00, 
                    "image": "catfood3.png",
                    "availableInventory": 30,
                    "rating": 5
                },
                {
                    "id": 1005, 
                    "title": "Cat Food, 60lb bag",
                    "description": "A 60 pounds bag of <em> irresisteble </em>, organic goodness for your cat.",
                    "price": 80.00, 
                    "image": "catfood2.png",
                    "availableInventory": 14,
                    "rating": 3
                }
            ]
        }
    },
    methods:{
        getCartItemQuantity(id) {
                    const item = this.cartProducts.find(cartProducts => cartProducts.id === id);
                    return item ? item.quantity : 0;
                },
                canAddToCart(product) {
                    return product.availableSlots > this.getCartItemQuantity(product.id);
                },
                addingCart(product) {
                    this.$emit("addingProduct", product);
                },
        
    },
};
</script>