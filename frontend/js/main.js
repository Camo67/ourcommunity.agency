document.addEventListener('DOMContentLoaded', function() {
    // Supabase client initialization
    // IMPORTANT: REPLACE THESE WITH YOUR ACTUAL SUPABASE PROJECT URL AND PUBLIC (ANON) KEY
    const SUPABASE_URL = 'https://ycrmkofqhtlkexfbpljy.supabase.co'; // e.g., 'https://your-project-id.supabase.co'
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljcm1rb2ZxaHRsa2V4ZmJwbGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMDQyMTgsImV4cCI6MjA2Mzg4MDIxOH0.RttjxZ_VSoZbeFWmI6nD0mSQb40ozvoPT6u7eRd9Tpo'; // e.g., 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

    const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get DOM elements for authentication and classroom
    const authUi = document.getElementById('auth-ui');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const authStatus = document.getElementById('auth-status');
    const classroomContent = document.getElementById('classroom-content');
    const resourcesContainer = document.getElementById('resources-container');
    const resetPasswordLink = document.getElementById('reset-password-link');

    // --- Authentication Functions ---

    // Function to check and update UI based on login status
    async function checkUser() {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Error getting user:', error);
            authStatus.textContent = 'Error checking login status.';
            authUi.style.display = 'block';
            classroomContent.style.display = 'none';
            logoutButton.style.display = 'none';
            return;
        }

        if (user) {
            authStatus.textContent = `Logged in as: ${user.email}`;
            authUi.style.display = 'none'; // Hide signup/login forms
            logoutButton.style.display = 'block'; // Show logout button
            classroomContent.style.display = 'block'; // Show classroom content
            fetchClassroomResources(); // Fetch and display resources for logged-in users
        } else {
            authStatus.textContent = 'Please sign up or log in to access the Classroom.';
            authUi.style.display = 'block'; // Show signup/login forms
            logoutButton.style.display = 'none'; // Hide logout button
            classroomContent.style.display = 'none'; // Hide classroom content
        }
    }

    // Signup handler
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = signupForm['signup-email'].value;
            const password = signupForm['signup-password'].value;

            authStatus.textContent = 'Signing up...';
            const signupButton = signupForm.querySelector('button');
            signupButton.disabled = true;

            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                authStatus.textContent = `Signup Error: ${error.message}`;
                console.error('Signup Error:', error);
            } else {
                authStatus.textContent = 'Sign up successful! Please check your email to confirm your account (if email confirmation is enabled).';
                signupForm.reset();
            }
            signupButton.disabled = false;
        });
    }

    // Login handler
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = loginForm['login-email'].value;
            const password = loginForm['login-password'].value;

            authStatus.textContent = 'Logging in...';
            const loginButton = loginForm.querySelector('button');
            loginButton.disabled = true;

            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                authStatus.textContent = `Login Error: ${error.message}`;
                console.error('Login Error:', error);
            } else {
                authStatus.textContent = 'Login successful!';
                loginForm.reset();
                checkUser();
            }
            loginButton.disabled = false;
        });
    }

    // Logout handler
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            authStatus.textContent = 'Logging out...';
            logoutButton.disabled = true;

            const { error } = await supabase.auth.signOut();

            if (error) {
                authStatus.textContent = `Logout Error: ${error.message}`;
                console.error('Logout Error:', error);
            } else {
                authStatus.textContent = 'Logged out successfully.';
                checkUser();
            }
            logoutButton.disabled = false;
        });
    }

    // Reset Password handler
    if (resetPasswordLink) {
        resetPasswordLink.addEventListener('click', async (event) => {
            event.preventDefault();
            const email = prompt("Please enter your email address to reset your password:");
            if (email) {
                authStatus.textContent = 'Sending password reset email...';
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/reset-password.html', // Ensure this page exists!
                });

                if (error) {
                    authStatus.textContent = `Password Reset Error: ${error.message}`;
                    console.error('Password Reset Error:', error);
                } else {
                    authStatus.textContent = 'Password reset email sent. Please check your inbox.';
                }
            }
        });
    }

    // --- Classroom Resources Loading ---

    async function fetchClassroomResources() {
        resourcesContainer.innerHTML = '<p>Loading resources...</p>';
        const { data: resources, error } = await supabase
            .from('classroom_resources')
            .select('*')
            .order('category', { ascending: true })
            .order('title', { ascending: true });

        if (error) {
            console.error('Error fetching classroom resources:', error);
            resourcesContainer.innerHTML = '<p>Error loading resources. Please try again later.</p>';
            return;
        }

        if (resources.length === 0) {
            resourcesContainer.innerHTML = '<p>No resources available yet. Check back soon!</p>';
            return;
        }

        resourcesContainer.innerHTML = ''; // Clear loading message

        // Group resources by category
        const categorizedResources = {};
        resources.forEach(resource => {
            if (!categorizedResources[resource.category]) {
                categorizedResources[resource.category] = [];
            }
            categorizedResources[resource.category].push(resource);
        });

        // Render resources grouped by category
        for (const category in categorizedResources) {
            const categorySection = document.createElement('div');
            categorySection.className = 'classroom-category'; // Add a class for styling
            categorySection.innerHTML = `<h3>${category}</h3><div class="flex-container"></div>`;
            const categoryFlexContainer = categorySection.querySelector('.flex-container');

            categorizedResources[category].forEach(resource => {
                const resourceItem = document.createElement('div');
                resourceItem.className = 'flex-item classroom-resource-item'; // Add class for styling
                resourceItem.innerHTML = `
                    <h4><a href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.title}</a></h4>
                    <p>${resource.description}</p>
                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="btn btn-small">Go to Tool / Course</a>
                `;
                categoryFlexContainer.appendChild(resourceItem);
            });
            resourcesContainer.appendChild(categorySection);
        }
    }

    // Listen for authentication state changes and update UI
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session);
        checkUser();
    });

    // Initial check when the page loads
    checkUser();
});
