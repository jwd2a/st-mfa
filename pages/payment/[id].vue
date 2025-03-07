<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="h-12 text-center flex items-center justify-center">
          <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">MFA Service</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Activate Your 2FA Service</h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Secure your accounts with our multi-factor authentication service
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="!paymentComplete" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Payment Details</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your service provider has set up 2FA protection for your accounts.
              Complete the payment below to activate this service.
            </p>
          </div>

          <div class="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <Icon name="lucide:info" class="h-5 w-5 text-blue-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800 dark:text-blue-300">Service Information</h3>
                <div class="mt-2 text-sm text-blue-700 dark:text-blue-200">
                  <ul class="list-disc space-y-1 pl-5">
                    <li>Secure 2FA codes for all your accounts</li>
                    <li>Dedicated phone numbers for your services</li>
                    <li>24/7 access to your authentication codes</li>
                    <li>Protection against unauthorized access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <div class="flex justify-between items-center">
              <div>
                <h4 class="text-base font-medium text-gray-900 dark:text-white">2FA Service Subscription</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Monthly protection for your accounts</p>
              </div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">$9.99/mo</div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label for="card-number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Card Number
              </label>
              <div class="mt-1">
                <input
                  id="card-number"
                  v-model="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="expiry" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expiry Date
                </label>
                <div class="mt-1">
                  <input
                    id="expiry"
                    v-model="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
              <div>
                <label for="cvc" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  CVC
                </label>
                <div class="mt-1">
                  <input
                    id="cvc"
                    v-model="cvc"
                    type="text"
                    placeholder="123"
                    class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              v-model="acceptedTerms"
              type="checkbox"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the <a href="#" class="text-primary hover:text-primary/90">Terms of Service</a> and 
              <a href="#" class="text-primary hover:text-primary/90">Privacy Policy</a>
            </label>
          </div>

          <div>
            <button
              @click="processPayment"
              :disabled="!isFormValid"
              :class="[
                isFormValid ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed',
                'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              ]"
            >
              Pay $9.99/month & Activate Service
            </button>
          </div>
        </div>

        <div v-else class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
            <Icon name="lucide:check" class="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="mt-3 text-lg font-medium text-gray-900 dark:text-white">Payment Successful!</h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Your 2FA service has been activated. You will receive a confirmation email shortly.
          </p>
          <div class="mt-5">
            <button
              @click="goToHome"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Get the client ID from the route params
const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id as string);

// Payment form state
const cardNumber = ref('');
const expiryDate = ref('');
const cvc = ref('');
const acceptedTerms = ref(false);
const paymentComplete = ref(false);

// Check if the form is valid
const isFormValid = computed(() => {
  return cardNumber.value.length > 0 && 
         expiryDate.value.length > 0 && 
         cvc.value.length > 0 && 
         acceptedTerms.value;
});

// Process the payment
const processPayment = async () => {
  if (!isFormValid.value) return;
  
  try {
    // Show loading state
    const isLoading = ref(true);
    
    // In a real app, this would first interact with a payment processor
    
    // Then update the client's payment status
    const response = await fetch('/api/payment/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: id.value,
        status: 'paid',
        paymentDate: new Date().toISOString()
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      paymentComplete.value = true;
    } else {
      alert('Payment failed. Please try again.');
    }
    
    isLoading.value = false;
  } catch (error) {
    alert('An error occurred during payment processing. Please try again.');
    console.error('Payment error:', error);
  }
};

// Navigate back to the home page
const goToHome = () => {
  router.push('/');
};
</script> 