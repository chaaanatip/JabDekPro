<template>
  <div class="p-6 bg-gray-800 min-h-screen">
    <h1 class="text-4xl font-bold text-white mb-6">Product Management</h1>

    <!-- Form for creating and updating products -->
    <form
      @submit.prevent="handleSubmit"
      class="bg-gray-900 p-4 rounded-lg shadow-md mb-6"
    >
      <div class="mb-4">
        <label for="name" class="block text-white text-sm font-medium"
          >Product Name</label
        >
        <input
          id="name"
          v-model="form.name"
          placeholder="Product Name"
          required
          class="w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-white text-sm font-medium"
          >Description</label
        >
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Description"
          class="w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:outline-none"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="price" class="block text-white text-sm font-medium"
          >Price</label
        >
        <input
          id="price"
          v-model="form.price"
          type="number"
          placeholder="Price"
          required
          class="w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div class="mb-4">
        <label for="stock" class="block text-white text-sm font-medium"
          >Stock</label
        >
        <input
          id="stock"
          v-model="form.stock"
          type="number"
          placeholder="Stock"
          class="w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div class="mb-4">
        <label for="category_id" class="block text-white text-sm font-medium"
          >Category ID</label
        >
        <input
          id="category_id"
          v-model="form.category_id"
          type="number"
          placeholder="Category ID"
          class="w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div class="mb-4">
        <label for="image_url" class="block text-white text-sm font-medium"
          >Image URL</label
        >
        <input
          id="image_url"
          v-model="form.image_url"
          placeholder="Image URL"
          class="w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {{ isEditing ? 'Update Product' : 'Create Product' }}
      </button>
    </form>

    <!-- List of products -->
    <ul class="space-y-4">
      <li
        v-for="product in products"
        :key="product.id"
        class="bg-gray-900 p-4 rounded-lg shadow-md flex justify-between items-center"
      >
        <div class="text-white">
          <h2 class="text-lg font-semibold">{{ product.name }}</h2>
          <p class="text-sm">${{ product.price }}</p>
        </div>
        <div>
          <button
            @click="editProduct(product)"
            class="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
          >
            Edit
          </button>
          <button
            @click="deleteProduct(product.id)"
            class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const form = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  category_id: '',
  image_url: ''
})
const isEditing = ref(false)
const currentProductId = ref(null)

// Fetch products from API
const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// Handle form submission for creating or updating products
const handleSubmit = async () => {
  const url = isEditing.value
    ? `/api/products/${currentProductId.value}`
    : '/api/products'
  const method = isEditing.value ? 'PUT' : 'POST'

  try {
    await fetch(`http://localhost:3000${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    form.value = {
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      image_url: ''
    }
    isEditing.value = false
    await fetchProducts()
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

// Handle editing a product
const editProduct = (product) => {
  form.value = { ...product }
  isEditing.value = true
  currentProductId.value = product.id
}

// Handle deleting a product
const deleteProduct = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE'
    })
    await fetchProducts()
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
/* Add any styles you need here */
</style>
