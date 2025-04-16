// Simple test script for contact form submission
async function testFormSubmission() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    message: "This is a test submission"
  };

  try {
    const response = await fetch('http://localhost:8888/.netlify/functions/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ Form submission successful!');
    } else {
      console.log('❌ Form submission failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testFormSubmission(); 