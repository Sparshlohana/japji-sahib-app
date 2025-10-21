/**
 * Script to help populate Japji Sahib JSON with complete text
 * 
 * INSTRUCTIONS:
 * 1. Visit one of these trusted sources to get the complete Japji Sahib text:
 *    - https://www.searchgurbani.com/guru-granth-sahib/japji-sahib
 *    - https://www.sikhitothemax.org/
 *    - https://api.sikhitothemax.org/
 * 
 * 2. Copy each Pauri text (Gurmukhi, Hindi, English)
 * 
 * 3. Add to japji-sahib.json following this structure:
 */

// Template for adding verses
const verseTemplate = {
    id: 0,  // Increment for each verse
    type: "pauri",  // or "mool_mantar" or "salok"
    number: 0,  // Pauri number (0-38)
    gurmukhi: "ਪੂਰਾ ਟੈਕਸਟ ਇੱਥੇ",
    hindi: "पूरा टेक्स्ट यहाँ",
    english: "Full text here"
};

/**
 * QUICK REFERENCE - Japji Sahib Structure:
 * 
 * 1. Mool Mantar (id: 0) ✅ Already added
 * 2. Jap (id: 1) ✅ Already added
 * 3. Pauri 1-4 (id: 2-5) ✅ Already added
 * 4. Pauri 5-38 (id: 6-40) ⚠️ Need to add 34 more
 * 5. Final Salok (id: 41) ⚠️ Need to add
 * 
 * Total: 42 verses needed
 */

// Example of what to add for Pauri 5:
const pauri5Example = {
    id: 6,
    type: "pauri",
    number: 5,
    gurmukhi: "[Copy from SearchGurbani.com or SikhiToTheMax.org]",
    hindi: "[Copy from source]",
    english: "[Copy from source]"
};

/**
 * RECOMMENDED WORKFLOW:
 * 
 * Option A - Manual Copy (Safest):
 * 1. Open SearchGurbani.com Japji Sahib page
 * 2. Copy Pauri 5 in all 3 languages
 * 3. Add to japji-sahib.json
 * 4. Repeat for Pauris 6-38
 * 5. Add final Salok
 * 
 * Option B - Use SikhiToTheMax API:
 * You can fetch from their public API if available
 * 
 * Option C - Use GurbaniNow API:
 * Some Gurbani APIs provide JSON format directly
 */

console.log("Please visit SearchGurbani.com or SikhiToTheMax.org");
console.log("Copy each Pauri text and add to japji-sahib.json");
console.log("Follow the existing format in the file");
console.log("\nਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ 🙏");

// Export for reference
module.exports = { verseTemplate, pauri5Example };
