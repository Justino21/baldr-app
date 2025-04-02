const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define image prompts
const imagePrompts = {
  features: {
    'progress-tracking': 'A professional before and after hair transformation comparison, showing clear improvement in hair health and thickness, medical style presentation',
    'psychological-support': 'A warm, supportive counseling session with a professional counselor, soft lighting, comfortable setting',
    'ask-section': 'A modern AI interface analyzing hair care products, showing product ingredients and analysis results',
    'personalized-guide': 'A personalized hair care plan with diet recommendations, meditation tips, and lifestyle advice, clean modern design'
  },
  community: {
    'forum': 'A diverse group of people discussing hair care in a modern online community setting, showing engagement and support',
    'success-stories': 'A collection of hair transformation success stories with before/after photos, inspiring presentation',
    'product-reviews': 'A clean interface showing hair care product reviews with ratings and user feedback'
  },
  testimonials: {
    'user-1': 'Professional headshot of a confident woman with healthy, thick hair, natural lighting, corporate style',
    'user-2': 'Professional headshot of a confident man with healthy hair, natural lighting, corporate style',
    'user-3': 'Professional headshot of a woman showing hair progress, natural lighting, corporate style'
  },
  contact: {
    'contact-us': 'A modern customer support center with friendly staff helping clients, warm lighting, professional setting'
  }
};

// Function to download and save image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
}

// Function to generate images
async function generateImages() {
  for (const [category, prompts] of Object.entries(imagePrompts)) {
    for (const [name, prompt] of Object.entries(prompts)) {
      try {
        console.log(`Generating ${category}/${name}...`);
        
        const response = await openai.images.generate({
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        });

        const imageUrl = response.data[0].url;
        const dir = path.join(__dirname, '../public/images', category);
        const filepath = path.join(dir, `${name}.png`);

        // Create directory if it doesn't exist
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        await downloadImage(imageUrl, filepath);
        console.log(`Successfully generated ${category}/${name}`);
      } catch (error) {
        console.error(`Error generating ${category}/${name}:`, error);
      }
    }
  }
}

// Run the script
generateImages().catch(console.error); 