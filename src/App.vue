<template>
   <div id="app">
        <header>
            <h1>{{ storeName }}</h1>
            <button @click="toggleCheckout" :disabled="!isCartEnabled">
                {{ cartCount }}
                <span class="fas fa-cart-plus"></span> Cart
            </button>
        </header>
        <div>
            <button @click="sortAscending">Sort Ascending</button>
            <button @click="sortDescending">Sort Descending</button>
        </div>
        <div>
            <label for="sortCriteria">Sort by:</label>
            <select id="sortCriteria" v-model="selectedSortCriteria">
                <option value="name">Name</option>
                <option value="location">Location</option>
                <option value="slots">Slots</option>
                <option value="price">Price</option>
            </select>
            <button @click="sortProducts">Sort</button>
        </div>
        <main>
            <!-- Product Page -->
            <product-list v-if="showProduct" :presentProducts="currentProducts" :cartProducts="cart"
            @addingProduct="addToCart"></product-list>
            

            <!-- Cart Page -->
            <checkout v-else :carting="cart" @removing="removeFromCart"></checkout>
           
        </main>

    </div>
</template>

<script> /* eslint-disable */
import productList from "./components/ProductList.vue";
import checkout from "./components/Form.vue"


export default {
  name: 'App',
  components: {
    productList,
    checkout
  },
  data(){
    return{
       storeName: 'ProSkill Tutors',
                showProduct: true,
                products: [],
                cart: [],
                currentProducts: [], // New array for current products
                selectedSortCriteria: 'name', // Default sorting criteria
                isCheckoutModalVisible: false,
    }
  },
            created() {
                this.allProducts();
            },
  methods: {
    addToCart(product) {
                    const existingItem = this.cart.find(item => item.id === product.id);

                    if (existingItem) {
                        // If the product is already in the cart, increment the quantity
                        existingItem.quantity++;
                    } else {
                        // If the product is not in the cart, add it with quantity 1
                        this.cart.push({ ...product, quantity: 1 });
                    }
                },
                toggleCheckout() {
                    this.showProduct = !this.showProduct;
                },
                canAddToCart(product) {
                    return product.availableSlots > this.getCartItemQuantity(product.id);
                },
                getCartItemQuantity(id) {
                    const item = this.cart.find(cartItem => cartItem.id === id);
                    return item ? item.quantity : 0;
                },
                getCartCount(id) {
                    return this.cart.filter(item => item.id === id).length;
                },
                sortAscending() {
                    this.currentProducts = [...this.products].sort((a, b) => a.title.localeCompare(b.title));
                },
                sortDescending() {
                    this.currentProducts = [...this.products].sort((a, b) => b.title.localeCompare(a.title));
                },
                sortProducts() {
                    switch (this.selectedSortCriteria) {
                        case 'name':
                            this.currentProducts = [...this.products].sort((a, b) => a.title.localeCompare(b.title));
                            break;
                        case 'location':
                            this.currentProducts = [...this.products].sort((a, b) => a.title.split(' - ')[1].localeCompare(b.title.split(' - ')[1]));
                            break;
                        case 'slots':
                            this.currentProducts = [...this.products].sort((a, b) => a.availableSlots - b.availableSlots);
                            break;
                        case 'price':
                            this.currentProducts = [...this.products].sort((a, b) => a.price - b.price);
                            break;
                        default:
                            break;
                    }
                },
               
                openCheckoutModal() {
                    this.isCheckoutModalVisible = true;
                },
                closeCheckoutModal() {
                    this.isCheckoutModalVisible = false;
                },
               
                allProducts() {
                    fetch('http://localhost:3000/collection/products', {
                        method: 'GET', // set the HTTP method as 'POST'
                        headers: {
                            'Content-Type': 'application/json', //set the data as JSON
                        },
                    }).then(response => response.json())
                        .then(responseJSON => {
                            this.products = responseJSON;
                            console.log(responseJSON)
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                },
                
        removeFromCart(item) {
            const index = this.cart.findIndex(cart=> cart.id === item.id);

            if (index !== -1) {
                if (this.cart[index].quantity > 1) {
                    this.cart[index].quantity--;
                } else {
                    this.cart.splice(index, 1);
                }

                const lessonIndex = this.currentProducts.findIndex(product => product.id === item.id);
                if (lessonIndex !== -1) {
                    this.currentProducts[lessonIndex].availableSlots++;
                }
            }
        },
  },
            computed: {
                cartCount() {
                    return this.cart.length || '';
                },
                cartItems() {
                    return this.cart;
                },
                isCartEnabled() {
                    return this.cart.length > 0;
                },
            },
            watch: {
                products: {
                    handler(newVal) {
                        this.currentProducts = [...newVal];
                    },
                    deep: true,
                },
            },
            mounted() {
                this.currentProducts = [...this.products];
            },
}
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

#app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: #fff;
    padding: 10px;
}

header h1 {
    margin: 0;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
}

button.disabled-button {
    background-color: rgb(144, 185, 145); /* Change this to the desired color for disabled buttons */
    cursor: not-allowed;
}

main {
    display: flex;
    flex-wrap: wrap;
}

main > div {
    flex: 1;
    margin: 10px;
    padding: 15px;
    border: 1px solid #ddd;
}

.product-container {
    display: flex;
    align-items: flex-start;
}

figure {
    margin-right: 20px;
}

figure img {
    max-width: 100%;
    height: auto;
}

.product-details {
    flex: 1;
    text-align: left;
}

button {
    margin-top: 10px;
}

.cart-item {
    display: flex;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
}

.cart-item figure {
    margin-right: 20px;
}

.cart-item figure img {
    max-width: 100%;
    height: auto;
}

.cart-item .product-details {
    flex: 1;
    text-align: left;
}
</style>