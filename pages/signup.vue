<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <div class="flex items-center">
          <div class="bg-primary rounded-lg p-2">
            <Icon name="lucide:shield-check" class="h-8 w-8 text-white" />
          </div>
          <span class="ml-2 text-2xl font-bold text-gray-900">MFA</span>
        </div>
      </div>
      
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <NuxtLink to="/messages" class="font-medium text-primary hover:text-primary/90">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Step indicator -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div class="flex flex-col items-center">
              <div :class="[currentStep >= 1 ? 'bg-primary' : 'bg-gray-200', 'rounded-full h-8 w-8 flex items-center justify-center text-white font-medium']">
                1
              </div>
              <div class="text-xs mt-1">Account</div>
            </div>
            <div class="h-1 flex-1 mx-2 bg-gray-200" :class="{ 'bg-primary': currentStep >= 2 }"></div>
            <div class="flex flex-col items-center">
              <div :class="[currentStep >= 2 ? 'bg-primary' : 'bg-gray-200', 'rounded-full h-8 w-8 flex items-center justify-center text-white font-medium']">
                2
              </div>
              <div class="text-xs mt-1">Plan</div>
            </div>
            <div class="h-1 flex-1 mx-2 bg-gray-200" :class="{ 'bg-primary': currentStep >= 3 }"></div>
            <div class="flex flex-col items-center">
              <div :class="[currentStep >= 3 ? 'bg-primary' : 'bg-gray-200', 'rounded-full h-8 w-8 flex items-center justify-center text-white font-medium']">
                3
              </div>
              <div class="text-xs mt-1">Payment</div>
            </div>
          </div>
        </div>

        <!-- Step 1: Account Information -->
        <div v-if="currentStep === 1">
          <form @submit.prevent="goToStep(2)" class="space-y-6">
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div class="mt-1">
                <input id="company" name="company" type="text" required v-model="form.company" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
              </div>
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div class="mt-1">
                <input id="name" name="name" type="text" required v-model="form.name" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" required v-model="form.email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="new-password" required v-model="form.password" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
              </div>
            </div>

            <div class="flex items-center">
              <input id="terms" name="terms" type="checkbox" required v-model="form.acceptTerms" class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded">
              <label for="terms" class="ml-2 block text-sm text-gray-900">
                I agree to the
                <a href="#" class="text-primary hover:text-primary/90 font-medium">Terms of Service</a>
                and
                <a href="#" class="text-primary hover:text-primary/90 font-medium">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Continue
              </button>
            </div>
          </form>
        </div>

        <!-- Step 2: Plan Selection -->
        <div v-if="currentStep === 2">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Select a Plan</h3>
              <p class="text-sm text-gray-500">Choose the plan that works best for your business</p>
            </div>

            <div class="space-y-4">
              <div v-for="(plan, index) in plans" :key="index" 
                   class="relative border rounded-lg p-4 cursor-pointer transition-all"
                   :class="form.selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'"
                   @click="selectPlan(plan.id)">
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ plan.name }}</h4>
                    <p class="text-sm text-gray-500">{{ plan.description }}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-gray-900">${{ plan.price }}</div>
                    <div class="text-sm text-gray-500">/month</div>
                  </div>
                </div>
                <div v-if="form.selectedPlan === plan.id" class="absolute top-0 right-0 mt-2 mr-2">
                  <Icon name="lucide:check-circle" class="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div class="pt-4 flex justify-between">
              <button type="button" @click="goToStep(1)" class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Back
              </button>
              <button type="button" @click="goToStep(3)" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Continue to Payment
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Payment Details -->
        <div v-if="currentStep === 3">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Payment Information</h3>
              <p class="text-sm text-gray-500">Secure payment processing</p>
            </div>

            <div class="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div class="flex justify-between mb-4">
                <span class="text-sm text-gray-700">Selected Plan:</span>
                <span class="text-sm font-medium">{{ getSelectedPlanName() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-700">Total:</span>
                <span class="text-lg font-bold">${{ getSelectedPlanPrice() }}/month</span>
              </div>
            </div>

            <form @submit.prevent="completeSignup" class="space-y-4">
              <div>
                <label for="card-name" class="block text-sm font-medium text-gray-700">
                  Name on Card
                </label>
                <div class="mt-1">
                  <input id="card-name" name="card-name" type="text" required v-model="payment.cardName" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                </div>
              </div>

              <div>
                <label for="card-number" class="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <div class="mt-1">
                  <input id="card-number" name="card-number" type="text" placeholder="•••• •••• •••• ••••" required v-model="payment.cardNumber" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                </div>
              </div>

              <div class="flex space-x-4">
                <div class="w-1/2">
                  <label for="expiry" class="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <div class="mt-1">
                    <input id="expiry" name="expiry" type="text" placeholder="MM/YY" required v-model="payment.expiry" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                  </div>
                </div>
                <div class="w-1/2">
                  <label for="cvc" class="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div class="mt-1">
                    <input id="cvc" name="cvc" type="text" placeholder="•••" required v-model="payment.cvc" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                  </div>
                </div>
              </div>
              
              <div class="pt-4 flex justify-between">
                <button type="button" @click="goToStep(2)" class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Back
                </button>
                <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Complete Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({
  layout: 'marketing'
});

const route = useRoute();
const router = useRouter();

// Form data
const form = ref({
  company: '',
  name: '',
  email: '',
  password: '',
  acceptTerms: false,
  selectedPlan: ''
});

// Payment data
const payment = ref({
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: ''
});

// Signup steps
const currentStep = ref(1);

// Available plans
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'Perfect for small businesses just getting started'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    description: 'For growing businesses with more authentication needs'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    description: 'For large organizations requiring advanced features'
  }
];

// Handle plan selection
const selectPlan = (planId) => {
  form.value.selectedPlan = planId;
};

// Get selected plan info
const getSelectedPlanName = () => {
  const plan = plans.find(p => p.id === form.value.selectedPlan);
  return plan ? plan.name : 'None selected';
};

const getSelectedPlanPrice = () => {
  const plan = plans.find(p => p.id === form.value.selectedPlan);
  return plan ? plan.price : 0;
};

// Navigation between steps
const goToStep = (step) => {
  // Validate before proceeding
  if (step > currentStep.value) {
    if (step === 2 && (!form.value.email || !form.value.password || !form.value.acceptTerms)) {
      // Validation would happen here in a real app
      return;
    }
    if (step === 3 && !form.value.selectedPlan) {
      // Validation would happen here in a real app
      return;
    }
  }
  
  currentStep.value = step;
};

// Complete signup
const completeSignup = () => {
  // In a real app, this would submit data to the backend
  console.log('Signup data:', { ...form.value, payment: { ...payment.value } });
  
  // Redirect to the dashboard
  router.push('/messages');
};

// Check if a plan was preselected from URL
onMounted(() => {
  const planFromQuery = route.query.plan;
  if (planFromQuery && plans.some(p => p.id === planFromQuery)) {
    form.value.selectedPlan = planFromQuery.toString();
    // Optionally skip to plan selection step
    currentStep.value = 2;
  }
});
</script> 