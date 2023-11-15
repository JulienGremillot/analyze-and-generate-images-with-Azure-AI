// méthode analyzeImage : analyse une image et retourne les tags associés
export const analyzeImage = async (imageUrl) => {
    // Get the named env var, and assign it to the value variable
    // To set it, type : setx OCP_APIM_SUB_KEY "value"
    const key = process.env.OCP_APIM_SUB_KEY;
    console.log('using key=' + key);
    console.log('using imageUrl=' + imageUrl)
    // Found correct URL at https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-analyze-image?tabs=javascript
    const response = await fetch('https://vision-jg.cognitiveservices.azure.com/vision/v3.2/tag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
        },
        body: JSON.stringify({
            url: imageUrl
        })
    });
    const responseJson = await response.json();
    return responseJson.tags.map(tag => tag.name);
}

// méthode generateImage : génère une image à partir d'un texte
export const generateImage = async (prompt) => {
    const response = await fetch('https://api.deepai.org/api/text2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Api-Key': 'YOUR_KEY'
        },
        body: JSON.stringify({
            text: prompt
        })
    });
    const responseJson = await response.json();
    return responseJson.output_url;
}
