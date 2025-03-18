<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Secure Your Business Authentication</h1>
          <p class="text-xl md:text-2xl mb-8">Manage all your 2FA codes in one place. Share access with your team and vendors securely.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/signup" class="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Get Started
            </NuxtLink>
            <NuxtLink to="/login" class="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors">
              Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Why Choose Our MFA Solution?</h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="lucide:shield" class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Enhanced Security</h3>
            <p class="text-gray-600">Protect your customers with industry-standard multi-factor authentication methods.</p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="lucide:smartphone" class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Multiple Channels</h3>
            <p class="text-gray-600">SMS, email, and app-based authentication to suit your customers' preferences.</p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="lucide:settings" class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Easy Integration</h3>
            <p class="text-gray-600">Simple API and SDK options to integrate with your existing systems.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 class="text-xl font-bold mb-2">Starter</h3>
            <p class="text-4xl font-bold mb-4">$29<span class="text-lg text-gray-500">/month</span></p>
            <ul class="mb-8 space-y-2">
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Up to 1,000 authentications</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Email & SMS channels</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Basic reporting</li>
            </ul>
            <NuxtLink to="/signup?plan=starter" class="block text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Choose Plan
            </NuxtLink>
          </div>
          
          <div class="bg-white p-8 rounded-lg shadow-md border-2 border-blue-500 transform scale-105">
            <div class="bg-blue-500 text-white text-sm font-bold uppercase py-1 px-4 rounded-full inline-block mb-4">Most Popular</div>
            <h3 class="text-xl font-bold mb-2">Professional</h3>
            <p class="text-4xl font-bold mb-4">$79<span class="text-lg text-gray-500">/month</span></p>
            <ul class="mb-8 space-y-2">
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Up to 5,000 authentications</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> All authentication channels</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Advanced reporting</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Priority support</li>
            </ul>
            <NuxtLink to="/signup?plan=professional" class="block text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Choose Plan
            </NuxtLink>
          </div>
          
          <div class="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 class="text-xl font-bold mb-2">Enterprise</h3>
            <p class="text-4xl font-bold mb-4">$199<span class="text-lg text-gray-500">/month</span></p>
            <ul class="mb-8 space-y-2">
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Unlimited authentications</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> All authentication channels</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Custom reporting</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> 24/7 dedicated support</li>
              <li class="flex items-center"><Icon name="lucide:check" class="w-5 h-5 text-green-500 mr-2" /> Custom integrations</li>
            </ul>
            <NuxtLink to="/signup?plan=enterprise" class="block text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Choose Plan
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to secure your users?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses that trust our MFA solution to protect their users.</p>
        <NuxtLink to="/signup" class="inline-block px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
          Start Free Trial
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 py-12">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-white text-lg font-semibold mb-4">MFA</h3>
            <p class="mb-4">Secure authentication solutions for businesses of all sizes.</p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white"><Icon name="lucide:twitter" class="w-5 h-5" /></a>
              <a href="#" class="text-gray-400 hover:text-white"><Icon name="lucide:facebook" class="w-5 h-5" /></a>
              <a href="#" class="text-gray-400 hover:text-white"><Icon name="lucide:linkedin" class="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 class="text-white text-lg font-semibold mb-4">Product</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white">Features</a></li>
              <li><a href="#" class="hover:text-white">Pricing</a></li>
              <li><a href="#" class="hover:text-white">Documentation</a></li>
              <li><a href="#" class="hover:text-white">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-white text-lg font-semibold mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white">About Us</a></li>
              <li><a href="#" class="hover:text-white">Blog</a></li>
              <li><a href="#" class="hover:text-white">Careers</a></li>
              <li><a href="#" class="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white">Terms of Service</a></li>
              <li><a href="#" class="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" class="hover:text-white">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2023 MFA App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No navigation when directly accessing index page
definePageMeta({
  layout: 'marketing'
});
</script>

<style>
.landing-page {
  scroll-behavior: smooth;
}
</style> 